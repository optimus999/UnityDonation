import React from 'react';
import './paymentsucesspage.css';
import {NavLink} from 'react-router-dom';

const paymentsucesspage = () => {

  return (
    <div className="paymentconfirmcontainer">
        <div className="paymentconfirmcontent">
            <h1>Payment Successful</h1>
            <p>Your payment has been successfully processed.</p>
            <p>Thank you for choosing our services!</p>
            <NavLink to="/">Go back to homepage</NavLink>            
        </div>
    </div>
  )
}

export default paymentsucesspage
