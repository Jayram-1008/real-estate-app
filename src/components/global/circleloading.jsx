import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const CircleLoading = () => {
    return (
        <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <CircularProgress color="primary" />
        </Box>
    )
}

export default CircleLoading