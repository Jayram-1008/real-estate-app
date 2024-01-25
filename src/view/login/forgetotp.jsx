import React, { useState } from 'react';
import { Box, Paper, Button, IconButton, TextField, Typography, Alert, Collapse } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { Formik } from "formik";
import * as yup from "yup";
import CloseIcon from '@mui/icons-material/Close';
import backimage from '../../assets/images/backimage.png';
import axios from 'axios';
import { useMycontext } from '../../components/global/MyContext';
import CircleLoading from '../../components/global/circleloading';

const Loginotp = () => {

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { apiUrl, setUser } = useMycontext();

    const handleFormSubmit = (values) => {
        sendOTP(values);
    }

    const sendOTP = (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('mobile_no', values.mobile);
        axios.post(apiUrl + 'associate/register/sendotp', formData)
            .then(function (response) {
                if (response.data.status) {
                    setUser({ 'mobile': values.mobile });
                    navigate('/forget-verify');
                    setLoading(false);
                }
                else {
                    setError(true);
                    setErrorMsg(response.data.message);
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    return (
        <>
            {loading && <CircleLoading />}
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
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
                                    <Collapse in={error}>
                                        <Alert severity="error"
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
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="number"
                                        label="Mobile"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.mobile}
                                        name="mobile"
                                        error={!!touched.mobile && !!errors.mobile}
                                        helperText={touched.mobile && errors.mobile}
                                    />
                                    <Button
                                        disabled={loading}
                                        fullWidth
                                        sx={{ marginTop: "20px" }}
                                        variant="contained"
                                        type='submit'
                                    >Send OTP</Button>
                                </Box>
                            </form>
                        )}
                    </Formik>

                </Paper>
            </Box>
        </>

    )
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    mobile: yup.string().min(10).matches(phoneRegExp, "Phone number is not valid.").required("Required"),
});

const initialValues = {
    mobile: "",
};

export default Loginotp