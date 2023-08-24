import React from 'react';
import axios from 'axios';
import { useEffect,useState} from 'react';
import Load from './Loader2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../App";
import {useContext} from 'react';


const Contact = () => {
  const {state,dispatch}=useContext(UserContext);
  const [loading,setLoading]=useState(false);
  const [userData,setuserData]=useState({name:'',email:'',phone:'',message:''});


  const notify1 = (mess) => toast.error(mess, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });


    const notify = (mess) => toast.success(mess, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      const notify2 = (mess) => toast.warn(mess, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
  

  const callAboutPage = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/gethelp', {
        headers: {
          'Content-Type': 'application/json',
          Authorization:'Bearer '+localStorage.getItem("jwtoken")
        },
      });
      setLoading(false);
      setuserData({...userData,name:response.data.name,email:response.data.email,phone:response.data.phone});        
        
      if (response.status !== 200) {
        const error = new Error(response.statusText);
        throw error;       
      }
      return;
    } 
    catch (err) {
      // console.log(err);
      setLoading(false);
      if(err.response.data==='unauthorized:No token provided')
      notify1('Unauthorized User.');
      else if(err.response.data==='User not found!')
      notify1('Unauthorized User.');
  };
}

  useEffect(()=>{
    const storedPayload = localStorage.getItem("payload");
    if (storedPayload === "true") {
      callAboutPage();
      return;
    }
    else
    {
    notify2('Unauthorized User!!');  
    return;
    }
  },[])


  const handleInputs=(e)=>{
       const name=e.target.name;
       const value=e.target.value;
       setuserData({...userData,[name]:value});
  }

  const contactform=async (e)=>{
    try{
      setLoading(true);
   e.preventDefault();
   if(!state)
   {
    setLoading(false); 
   notify1('Please login first.');
   return;
   }
   const {name,email,phone,message}=userData;

   if(!name || !email || !phone || !message)
   {
    setLoading(false);
    notify1("Please fill all the fields");    
    return;
   }

   const response =await axios.post('/contact',{name:name,email:email,phone:phone,message:message},{
    headers:{
      'Content-Type':'application/json',
      Authorization:'Bearer '+localStorage.getItem("jwtoken")
    }
  })
  setLoading(false);
  notify('Message sent successfully');
  setuserData({...userData,message:''});
  }
  catch(err){
    setLoading(false);
    // console.log(err);
    if(err.response.data==='unauthorized:No token provided')
    {
      notify1('You are not loggedin');
    }
    else if(err.response.data.error==='Message not send')
    {
      notify1('Message not send');
    } 
    else if(err.response.data.error==='User not found')
    { 
      notify1('User not found');
    }   
  }
  }


  return (
    <div className='contactpage'>
      {loading&&<Load/>}
      <div className="topcontactcontainer">
        <div className="contactphone d-flex justify-content-start align-items-center">
          <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone"/>
          <div className="contact_inf0_content">
            <div className="contact_info_title">Phone</div>
            <div className="contact_info_text">+91 6201012204</div>
          </div>
        </div>
        <div className="contactemail d-flex justify-content-start align-items-center">
        <img src="https://img.icons8.com/office/24/000000/email.png" alt="phone"/>
          <div className="contact_inf0_content">
            <div className="contact_info_title">Email</div>
            <div className="contact_info_text">unitydonation499@gmail.com</div>
          </div>
        </div>
        <div className="contactaddress d-flex justify-content-start align-items-center">
        <img src="https://img.icons8.com/office/24/000000/address.png" alt="phone"/>
          <div className="contact_inf0_content">
            <div className="contact_info_title">Address</div>
            <div className="contact_info_text">PDPM IIITDM JABALPUR,Madhya Pradesh-482005</div>
          </div>
        </div>
      </div>
      <form className="contactform" method='POST'>
        <div className="contactformline1">
          <h2>Get in Touch</h2>
        </div>
        <div className="contactformline2">
            <label htmlFor="name"></label>
            <input type="text" placeholder='Your Name' value={userData.name} onChange={handleInputs} name='name' id='name' autoComplete='off' className='nameinput' style={{margin:'0',padding:'0'}}/>

            <label htmlFor="mail"></label>
            <input type="text"  placeholder='Your Email' value={userData.email} onChange={handleInputs} name='mail' id='mail' autoComplete='off' className='mailinput'/>

            <label htmlFor="phno"></label>
            <input type="text"  placeholder='Your Phoneno' value={userData.phone} onChange={handleInputs} name='phone' id='phno' autoComplete='off' className='phonenoinput'/>
        </div>
        <div className="contactformline3">
            <label htmlFor="user-review"></label>
            <textarea id="user-review" rows="5" value={userData.message} onChange={handleInputs} name='message' className="message-box"  placeholder="Message"></textarea>
        </div>
        <div className="contactformline4">
          
        </div>
      </form>
      <button type='submit' onClick={contactform} disabled={loading} className='formsubbtn'>Send Message</button>
          <ToastContainer position="top-center"
autoClose={1500}
limit={10}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"/>
    </div>
  )
}

export default Contact
