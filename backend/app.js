const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');


dotenv.config({path:'./.env'});
require('./db/conn');

app.use(cors({ origin: 'http://localhost:3000',
credentials:true }))
app.use(express.json());
const User=require('./model/userSchema');

app.use(require('./router/auth'));

const PORT=process.env.PORT;

 
app.listen(PORT,()=>{
console.log(`server is running at port ${PORT}`);
})