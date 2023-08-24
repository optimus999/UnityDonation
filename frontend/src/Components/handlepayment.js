import axios from "axios";
import { useState } from "react";
import "./handlepayment.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";
import { UserContext } from "../App";
import {useContext} from 'react';


const Handlepayment = () => {
	const {state,dispatch}=useContext(UserContext);
    const navigate =useNavigate();
	const notify1 = (mess) => toast.error(mess, {
		position: "top-center",
		autoClose: 2000,
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
	const [user,setuser]=useState({name:'',email:'',amount:''});


	const initPayment = (data) => {
		const options = {			
			key: "rzp_test_DhMAzxEQR0QA71",
			amount: user.amount,
			currency: data.currency,
			name:'Unity Donation',
			description: "Test Transaction",
			order_id: data.id,
			handler: async (response) => {
				try {
					const payment_id=response.razorpay_payment_id;
					// console.log('response');
					// console.log(response.razorpay_payment_id);
					const { data } = await axios.post('./verify', response);
					// console.log('data');
					// console.log(data);
					
					const maildata = { email: user.email,payment_id:payment_id,amount:user.amount,name:user.name};
					notify('Check Your email for confirmation!');
					const { emaildata } = await axios.post('./emailcheck',maildata);                   
                    setTimeout(() => {
                        // console.log('trying to redirect');
                        navigate('/paymentsucesspage');
                      }, 1000);
				} 
				catch (error) {
					// console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
			"prefill": {
				"email": ""+data.notes.email+""
			}
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	useEffect(() => {
		if(!state)
		{
		navigate('/login');
		}
	 }, []);


	const handleinput=(e)=>{
		e.preventDefault();	
    const name=e.target.name;
	const value=e.target.value;
	setuser({...user,[name]:value});
	
	}

	const handlePayment = async (e) => {
		e.preventDefault();
		try {
			if (!user.name || !user.email || !user.amount) {
				notify1('Please fill in all fields');
				return;
			  }
			// const orderUrl = "http://localhost:8080/api/payment/orders";
			const { data } = await axios.post('./orders', { amount: user.amount,email:user.email });
			initPayment(data.data);
		} 
		catch (err) {
			notify1('Error');
		}
	};

	const [EmailValid,setEmailValid]=useState(true);

	const handleEmailBlur = (e) => {
		setEmailValid(true);
		const emailInput = e.target;
		if (!emailInput.checkValidity()) {
			setEmailValid(false);
		  notify1("Please enter a valid email address.");
		}
	  };
	  

	return (
		<div className="Apps">
			<div className="appsdiv2">
			<div className="book_container">				
				<form method="POST" className="formclass">
					<h1><b>Unity Donation</b></h1>
					<input type="text" name='name' value={user.name} className="sexy-input" onChange={handleinput} placeholder="Your name" id='name'/>
					<input type="email" name='email' onBlur={handleEmailBlur} required value={user.email} className="sexy-input" onChange={handleinput} placeholder="Your Email" id='email' pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" />
					<input type='number' name='amount' value={user.amount} className="sexy-input" onChange={handleinput} placeholder="Amount(₹)" id='amount'/>
					<button onClick={handlePayment} className="sexy-button" disabled={!EmailValid}>
					Donate now
				</button>
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
				</form>
			</div>
			</div> 
		</div>
	);
}

export default Handlepayment;











             