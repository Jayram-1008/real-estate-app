import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CurrencyRupee } from '@mui/icons-material'

export const CustomFooter = (props) => {
    return (
        <Box sx={{ p: 1, display: 'flex', gap: "10px", justifyContent: "space-around", borderTop: "1px solid rgba(0,0,0,.2)" }}>
            <Typography>Total : {props.total_amount}</Typography>
        </Box>
    )
}

