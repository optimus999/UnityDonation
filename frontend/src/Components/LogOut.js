import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect,useContext} from 'react';
import Load from './Loader2';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from "../App";

const LogOut = () => {
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
      theme: "colored",
      });
  const [loading,setloading]=useState(false);

    const {state,dispatch}=useContext(UserContext);


    const navigate =useNavigate();
      const callAboutPage = async () => {
        
        try {
          setloading(true);
          // const response = await axios.get('/logout', {
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // })
          notify("User Loggedout Successfully!!");
          dispatch({type:'USER',payload:false})
          localStorage.removeItem("payload");
          localStorage.removeItem("jwtoken");
          setloading(false);
          
          setTimeout(() => {
            navigate('/login');
          }, 2500);
        }
        catch(err)
        {
          // console.log(err);
        notify1('LogOut Failed.')
        }
    }
    useEffect(()=>{
        callAboutPage();
      },[])

  return (
    <div>
      {loading&&<Load/>}
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

export default LogOut
