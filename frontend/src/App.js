import React, { createContext, useReducer,useEffect } from 'react';
import NavBar from './Components/NavBar'
import {
  Routes,
  Route,
} from "react-router-dom";
import Imageholder from './Components/Imageholder.js';
import Login from "./Components/Login.js";
import Aboutus from "./Components/About.js";
import Register from "./Components/Register.js";
import Gethelp from "./Components/Gethelp.js";
import LogOut from "./Components/LogOut.js";
import './App.css';
import ErrorPage from "./Components/ErrorPage.js";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {initialState,reducer} from '../src/reducer/useReducer';
import Handlepayment from './Components/handlepayment';
import Paymentsucesspage from './Components/paymentsucesspage';

// context api
export const UserContext=createContext();


const App = () => {
  const [state,dispatch]=useReducer(reducer,initialState);
  useEffect(() => {
    const storedPayload = localStorage.getItem("payload");
    if (storedPayload === "true") {
      dispatch({ type: "USER", payload: true });
    }
  }, []);
    
    axios.defaults.baseURL='http://localhost:5000';
    axios.defaults.withCredentials=true;
    

    return (   
      <div> 
        <UserContext.Provider value={{state,dispatch}}>

        <NavBar/> 
        <Routes>  
        <Route  path="/" element={<Imageholder key="/"/>}/>
        <Route  path="/login" element={<Login key="login"/>}/>
        <Route  path="/about" element={<Aboutus key="aboutus"/>}/>
        <Route  path="/register" element={<Register key="register"/>}/>
        <Route  path="/gethelp" element={<Gethelp key="gethelp"/>}/>
        <Route  path="/logout" element={<LogOut key="logout"/>}/>
        <Route  path="/paymentsucesspage" element={<Paymentsucesspage key="paymentsucesspage"/>}/>
        <Route  path="/handlepayment" element={<Handlepayment key="handlepayment"/>}/>
        <Route path='*' element={<ErrorPage key="errorpage"/>}/>
        </Routes>

        </UserContext.Provider>

      </div>
    );
  }


export default App;

