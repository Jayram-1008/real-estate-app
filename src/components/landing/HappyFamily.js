import { Box, Typography } from '@mui/material'
import React from 'react'
import happyFamily from '../../assets/images/HappyFamily.jpg'

const HappyFamily = () => {
  return (
    <>
        <Box sx={{width:'100%', display:'flex', gap:'2rem', flexDirection:{md:'row', xs:'column'}, justifyContent:'center',}}>
            <Box sx={{width:{xl:'45%', md:'100%'}, order:{md:2, xl:1} }} >
                <img src={happyFamily} alt='' style={{borderRadius:'1rem', width:'100%'}} />
            </Box>
            <Box sx={{alignSelf:{xl:'center', xs:'start'},width:{xl:'45%', md:'100%'} }}>
                <Typography variant='h1' sx={{color:'#0f77ff', fontWeight:'700', fontSize:{xs:'2.1rem', xl:'3rem'}}}>Discover the Joy of Home</Typography>
                <br/>
                <Typography variant='p' sx={{fontSize:'1.1rem'}}>Embrace the Joy of Homeownership with Our Dream Home Collection! Discover a world where happiness begins at home. Our curated selection of dream houses is designed to turn your family's aspirations into reality. Step into the warmth of your future home, where cherished moments and laughter echo through every room.  </Typography>
            </Box>
            
        </Box>
    </>
  )
}

export default HappyFamily