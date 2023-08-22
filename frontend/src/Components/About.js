import React, { useEffect,useState} from 'react';
import axios from 'axios';

import {useNavigate} from 'react-router-dom';
import Load from './Loader';
import { UserContext } from "../App";
import {useContext} from 'react';
import avatar from './useravatar.jpg'

const About = () => {
  const {state,dispatch}=useContext(UserContext);
  const navigate =useNavigate();
  const [userData,setuserData]=useState({});
  const [loading,setloading]=useState(true);
  
  const callAboutPage = async () => {
    if(!state)
    {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get('/about', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setuserData(response.data);
      setloading(false);
  
      if (response.status !== 200) {
        const error = new Error(response.statusText);
        throw error;
      }
    } 
    catch (err) {
      navigate('/login');
  };
}

  useEffect(()=>{
    callAboutPage();
  },[])

  const RenderAboutme=()=>{
    if(loading===false)
    {
      return (
        <div className="aboutuscontainer">

          <form method='POST' className="userinfo">

              <div className='aboutleftcont'>
                 <div className="leftcontimagediv">
                  <img  src={avatar} alt="error" style={{width:'100%',height:'100%'}} />
                 </div>
              </div>


              <div className='aboutrightcont'>
              <div className='userinfocontainer1'>
                 <div className="userinfocontainerleftdetails">
                   <div className="userid">User Id</div>
                   <div className="username">Name</div>
                   <div className="useremail">Email</div>
                   <div className="userphone">Phone</div>
                   <div className="userprofession">Profession</div>
                 </div>
              </div>

              <div className='userinfocontainer2'>
                 <div className="userinfocontainerrightdetails">
                    <div className="userinfoid">{userData._id}</div>
                    <div className="userinfoname">{userData.name}</div>
                    <div className="userinfoemail">{userData.email}</div>
                    <div className="userinfophone">{userData.phone}</div>
                    <div className="userinfoprofession">{userData.work}</div>
                 </div>
              </div>
              </div>

              
           </form>

        </div>
      )
    }
  }

  return (
    <div className='aboutuspage'>
      {loading&&<Load/>}
   {!loading&&<RenderAboutme/>}
  </div>
  )
}

export default About
