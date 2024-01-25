import { Box, Typography } from '@mui/material'
import React from 'react'
import building from '../../assets/images/building2.jpg'

const Home = () => {
  return (
    <>
        <Box sx={{width:'100%', padding:'1rem', display:'flex',}}>
            <Box sx={{}}>
                <Typography>COMFORTABLE HOUSE</Typography>
                <Typography>Find The Property Prefect For You</Typography>
                <Typography>Weather buying or renting, finding the right place to live is a presonal and unique exprience</Typography>
            </Box>
            <Box sx={{flex:'right',width:'50%'}}>
                <img src={building} alt='' style={{width:'100%', objectFit:'contain'}}/>
            </Box>
        </Box>
    </>
  )
}

export default Home