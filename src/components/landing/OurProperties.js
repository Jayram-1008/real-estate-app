import { Box, Typography } from '@mui/material'
import React from 'react'
import building1 from '../../assets/images/building1.jpg'

const OurProperties = () => {
  return (
    <>
        <Box>
            <Typography variant='h1' sx={{textAlign:'center', color:'#0f77ff', fontSize:{xs:'2rem', md:'2.5rem'}}}>Our Popular Property</Typography>
            <Typography sx={{textAlign:'center', fontWeight:'400', fontSize:'1.1rem'}} variant='h6'>Welcome home, where possibilities thrive, Explore our collection, where dreams come alive.</Typography>
            <Box sx={{display:'flex', flexDirection:{md:'row', xs:'column'}, gap:'3rem', marginTop:'2rem', justifyContent:'center', alignItems:'center'}}>
                <Box sx={{padding:'.3rem', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', position:'relative', overflow:'hidden', width:'300px', borderRadius:'1rem', display:'flex', flexDirection:'column'}}>
                    <Box sx={{width:'100%',overflow:'hidden'}}>
                        <img src={building1} alt='' style={{width:'100%', objectFit:'contain', borderRadius:'1rem',}}/>
                    </Box>
                    <Box sx={{padding:'.5rem'}}>
                        <Typography  variant='h5'>Sundarone Project</Typography>
                        <Typography sx={{fontSize:'.8rem'}} variant='p'>Bhopal, Indore Madhy Pradesh</Typography>
                    </Box>
                </Box>
                <Box sx={{padding:'.3rem', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', position:'relative', overflow:'hidden', width:'300px', borderRadius:'1rem', display:'flex', flexDirection:'column'}}>
                    <Box sx={{width:'100%',overflow:'hidden'}}>
                        <img src={building1} alt='' style={{width:'100%', objectFit:'contain', borderRadius:'1rem',}}/>
                    </Box>
                    <Box sx={{padding:'.5rem'}}>
                        <Typography  variant='h5'>Sundarone Project</Typography>
                        <Typography sx={{fontSize:'.8rem'}} variant='p'>Bhopal, Indore Madhy Pradesh</Typography>
                    </Box>
                </Box>
                <Box sx={{padding:'.3rem', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', position:'relative', overflow:'hidden', width:'300px', borderRadius:'1rem', display:'flex', flexDirection:'column'}}>
                    <Box sx={{width:'100%',overflow:'hidden'}}>
                        <img src={building1} alt='' style={{width:'100%', objectFit:'contain', borderRadius:'1rem',}}/>
                    </Box>
                    <Box sx={{padding:'.5rem'}}>
                        <Typography  variant='h5'>Sundarone Project</Typography>
                        <Typography sx={{fontSize:'.8rem'}} variant='p'>Bhopal, Indore Madhy Pradesh</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default OurProperties