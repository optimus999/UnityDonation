const mongoose=require('mongoose');
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log('connection sucessfull with Mongo altas');
}).catch((err)=>console.log('connection failed with Mongo altas'))