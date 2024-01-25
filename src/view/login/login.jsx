import React, { useState } from 'react';
import { Box, Paper, Button, IconButton, TextField, Typography, Alert, Collapse, useTheme } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import backimage from '../../assets/images/backimage.png';
import { setName, setUserId } from '../../store/globalSlice';
import { useMycontext } from '../../components/global/MyContext';

const Login = (props) => {
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { apiUrl } = useMycontext();
    const theme = useTheme();

    const handleFormSubmit = (values) => {
        if (values.mobile === '' || values.password === '') {
            setError(true);
            setErrorMsg("Please Fill all details.");
        }
        else {
            callLogin(values);
        }
    }

    const callLogin = (values) => {
        const formData = new FormData();
        formData.append('mobile_no', values.mobile);
        formData.append('password', values.password);
        axios.post(apiUrl + 'associate/register/login', formData)
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
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                    width: "300px"
                                }}
                            >
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
                                <Box sx={{ textAlign: "right" }}><Link to='/forget'><Typography color={theme.palette.primary.main} variant='h6'>Forget Password?</Typography></Link></Box>
                                <Button variant="contained" fullWidth type="submit">
                                    Login
                                </Button>
                                <Link to='/login-otp'><Button variant="outlined" fullWidth type="submit">
                                    Login with OTP
                                </Button></Link>
                            </Box>
                        </form>
                    )}
                </Formik>

            </Paper>
        </Box>
    )
}

const passExp = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

const checkoutSchema = yup.object().shape({
    mobile: yup.string().required("Required"),
    password: yup.string().matches(passExp, "Password must contain minimum eight characters, at least one letter and one number.")
        .required("Required"),

});
const initialValues = {

    mobile: "",
    password: "",

};

export default Login