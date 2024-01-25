import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ExplorePlaces = ({ projectName, rupees, squareFeet }) => {
    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    minWidth: '300px',
                    height: '400px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: 'linear-gradient(to left bottom, #fafafa, #9e9e9e)',
                    position: 'relative', // Add position relative to the container,
                    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/440px-Image_created_with_a_mobile_phone.png")',
                    backgroundSize: "cover",
                    backgroundRepeate: "no-repeate",
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'relative', // Add position relative to the inner box
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)', // Position text at the bottom center
                            textAlign: 'center',
                            padding: '10px',
                            color: 'white',
                        }}
                    >
                        <Typography variant="h6">{projectName} Sundaram Project</Typography>
                        <Typography variant="h6">
                            {rupees}20 Lakh {squareFeet}200 sq.ft.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ExplorePlaces;