import { Box, Typography } from '@mui/material'
import React from 'react'
import homeIcon from '../../assets/icon/homeIcon.png'
import trust from '../../assets/icon/trustable.png'
import value from '../../assets/icon/value.png'


const HomeCard = () => {
  return (
    <>
        <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', gap:'2.5rem', flexDirection:{xs:'column', md:'row'}, }}>
            <Box 
                sx={{
                    width:{xs:'280px', md:'300px'},
                    padding:'1rem',
                    display:'flex',
                    alignContent:'center',
                    justifyContent:'center',
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                    gap:'10px',
                    backgroundColor:'white',
                    borderRadius:'1rem',
                    transition: 'box-shadow 0.5s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 6px rgba(15, 119, 255, 0.2), 0 6px 15px rgba(15, 119, 255, 0.25)',
                    },
                }}
            >
                <Box >
                    <img src={homeIcon} alt='' style={{width:'45px'}}/>
                </Box>
                <Box>
                    <Typography variant='h4' sx={{fontSize:{xs:'1.2rem', md:'1.4rem'}}}>Featured Property</Typography>
                    <Typography variant='p' sx={{fontSize:{xs:'.9rem', md:'1rem'}}}>Discover your dream home at here, a stunning residence located in your city</Typography>
                </Box>
            </Box>

            <Box 
                sx={{
                    width:{xs:'280px', md:'300px'},
                    padding:'1rem',
                    display:'flex',
                    alignContent:'center',
                    justifyContent:'center',
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                    gap:'20px',
                    background:'white',
                    borderRadius:'1rem',
                    transition: 'box-shadow 0.5s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 6px rgba(15, 119, 255, 0.2), 0 6px 15px rgba(15, 119, 255, 0.25)',
                    },
                }}
            >
                <Box >
                    <img src={trust} alt='' style={{width:'45px'}}/>
                </Box>
                <Box>
                    <Typography variant='h4' sx={{fontSize:{xs:'1.2rem', md:'1.4rem'}}}>Trustable</Typography>
                    <Typography variant='p' sx={{fontSize:{xs:'.9rem', md:'1rem'}}}>Transparent Pricing, Clear Details, and Easy Connections for Your Real Estate Journey</Typography>
                </Box>
            </Box>
            <Box 
                sx={{
                    width:{xs:'280px', md:'300px'},
                    padding:'1rem',
                    display:'flex',
                    alignContent:'center',
                    justifyContent:'center',
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                    gap:'20px',
                    borderRadius:'1rem',
                    background:'white',
                    transition: 'box-shadow 0.5s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 6px rgba(15, 119, 255, 0.2), 0 6px 15px rgba(15, 119, 255, 0.25)',
                    },
                }}
            >
                <Box >
                    <img src={value} alt='' style={{width:'45px'}}/>
                </Box>
                <Box>
                    <Typography variant='h4' sx={{fontSize:{xs:'1.2rem', md:'1.4rem'}}}>Valuable</Typography>
                    <Typography variant='p' sx={{fontSize:{xs:'.9rem', md:'1rem'}}}>Discover your dream home at here, a stunning residence located in the heart of your city</Typography>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default HomeCard