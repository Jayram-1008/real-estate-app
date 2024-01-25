import { Box, Typography } from '@mui/material'
import React from 'react'



// import selling from '../../assets/icon/selling.png'
import house from '../../assets/icon/house.png'
import support from '../../assets/icon/support.png'
import property from '../../assets/icon/property.png'
import virtual from '../../assets/icon/virtual-tour.png'
import profit from '../../assets/icon/profit.png'
import trust from '../../assets/icon/trust.png'


const WhatWeDo = () => {
  return (
    <>
        <Box sx={{ padding:'1rem', marginTop:'2rem', margin:'auto', width:'100%', background:'#ccd1d9' }}>
            <br/>
            <Typography sx={{textAlign:'center', fontSize:{xs:'1.9rem', md:'2.3rem'}}} variant='h2'>WHAT WE DO</Typography>
            <br/>
            <br/>
            <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, width:{xs:'100%', xl:'1000px' }, justifyContent:'space-evenly',alignItems:'center', margin:'auto', gap:'1rem'}}>
                <Box sx={{display:'display', flexDirection:'column'}}>
                    <Box sx={{display:'flex', alignItems:{xs:'start', md:'center'}, gap:'20px', justifyContent:{xs:'start', md:'center'},  padding:'.5rem'}}>
                        <Box>
                            <img src={house} alt='' style={{width:'55px'}}/>
                        </Box>
                        <Box>
                            <Typography variant='h4' sx={{fontSize:{xs:'1rem', md:'1.3rem'}}} >SELLING HOME</Typography>
                            <Typography variant='p'sx={{fontSize:'.9rem'}}  >Our dedicated team of real estate experts is committed to delivering a seamless selling experience tailored to your unique needs.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex', alignItems:'center', gap:'20px',  padding:'1rem'}}>
                        <Box>
                            <img src={profit} alt='' style={{width:'55px'}}/>
                        </Box>
                        <Box>
                            <Typography variant='h4' sx={{fontSize:{xs:'1rem', md:'1.3rem'}}}>INVESTING ADVISORY</Typography>
                            <Typography variant='p' sx={{fontSize:'.9rem'}}>For those looking to grow their wealth through real estate, we offer strategic investment advisory services.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex', alignItems:'center', gap:'20px',  padding:'1rem', }}>
                        <Box>
                            <img src={property} alt='' style={{width:'55px'}}/>
                        </Box>
                        <Box>
                            <Typography variant='h4'  sx={{fontSize:{xs:'1rem', md:'1.3rem'}}}>PROPERTY MANAGEMENT SERVICES</Typography>
                            <Typography variant='p' sx={{fontSize:'.9rem'}}>Investors and property owners can rely on us for comprehensive property management solutions.</Typography>
                        </Box>
                    </Box>
                </Box>
               
                {/* right part */}
                <Box sx={{display:'display', flexDirection:'column'}}>
                    <Box sx={{display:'flex', alignItems:'center', gap:'20px',  padding:'1rem'}}>
                        <Box>
                            <img src={support} alt='' style={{width:'55px'}}/>
                        </Box>
                        <Box>
                            <Typography variant='h4'  sx={{fontSize:{xs:'1rem', md:'1.3rem'}}}>LEGAL AND FINANCIAL SUPPORT</Typography>
                            <Typography variant='p' sx={{fontSize:'.9rem'}}>We provide support and guidance, connecting you with trusted legal and financial professionals to ensure a secure </Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex', alignItems:'center', gap:'20px', padding:'1rem'}}>
                        <Box>
                            <img src={trust} alt='' style={{width:'55px'}}/>
                        </Box>
                        <Box>
                            <Typography variant='h4'  sx={{fontSize:{xs:'1rem', md:'1.3rem'}}}>HOME INPECTION SUPPORT</Typography>
                            <Typography variant='p' sx={{fontSize:'.9rem'}}>Our commitment is to safeguard your investment and ensure that the property meets your expectations. </Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex', alignItems:'center', gap:'20px',  padding:'1rem'}}>
                        <Box>
                            <img src={virtual} alt='' style={{width:'50px'}}/>
                        </Box>
                        <Box>
                            <Typography variant='h4'  sx={{fontSize:{xs:'1rem', md:'1.3rem'}}}>VIRTUAL PROPERTY TOURS</Typography>
                            <Typography variant='p' sx={{fontSize:'.9rem'}}>Experience properties from the comfort of your home with our virtual property tours.</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <br/>
        </Box>        
    </>
  )
}

export default WhatWeDo