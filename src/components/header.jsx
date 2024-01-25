import { Typography } from '@mui/material'
import React from 'react'

const Header = ({ title }) => {
    return (
        <Typography variant='h3'>{title}</Typography>
    )
}

export default Header