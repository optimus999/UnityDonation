import { useState,useContext,useEffect } from "react";
import React from "react";
import axios from 'axios';
import img from "../person-working-on-a-computer-vector-23777983.jpg";
import { NavLink,useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Load from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  
  const notify1 = (mess) => toast.error(mess, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });


    const notify = (mess) => toast.success(mess, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });


  const [loading,setloading]=useState(true);
    
  const {state,dispatch}=useContext(UserContext);

  

  const navigate =useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const loginuser=async (e)=>{
  e.preventDefault();
  
  try{
    setloading(true);
    if(!email || !password)
    {
      setloading(false);
    notify1('Empty field found!');    
    return;
    }
    const response =await axios.post('/login',{email:email,password:password},{
      withCredentials: true,
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = response.data;
    dispatch({ type: "USER", payload: true });
    localStorage.setItem("payload", "true");
    setloading(false);
    notify(data.message);

    setTimeout(() => {
      navigate('/');
    }, 4000);
    
  }
  catch(err){
    setloading(false);
    //  console.log(err); 
   if(err.response.data.error ==='Invalid credentials')
  notify1('Invalid credentials');
  else if(err.response.data.error ==='Invalid credentials , not matching')
  notify1('Invalid credentials , not matching!');
  }
}

useEffect(() => {
  setloading(false);
  const storedPayload = localStorage.getItem("payload");
  if (storedPayload === "true") {
    dispatch({ type: "USER", payload: true });
    navigate('/about');
  }
}, []);

  return (
    <div className="loginpage">
      {loading&&<Load/>}
      <div className="logincontainer">
      <div className="loginimage">
          <div className="im">
          {/* <img src={img} className="signupimg" alt="error" /> */}
          </div>
          <div style={{marginTop:'1vw'}}>
            <NavLink to="/Register" style={{textDecoration:'none'}}>Create Account</NavLink>
          </div>
        </div>
        <div className="info">
        <form method="POST" className="smallinfocont">
        <div className="heading"><h2>Sign In</h2></div>
        <div className="email">
            <label htmlFor="mail"><i className="zmdi zmdi-email"></i></label>
            <input type="text" style={{width:'15vw'}}   value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' name='mail' id='mail' autoComplete='off' className='mailinput'/>
          </div>
          <div className="signuppassword">
            <label htmlFor="password"><i className="zmdi zmdi-shield-security"></i></label>
            <input type="password" style={{width:'15vw'}}  value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' name='password' id='password' autoComplete='off' className='passwordinput'/>
          </div>
          <button onClick={loginuser} type="submit" className='loginbtn'>Log In</button>
          <ToastContainer position="top-center"
autoClose={3000}
limit={10}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
