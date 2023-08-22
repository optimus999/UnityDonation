import React, { Component } from 'react';
import facebook from '../facebook.png'
import mail from '../mail.png'
import linkedin from '../linkedin.png'


class componentName extends Component {
  render() {
    return (
      <div> 
        <div className="trademark">
          <div><p className='copywrite'>2023-2025. The Unity Donation Foundation.</p></div>
          <div><a target='_blank' rel="noreferrer"  href="https://www.facebook.com/profile.php?id=100076950702892"><img style={{width:'2.5vw',height:'auto',marginLeft:'1vw',cursor:'pointer'}} src={facebook} alt="err" /></a></div>
          <div><a target='_blank' rel="noreferrer" href="https://mail.google.com/mail/u/0/?ogbl#inbox?compose=CllgCJvpZxDSDhfBCKjhpbhbjMNBJpPrFfMRdndLdVWxfGDcdsxbBFgsNzcgsrGwZxNbxrPtpdB"><img style={{width:'2.5vw',height:'auto',marginLeft:'1vw',cursor:'pointer'}} src={mail} alt="err" /></a></div>
          <div><a target='_blank' rel="noreferrer" href="https://www.linkedin.com/in/abhishek-kumar-5b2aba233/"><img style={{width:'2.5vw',height:'auto',marginLeft:'1vw',cursor:'pointer'}} src={linkedin} alt="err" /></a></div>
        </div>
      </div>
    );
  }
}

export default componentName;
