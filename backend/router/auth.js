const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
require('../db/conn');
const User=require('../model/userSchema');
const authenticate=require('../middleware/authenticate')
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const dotenv=require('dotenv');
dotenv.config({path:'./.env'});
const Razorpay = require("razorpay");
const crypto = require("crypto");
var nodemailer = require('nodemailer');



router.get('/',(req,res)=>{
    res.send('hello world from server router js');
})

router.post('/register',async (req,res)=>{
    
    const {name,email,phone,work,password,cpassword}=req.body;

    try{
        const userExist=await User.findOne({email:email})
        if(userExist)
        {
            return res.status(422).json({error:'email already exists'});           
        }

        else if(password!=cpassword)
        {
        return res.status(422).json({error:'password are not matching'})
        }

        else
        {
            const hashedPassword = await bcrypt.hash(password, 12);
            const hashedconfirmPassword = await bcrypt.hash(cpassword, 12);
            const user=new User({name:name,email:email,phone:phone,work:work,password:hashedPassword,cpassword:hashedconfirmPassword});
            await user.save();
            res.status(201).json({message:'Registration successfull. Redirecting...'})
        }  
    }
    catch(err){
// console.log('cant register:Try entering correct details');
    } 
})

// login route

router.post('/login',async (req,res)=>{
      try{
        let token;
      const {email,password}=req.body;
      
      const userLogin=await User.findOne({email:email});        //at the time of login if user enters the correct email then userLogin will contain the whole data of that user
      if(userLogin)
      {
           const isMatch=await bcrypt.compare(password,userLogin.password);    //password entered by user,password present in the database
           token=await userLogin.generateAuthToken();
           res.cookie('jwtoken',token,{
               expires:new Date(Date.now()+2592000000)  ,      //user token expired after 30 days
               httpOnly:true
           })
        //    console.log('cookie made successfully');
   
         
           if(!isMatch)
           {
               return res.status(400).json({error:'Invalid credentials , not matching'})
           }
           else
           res.json({message:"Login Successfull ! Redirecting..."});
      }
      else
      {
        res.status(400).json({error:'Invalid credentials'})
      }
      
      }
      catch(err){
    //   console.log(err);
      }
})

//about us page
router.get('/about',authenticate,(req,res)=>{
    // console.log('req.rootUser',req.rootUser);
    res.send(req.rootUser);
})

//gethelp page
router.get('/gethelp',authenticate,(req,res)=>{
    // console.log('req.rootUser',req.rootUser);
    return res.send(req.rootUser);
})

router.post('/contact',authenticate,async (req,res)=>{
    try{
    const {name,email,phone,message}=req.body;

    const userContact =await User.findOne({_id:req.userID});
    if(userContact){ 
        const userMessage=await userContact.addMessage(name,email,phone,message);
        await userContact.save();
        return res.status(201).json("your message has been sent");
    }
    else
    {
        // console.log('User not found');
    return res.status(400).json({error:'User not found'});
    }
    }
    catch(err){
        return res.status(400).json({error:'Message not send'});
    }
})

router.get('/logout',(req,res)=>{
    // console.log('req.rootUser',req.rootUser);
    res.clearCookie('jwtoken');
    
    // console.log('cookie deleted succesfully');
    return res.status(200).send('User Loggedout Successfully!!');
})


router.post("/orders", async (req, res) => {

	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});	

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
			notes:{
				email:req.body.email
			}
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				return res.status(401).json({ message: error });
			}
			return res.status(200).json({ data: order });
		});
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error!" });
		
	}
});

router.post("/verify", async (req, res) => {
	try {
		
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
});

router.post("/emailcheck",async(req,res)=>{
    // console.log('email working');
	try{
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: process.env.EMAIL_USERNAME, // Use environment variable for email
			  pass: process.env.EMAIL_PASSWORD // Use environment variable for password
			}
		  });
		  
		  var mailOptions = {
			from: process.env.EMAIL_USERNAME, // Use environment variable for sender email
			to:req.body.email,
			subject: `Thank You for Your Donation!`,
			html:`
			<p><strong>Dear ${req.body.name},</strong></p>
			<p>Thank you for your generous donation! We appreciate your contribution to our cause.</p>
			<p>Transaction ID: <strong>${req.body.payment_id}</strong></p>
			<p>Amount Donated: <strong>₹${req.body.amount}.</strong></p>
			<p>Your support helps us make a difference in the lives of many. We look forward to your continued support in the future.</p>
			<p>Sincerely,<br><strong>Unity Donation</strong>.</p>
		  `
		  };
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			// 	console.log('error sending mail1');
			//   console.log(error);
              return res.status(400).json({ message: "error" });
			} else {
			//   console.log('Email sent: ' + info.response);
              return res.status(200).json({ message: "Email sent sucessfully!" });;
			}
		  });
	}
	catch(err)
	{
		// console.log('error sending email2');
		// console.log(err);
        return res.status(400).json({ message: "error" });;
	}
})


module.exports=router;