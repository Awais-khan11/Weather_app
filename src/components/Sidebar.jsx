import React from 'react'
import siidebatimg from '../assets/sidebarHome.png'
import cities from '../assets/cities.png'
import tempreature from '../assets/tempreature.png'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
       const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div onClick={() => navigate('/')}  style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'30px', marginTop:'20px', cursor:'pointer'}}>                     
                <img src={siidebatimg} alt="Sidebar Home" style={{width:'90px', height:'60px'}} />
           <span  style={{color:'white'}}>Home</span>
      </div>
       
       <div onClick={() => navigate('/city')} style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'30px', marginTop:'20px', cursor:'pointer'}}>                     
                <img src={cities} alt="Sidebar Cities" style={{width:'90px', height:'60px'}} />
           <span style={{color:'white'}}>Cities</span>
      </div>
       <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'30px', marginTop:'20px', cursor:'pointer'}}>                     
                <img src={tempreature} alt="Sidebar Temperature" style={{width:'90px', height:'60px'}} />
           <span style={{color:'white'}}>Cast</span>
      </div>
      </div>
  )
}
