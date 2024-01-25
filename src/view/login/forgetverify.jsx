import { Button, Paper, Typography, Box, Alert, Collapse, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import backimage from '../../assets/images/backimage.png';
import { useMycontext } from '../../components/global/MyContext';


const PassVerify = () => {

    const [error, setError] = useState(true);
    const [errorMsg, setErrorMsg] = useState('OTP Send.');
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();
    const { user, setUser } = useMycontext();

    useEffect(() => {
        let timer;

        if (error) {
            timer = setTimeout(() => {
                setError(false);
            }, 3000); // 3000 milliseconds = 3 seconds
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [error]);

    const handleChange = (newValue) => {
        setOtp(newValue)
        if (newValue / 1000 > 1) {
            callVerify(newValue);
        }
    }
    const callVerify = (newValue) => {
        setUser({ "mobile": user.mobile, "otp": newValue });
        navigate('/reset');
    }

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div className='main-background'>
                    <img src={backimage} alt='bg-img'></img>
                </div>
                <Box
                    sx={{
                        margin: "20px",
                        textAlign: "center"
                    }}
                >
                    <Typography variant='h1' color='primary'>Real Estate</Typography>
                    <Typography variant='p'>Tilakram Group</Typography>
                </Box>
                <Paper sx={{ maxWidth: "600px", padding: { xs: "30px 30px 40px 30px", md: "30px 120px 40px 120px" } }}>
                    <Typography variant='h2'
                        sx={{
                            textAlign: "center",
                            marginBottom: "20px",
                        }}
                    >Welcome Associates</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
                        <Collapse in={error}>
                            <Alert severity="success"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setError(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                {errorMsg}
                            </Alert>
                        </Collapse>
                        <MuiOtpInput length={4} value={otp} TextFieldsProps={{ type: "number" }} onChange={handleChange} sx={{ gap: 1 }} />
                        <Button
                            fullWidth
                            sx={{ marginTop: "20px" }}
                            variant="contained"
                            onClick={() => { callVerify(otp) }}
                        >Verify</Button>
                    </Box>

                </Paper>
            </Box>
        </>


    )
}

export default PassVerify