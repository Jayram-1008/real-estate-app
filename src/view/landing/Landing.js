import React from 'react';
import './style.css'
import Navbar from '../../components/global/sidebar/navbar';


import HomeCard from '../../components/landing/HomeCard';
import WhatWeDo from '../../components/landing/WhatWeDo';
import UnlockDream from '../../components/landing/UnlockDream';
import HappyFamily from '../../components/landing/HappyFamily';
import OurProperties from '../../components/landing/OurProperties';
import Footer from '../../components/landing/Footer';
import FAQ from '../../components/landing/FAQ';
import Contact from '../../components/landing/Contact';
import { Box, Typography } from '@mui/material';

const Landing = () => {
  // Your JavaScript logic can go here

  return (
    <main>
      <Navbar/>
      <div className="home">
        <div class="home-image">
            <div class="home-text">
                <Typography variant='h2' sx={{color:'wheat', fontSize:{xs:'2.2rem',md:'4rem'}, textAlign:'center'}}>Discover Home, Where Dreams Begin</Typography>
            </div>
        </div>
        <div className='home-card'>
            <HomeCard/>
        </div>
      </div>

      <Box sx={{marginTop:{md:'10.5rem', xs:'30rem'}, padding:'2rem'}}>
        <Contact/>
      </Box>

      <div className="what-we-do">
        <WhatWeDo/>
      </div>
      
      <div className='unlock-dream'>
        <UnlockDream/>
      </div>

      <div className='happy-family'>
        <HappyFamily/>
      </div>

      <div className='our-property'>
        <OurProperties/>
      </div>

      <div className='faq'>
        <FAQ/>
      </div>

      <div className="footer-section">
        <Footer/>
      </div>
    </main>
  );
};

export default Landing;
