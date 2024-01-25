import { Box, Typography } from '@mui/material'
import React from 'react'
import dreamHome from '../../assets/images/dreamHome.jpg'

const UnlockDream = () => {
  return (
    <>
        <Box sx={{width:'100%', display:'flex', gap:'2rem', flexDirection:{md:'row', xs:'column'}, justifyContent:'center', }}>
            <Box sx={{width:{xl:'45%', md:'100%'} }} >
                <img src={dreamHome} alt='' style={{borderRadius:'1rem', width:'100%'}} />
            </Box>
            <Box sx={{alignSelf:{xl:'center', md:'start'},width:{xl:'45%', md:'100%'} }}>
                <Typography variant='h1' sx={{color:'#0f77ff', fontWeight:'700', fontSize:{xs:'2.1rem', xl:'3rem'}}}>Dream Home Collection</Typography>
                <br/>
                <Typography variant='p' sx={{fontSize:'1.1rem'}}>Step into the doorway of your dreams! Unlock the possibilities that await you in our exclusive Dream House section. Your dream home is just a click away – explore, envision, and unlock the door to the extraordinary with our curated collection of dream houses.  </Typography>
            </Box>
        </Box>
    </>
  )
}

export default UnlockDream