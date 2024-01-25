import { Box, Typography } from '@mui/material'
import React from 'react'

import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import and from '../../assets/images/and.png'
import appStore from '../../assets/images/appStore.png'

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import QuizIcon from '@mui/icons-material/Quiz';


const Footer = () => {
  return (
    <>
        <Box sx={{width:'100%', background:'black', padding:'4rem', display:'flex', flexDirection:'column', gap:'2rem'}}>
            <Box sx={{display:'grid', gap:'5rem', gridTemplateColumns:{md:'1fr 1fr 1fr 1fr', xs:'1fr'}, }}>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                   
                    <Typography variant='h4' sx={{color:'white'}}>About Us</Typography>
                    <Box sx={{height:'2px', width:'60px', backgroundColor:'#0f77ff', marginBottom:'10px'}}></Box>
                    <Typography variant='p' sx={{fontSize:'1rem', color:'white'}}>At Real-State, we understand that real estate decisions are among the most significant investments in your life. That's why we are dedicated to providing you with a trusted and transparent real estate experience</Typography>
                    
                </Box>
                <Box>
                    <Typography variant='h4' sx={{color:'white'}}>Quick Link </Typography>
                    <Box sx={{height:'2px', width:'60px', backgroundColor:'#0f77ff', marginBottom:'10px'}}></Box>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    <a
                        href='#'
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize:'1.1rem'
                        }}
                    >
                        <HomeIcon fontSize="small" sx={{color:'white'}}/>&nbsp;
                        Home
                    </a>
                    <a
                        href='#'
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize:'1.1rem'
                        }}
                    >
                        <InfoIcon fontSize="small" sx={{color:'white'}}/>&nbsp;
                        About
                    </a>
                    <a
                        href='#'
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize:'1.1rem'
                        }}
                    >
                        <MiscellaneousServicesIcon fontSize="small" sx={{color:'white'}}/>&nbsp;
                        Our Services
                    </a>
                    <a
                        href='#'
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize:'1.1rem',
                            width:'auto'
                        }}
                    >
                        <LocalPhoneIcon fontSize="small" sx={{color:'white'}}/>&nbsp;
                        Contact
                    </a>
                    </Box>
                </Box>
                <Box>
                    <Typography variant='h4' sx={{color:'white'}}>Get Help </Typography>
                    <Box sx={{height:'2px', width:'60px', backgroundColor:'#0f77ff', marginBottom:'10px'}}></Box>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
                        <a
                            href='#'
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize:'1.1rem'
                            }}
                        >
                            <PrivacyTipIcon fontSize='small' sx={{color:'white'}}/> &nbsp;
                            Privacy Policy
                        </a>
                        <a
                            href='#'
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize:'1.1rem'
                            }}
                        >
                            <ContactSupportIcon fontSize='small' sx={{color:'white'}}/>&nbsp;   
                            Help
                        </a>
                        <a
                            href='#'
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize:'1.1rem'
                            }}
                        >
                            <QuizIcon fontSize='small' sx={{color:'white'}}/>&nbsp;   
                            FAQ
                        </a>
                    </Box>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
                    <Box>
                        <Typography variant='h4' sx={{color:'white'}}>Follow Us</Typography>
                        <Box sx={{height:'2px', width:'60px', backgroundColor:'#0f77ff', marginBottom:'10px'}}></Box>
                        <Box sx={{marginLeft:'-10px', display:'flex', gap:'20px'}}>
                            <IconButton aria-label="delete" size="small">
                                <GoogleIcon fontSize="large" sx={{color:'white'}}/>
                            </IconButton>
                            <IconButton aria-label="delete" size="small">
                                <FacebookIcon fontSize="large" sx={{color:'white'}}/>
                            </IconButton>
                            <IconButton aria-label="delete" size="small">
                                <InstagramIcon fontSize="large" sx={{color:'white'}}/>
                            </IconButton>
                            <IconButton aria-label="delete" size="small">
                                <TwitterIcon fontSize="large" sx={{color:'white'}}/>
                            </IconButton>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant='h4' sx={{color:'white'}}>Resourses </Typography>
                        <Box sx={{height:'2px', width:'60px', backgroundColor:'#0f77ff'}}></Box>
                        <Box sx={{display:'flex', gap:'10px', marginLeft:'-10px'}}>
                            <img src={and} alt='' style={{ width:'120px', objectFit:'contain', cursor:'pointer', }}/>
                            <img src={appStore} alt='' style={{ width:'110px', objectFit:'contain', cursor:'pointer'}} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{margin:'auto'}}>
                <Box sx={{  lineHeight: "10px" }}>
                    <Typography variant='h2' color='primary'>Real Estate</Typography>
                    <Typography variant='p' sx={{color:'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;-- Tilakram Group --</Typography>
                </Box >
            </Box>
           
            <Box>
                <Typography sx={{textAlign:'center', color:'white'}}> Copyright © 2021 <a href='#' style={{color:'white'}}>www.tilakramgroup.com </a>- All rights reserved</Typography>
            </Box>
            
        </Box>
    </>
  )
}

export default Footer