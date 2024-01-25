import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

const ExploreCard = ({ image, project_name, sub_title, price }) => {
    return (
        <>
            <Box sx={{ minWidth: '360px', flex: 1, height: '250px', position: 'relative', mb: 6, }}>
                <Box sx={{ width: '100%', height: '100%', borderRadius: '10px', opacity: '0.9' }}>
                    <img
                        src='https://www.cio.com/wp-content/uploads/2023/07/shutterstock_676661263.jpg?resize=1240%2C826&quality=50&strip=all'
                        alt=''
                        width="100%"
                        height="100%"
                        style={{
                            borderRadius: '10px',
                            objectFit: 'cover'
                        }}
                    />
                </Box>
                <Box sx={{ position: 'absolute', width: '80%', left: '10%', bottom: '-50px', }}>
                    <Paper elevation={6} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '10px', borderRadius: '15px', bgcolor: '#e3f2fd' }}>
                        <Box>
                            <Typography variant='h3'>Royal Empire</Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6'>3, 4, 5 BHK, 34 empire, Bhopal</Typography>
                        </Box>
                        <Box>
                            <Typography variant='h5'>34 L - 30 Cr</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default ExploreCard