import React from 'react'
import { Box, Typography } from '@mui/material';
export const LogoLarge = () => {
    return (
        <Box sx={{ textAlign: "center", lineHeight: "10px" }}>
            <Typography variant='h2' color='primary'>Real Estate</Typography>
            <Typography variant='p'>-- Tilakram Group --</Typography>
        </Box >
    )
}

export const LogoSmall = () => {
    return (
        <Box sx={{ textAlign: "center", padding: "6px 0px" }}>
            <Typography variant='h3' color='primary' sx={{ fontWeight: 600 }}>Real<br />Estate</Typography>
        </Box>
    )
}