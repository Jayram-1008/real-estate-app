import { Button, Paper, Typography, Box, TextField, Alert, Collapse, IconButton, useTheme } from '@mui/material'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import backimage from '../../assets/images/backimage.png';
import { useMycontext } from '../../components/global/MyContext';
import { setName, setUserId } from '../../store/globalSlice';

const Reset = (props) => {

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const theme = useTheme();

    const { apiUrl, user } = useMycontext();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = (values) => {
        callReset(values);
    }

    const callReset = (values) => {
        const formData = new FormData();
        formData.append('mobile_no', user.mobile);
        formData.append('password', values.password);
        formData.append('otp', user.otp);
        axios.post(apiUrl + 'associate/register/reset', formData)
            .then(function (response) {
                if (response.data.status) {
                    dispatch(setUserId(response.data.data.id));
                    dispatch(setName(response.data.data.name));
                    props.setRole(response.data.data.role);
                    navigate('/');
                }
                else {
                    setError(true);
                    setErrorMsg(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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
                                        type="password"
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={!!touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="password"
                                        label="Confirm Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.cpassword}
                                        name="cpassword"
                                        error={!!touched.cpassword && !!errors.cpassword}
                                        helperText={touched.cpassword && errors.cpassword}
                                    />
                                    <Box sx={{ textAlign: "center", marginTop: "20px" }}>Already have account? <Link to='/login'><Typography variant="h7" color={theme.palette.primary.main}>Login</Typography></Link></Box>
                                    <Button
                                        fullWidth
                                        sx={{ marginTop: "20px" }}
                                        variant="contained"
                                        type='submit'
                                    >Reset</Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Box>
        </>
    )
}

const passExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const checkoutSchema = yup.object().shape({
    password: yup.string().matches(passExp, "Password must contain minimum eight characters, at least one letter and one number.").required("Required"),
    cpassword: yup.string().matches(passExp, "Password must contain minimum eight characters, at least one letter and one number.").oneOf([yup.ref('password'), null], 'Passwords must match').required("Required"),
});

const initialValues = {
    password: "",
    cpassword: "",
};

export default Reset