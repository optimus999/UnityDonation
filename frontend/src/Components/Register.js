import React,{useState} from 'react';
import {NavLink,useNavigate} from 'react-router-dom';
import img from '../person-working-on-a-computer-vector-23777983.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Load from './Loader';


const Signup = () => {
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
  const [loading,setLoading]=useState(false);
  const navigate =useNavigate();
  
  const [user,setUser]=useState({
    name:"",
    email:"",
    phone:"",
    work:"",
    password:"",
    cpassword:"",
  })
  let name,value;

  const handleInput=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  }


  const PostData=async(e)=>{
    
  e.preventDefault();
  const {name,email,phone,work,password,cpassword}=user;

  try{
    setLoading(true);
    if(!name || !email || !phone || !work || !password || !cpassword)
    {
    setLoading(false);
    notify1('please fill the field properly');
    return;
    }
    
    const response =await axios.post('/register',{name:name,email:email,phone:phone,work:work,password:password,cpassword:cpassword},{
      headers:{
        'Content-Type':'application/json'
      }
    })
    setLoading(false);
    const data = response.data;

    notify(data.message);

    setTimeout(() => {
      navigate('/login');
    }, 4000);
  }
  catch(err)
  {
    setLoading(false);
    if (err.response.data.error === 'please fill the field properly') {
      notify1('Empty field found!');
      }
    else if (err.response.data.error === 'password are not matching') {
      notify1('passwords are not matching');
    }
    else if (err.response.data.error === 'email already exists') {
      notify1('Email already exists!');
      }
  }
}


  return (
    
    <div className='signuppage'>
      {loading&&<Load/>}
      <div className="signup">


        <form className="form" method='POST'>
          <div className="heading"><h2>Sign Up</h2></div>
          <div className="name">
            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
            <input type="text" required placeholder='Your full Name' name='name' id='name' autoComplete='off' value={user.name} onChange={handleInput} className='nameinput'/>
          </div>
          <div className="email">
            <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
            <input type="email" required  placeholder='Email' name='email' id='email' autoComplete='off' value={user.email} onChange={handleInput} className='mailinput'/>
          </div>
          <div className="phno">
            <label htmlFor="phone"><i className="zmdi zmdi-phone"></i></label>
            <input type="text" required  placeholder='Phone no' name='phone' id='phone' autoComplete='off' value={user.phone} onChange={handleInput} className='phonenoinput'/>
          </div>
          <div className="profession">
            <label htmlFor="work"><i className="zmdi zmdi-slideshow"></i></label>
            <input type="text" required  placeholder='profession' name='work' id='work' autoComplete='off' value={user.work} onChange={handleInput} className='professioninput'/>
          </div>
          <div className="signuppassword">
            <label htmlFor="password"><i className="zmdi zmdi-shield-security"></i></label>
            <input type="password" required  placeholder='Password' name='password' id='password' autoComplete='off' value={user.password} onChange={handleInput} className='passwordinput'/>
          </div>
          <div className="csignuppassword">
            <label htmlFor="cpassword"><i className="zmdi zmdi-shield-security"></i></label>
            <input type="password" required  placeholder='Confirm Password' name='cpassword' id='cpassword' autoComplete='off' value={user.cpassword} onChange={handleInput} className='cpasswordinput'/>
          </div>
          <button className='registerbtn' onClick={PostData} disabled={loading}>Register</button> 
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
theme="dark"/>
        </form>
        <form className="alreadyregistered">
        <img src={img} className="signupimg" alt="error" />
          <div style={{marginTop:'1vw'}}>
            <NavLink style={{textDecoration:'none'}} to="/Login">I am already registered</NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
