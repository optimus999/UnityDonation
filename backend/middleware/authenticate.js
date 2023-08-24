const jwt=require('jsonwebtoken');
const User=require('../model/userSchema')


const Authenticate=async(req,res,next)=>{
        try
        {
            // console.log('trying authenticate.js');  
            // console.log("req");
            // console.log(req); 


        const token=(req.headers['authorization']).split(" ")[1];

        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);


        const rootUser=await User.findById(verifyToken.user_id);    //rootUser will be containing all the info of the user
        if(!rootUser)
        {           
            return res.status(401).send('User not found!');
        }

        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;   
        next();
        }
        catch(err)
        {
        return res.status(401).send('unauthorized:No token provided');
        }
}
module.exports=Authenticate;