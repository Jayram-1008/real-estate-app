import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import building1 from '../../assets/images/building1.jpg'

const Contact = () => {
  return (
    <>
        <Box sx={{width:'100%', display:'flex', gap:'4rem', flexDirection:{md:'row', xs:'column'}, justifyContent:'center',}}>
            <Box sx={{alignSelf:'center',width:{xl:'40%', md:'100%'} }}>
                <Typography variant='h1' sx={{color:'#0f77ff', fontWeight:'700', fontSize:{xs:'2.1rem', xl:'3rem'}, }}>Your Dream Home Awaits!</Typography>
                <br/>
                <Typography variant='p' sx={{fontSize:'1.1rem'}}>
                  we're here to make your real estate journey smooth and stress-free.
                  Have a question about a property? Interested in scheduling a tour?
                  Need expert advice on buying or selling your home? Our dedicated
                  team of real estate professionals is ready to assist you.
                </Typography>
                <br/>
                <br/>
                <Button variant='contained' color='secondary'>contact</Button>
            </Box>
            <Box sx={{width:{xl:'45%', md:'100%'}, position:'relative' }} >
                <img src={building1} alt='' style={{borderRadius:'1rem', width:'100%', }} />
                <Box 
                  sx={{
                      background:'white',
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                      borderRadius:'1rem', 
                      width:'200px', 
                      padding:'.8rem', 
                      position:'absolute', 
                      top: {xs:'2%', md:'65%'}, 
                      left: {xs:'50%', md:'7%'}, 
                      transform: 'translate(-50%, -50%)' 
                    }}
                  >
                  <Typography variant='h2' sx={{color:'#0f77ff'}}>22K+</Typography>
                  <Typography variant='p' sx={{fontSize:'1rem'}}>Property Ready to Buy and Sell</Typography>
                </Box>
            </Box> 
        </Box>
    </>
  )
}

export default Contact