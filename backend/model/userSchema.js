const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    data:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                required:true
            },
            message:{
                type:String,
                required:true
            },
        }
    ],
    tokens:[             //we are storing an array of tokens becuase when ever the user logins each time a new token is generated
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})



//we are generating token
userSchema.methods.generateAuthToken=async function(){
    try{
      let tokengenerated=jwt.sign({_id:this._id},process.env.SECRET_KEY)  ;       //id in the database : id of the user during login  and each time a token is being generated
      this.tokens=this.tokens.concat({token:tokengenerated});
     await  this.save();
     return tokengenerated;
    }
    catch(err){
        console.log(err);
    }
}



userSchema.methods.addMessage=async function(name,email,phone,message){
       try{
           this.messages=this.messages.concat({name,email,phone,message});
           await this.save();
           return this.messages;
       }
       catch(err)
       {
        console.log('user message not added');
       }
}

const User=mongoose.model('User',userSchema);

module.exports=User;