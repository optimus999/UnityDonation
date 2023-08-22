import React from 'react';
import TradeMark from "./TradeMark";
import '../App.css'
import child from '../finalcutechild.jpg'
import im1 from '../health.png';
import im2 from '../home.png';
import im3 from '../people.png';
import i1 from '../education.jpg';
import i2 from '../children.jpg';
import i3 from '../dogimage.jpg';
import i4 from '../hunger.jpg';
import i5 from '../calamity.jpg';
import joy from '../joy.png';
import impact from '../impact.png';
import tax from '../tax.png'
import mention from '../mention.png'
import leader from '../leader.png'
import { useEffect,useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../App";
import {useContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Imageholder = () => {
  const {state,dispatch}=useContext(UserContext);
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
      theme: "coloured",
      });



  
  const navigate =useNavigate();
    const [show,setshow]=useState(false);
    const [username,setusername]=useState({});

  //   const RenderMenu=()=>{
  //   if(state)
  //   {
  //     return(
  //       <>
  //       <div className="showuser">
  //         <p><span>Welcome <span className='showusername'>{username}</span></span></p>
  //         </div>
  //       </>
  //     )
  //   }
  // }

    const callAboutPage = async () => {
      if(!state)
    {
      // notify2('Unauthorized User!!');
      // setloading(false);
      return;
    }
      try {
        const response = await axios.get('/gethelp', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setshow(true);
        // console.log(response);
        setusername(response.data.name);
    
        if (response.status !== 200) {
          const error = new Error(response.statusText);
          throw error;
        }
      } 
      catch (err) {
    };
  }
  
    useEffect(()=>{
    const storedPayload = localStorage.getItem("payload");
    if (storedPayload === "true") {
      dispatch({ type: "USER", payload: true });
    }
      callAboutPage();
      
    },[])

    const handleDonate=()=>{
      if(!state)
      notify1('Please login first.');
      else
      navigate('/handlepayment');
    }
   


    return (
      
      <div> 
        
        <div className="imagecontainer">
            {/* <div className='childdiv'>
            <img src={child} alt="error" />
            </div> */}
            <div className="text">
                 <div>
                    <p>Everyone can be</p>
                    <p><span style={{color:'#ff7400'}}>Great</span></p>
                    <p>because everyone can <span style={{color:'#ff7400'}}>Serve</span></p>
                 </div>
            </div>  .
            <div className="image1">
              <img src={im1} alt="error1" style={{width:'3.5vw',height:'3.5vw'}}/>
            </div>     
            <div className="image2">
              <img src={im2} alt="error2" style={{width:'3.5vw',height:'3.5vw'}}/>
            </div> 
            <div className="image3">
              <img src={im3} alt="error3" style={{width:'3.5vw',height:'3.5vw'}}/>
            </div> 

            {/* <RenderMenu/> */}

             

        </div>

        <div className="fundrasing">Fundraising & Crowdfunding</div>
        <div className="hr"></div>
        <div className="quotes">Giving is not just about making a donation. It is about making a difference.It is more rewarding to watch money change the world than to watch it accumulate.At the end of the day it's not about what you have or even what you've accomplished… it's about who you've lifted up, who you've made better.</div>
        
        <div className="container">
           <div className='texts'>
            <h2 style={{color:'#444',fontSize:'1.5vw',fontWeight:'400'}}>Investing in education is an investment in the advancement of society as a whole.</h2>
            <p className="para1">Education fundraising is crucial in ensuring that students have access to quality education and necessary resources. By contributing to education fundraising efforts, you are directly making a difference in the lives of students and helping to shape the future.</p>
            <button className="donate-button" onClick={handleDonate}>Donate</button>
           </div>
           <div className="pto1"><img src={i1} alt="error"/></div>
        </div>
        
        <div className="container">
           <div className="pto1"><img src={i2} alt="error"/></div>
           <div className='texts'>
            <h2 style={{color:'#444',fontSize:'1.5vw',fontWeight:'400'}}>Help us break the cycle of poverty and give street children a chance to thrive.</h2>
            <p className="para1">Join us in making a difference in the lives of street children by supporting our fundraising campaign. With your donation, we can provide these vulnerable children with shelter, education, and a chance for a brighter future. </p>
            <button className="donate-button" onClick={handleDonate}>Donate</button>
           </div>
        </div>

        <div className="container">
           <div className='texts'>
            <h2 style={{color:'#444',fontSize:'1.5vw',fontWeight:'400'}}>Help us give a voice to the voiceless. Donate to support animal welfare.</h2>
            <p className="para1">Every penny counts towards saving lives. Support our animal rescue efforts today.Be a hero for the animal kingdom. Donate to save and protect precious lives.Help us create a world where animals are loved and cared for. Contribute to our cause now.</p>
            <button className="donate-button" onClick={handleDonate} >Donate</button>
           </div>
           <div className="pto1"><img src={i3} alt="error"/></div>
        </div>

        <div className="container">
           <div className="pto1"><img src={i4} alt="error"/></div>
           <div className='texts'>
            <h2 style={{color:'#444',fontSize:'1.5vw',fontWeight:'400'}}>Together, we can fight hunger and make a difference in the lives of those in need. Donate today and feed a hungry person.</h2>
            <p className="para1">Hunger knows no boundaries. Let's unite and ensure that no one goes hungry. Your contribution can make a significant impact in the lives of hungry individuals.Every dollar counts. By donating to our cause, you are directly helping to alleviate hunger </p>
            <button className="donate-button" onClick={handleDonate}>Donate</button>
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
           </div>
        </div>

        <div className="container">
           <div className='texts'>
            <h2 style={{color:'#444',fontSize:'1.5vw',fontWeight:'400'}}>Join us in extending a helping hand to those affected by the calamity.</h2>
            <p className="para1">Every contribution, no matter how big or small, helps us provide immediate relief to the victims of the calamity. Donate now and be a part of their recovery. Your donation will make a difference.</p>
            <button className="donate-button" onClick={handleDonate}>Donate</button>
           </div>
           <div className="pto1"><img src={i5} alt="error"/></div>
        </div>

        <div className="seclastdiv">
          <h2 className='whenyouraiseafund'>When you raise a fund , you will receive:</h2>
          <div className="containscard">
            <div className="cd">
              <img src={joy} alt="err" className='img'/>
              <p className='pt'><strong>The joy and satisfaction of helping a child in need.</strong></p>
            </div>
            <div className="cd">
              <img src={impact} alt="err" className='img'/>
              <p className='pt'><strong>Updates on how the donation is making an impact.</strong></p>
            </div>
            <div className="cd">
            <img src={leader} alt="err" className='img' style={{width:'4.5vw',height:'auto'}}/>
              <p className='pt'><strong>A chance to meet with the organization's leadership or staff.</strong></p>
            </div>
            <div className="cd">
              <img src={tax} alt="err" className='img'/>
              <p className='pt'><strong>A personalized video message from someone at the organization.</strong></p>
            </div>   
            <div className="cd">
              <img src={mention} alt="err" className='img'/>
              <p className='pt'><strong>A mention on the organization's website or social media pages.</strong></p>
            </div>
          </div>
        </div>
        <TradeMark/>
      </div>
    );
  }

export default Imageholder;
