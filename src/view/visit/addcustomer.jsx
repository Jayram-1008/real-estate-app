import React, { useState } from 'react';
import { Paper, Box, TextField, Typography, Button, FormControl, InputLabel, MenuItem, Select, FormHelperText, useTheme, IconButton, Avatar } from '@mui/material';
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Compressor from 'compressorjs';
import Header from '../../components/header';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import dayjs from 'dayjs';
import CircleLoading from '../../components/global/circleloading';
import { useMycontext } from '../../components/global/MyContext';

const AddCustomer = () => {

    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const { apiUrl } = useMycontext();
    const userId = useSelector((state) => state.global.userId);
    const [file, setFile] = useState({ file: null });
    const [sponsor, setSponsor] = useState(null);
    const [loading, setLoading] = useState(false);

    function debounce(fn, delay) {
        var timer = null;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timer);
            return new Promise((resolve) => {
                timer = setTimeout(async function () {
                    try {
                        const result = await fn.apply(context, args);
                        resolve(result);
                    } catch (error) {
                        resolve(null); // Return null in case of an error
                    }
                }, delay);
            });
        };
    }

    const searchPin = async (pincode) => {
        try {
            const response = await fetch('https://api.postalpincode.in/pincode/' + pincode);
            const data = await response.json();
            return [data[0]?.PostOffice[0].District, data[0]?.PostOffice[0].State, data[0]?.PostOffice[0].Country];
        } catch (error) {
            throw error; // You can choose to handle or propagate the error as needed
        }
    };

    const debouncedSearchPin = debounce(searchPin, 1000);

    const handlePChange = (event) => {
        if (event.target.files.length !== 1) {
            return;
        }
        const image = event.target.files[0];
        if ((image?.size) > 300 * 1024) {
            new Compressor(image, {
                quality: 0.6,
                maxWidth: 800,
                maxHeight: 800,
                maxSize: 300 * 1024, // maximum size in bytes
                success(result) {
                    setFile({ file: result, image: URL.createObjectURL(result) });
                },
                error(err) {
                    console.log(err.message);
                },
            });
        } else {
            setFile({ file: event.target.files[0], image: URL.createObjectURL(event.target.files[0]) });
        }

    }

    const handleFormSubmit = (values, onSubmitProps) => {
        const formData = new FormData();
        formData.append('firstname', values.first_name);
        formData.append('lastname', values.last_name);
        formData.append('address', values.address);
        formData.append('gender', values.gender);
        formData.append('country', values.country);
        formData.append('state', values.state);
        formData.append('city', values.city);
        formData.append('pincode', values.pincode);
        formData.append('mobile', values.mobile_no);
        formData.append('email', values.email);
        formData.append('remark', values.remark);
        if (file.file !== null) {
            formData.append('photo', file.file, file.file.name);
        }
        else {
            formData.append('photo', "");
        }
        setLoading(true);
        axios.post(apiUrl + 'customer/add', formData)
            .then(function (response) {
                if (response.data.status) {
                    enqueueSnackbar(response.data.message, { variant: "success" });
                    setFile({ file: null });
                    setSponsor(null);
                    onSubmitProps.resetForm();
                    setLoading(false);
                }
                else {
                    enqueueSnackbar(response.data.message, { variant: "error" });
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    };

    const handleReset = (resetForm) => {
        setFile({ file: null });
        setSponsor(null);
        resetForm();
    }


    return (
        <>
            {loading && <CircleLoading />}
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: "20px" }}>
                <Header title="Add New Customer" />
                {sponsor !== null &&
                    <Box sx={{ width: { xs: "100%", md: "70%" }, display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, backgroundColor: theme.palette.primary.main, padding: "5px 10px", borderRadius: "5px" }}>
                        <Typography sx={{ flex: 1 }} variant='span' color='#fff'>Sponsor Name : <b>{`${sponsor.first_name} ${sponsor.last_name}`}</b></Typography>
                        <Typography sx={{ flex: 1 }} variant='span' color='#fff'>Sponsor ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>{sponsor.associate_id}</b></Typography>
                    </Box>
                }
            </Box>
            <Box sx={{ marginTop: "10px" }}>
                <Paper sx={{ padding: "15px 20px" }}>

                    <Formik
                        enableReinitialize={true}
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
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                                        <Typography variant='h6' color='primary'>Application Information</Typography>
                                        <Box sx={{ display: "flex", gap: "20px", flexDirection: { xs: "column-reverse", md: "row" }, alignItems: "center" }}>
                                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px", }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: { xs: "column", sm: "row" },
                                                        gap: "20px",
                                                    }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        inputProps={{ style: { textTransform: "capitalize" } }}
                                                        variant="standard"
                                                        type="number"
                                                        label="Mobile No"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.mobile_no}
                                                        name="mobile_no"
                                                        error={!!touched.mobile_no && !!errors.mobile_no}
                                                        helperText={touched.mobile_no && errors.mobile_no}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        inputProps={{ style: { textTransform: "capitalize" } }}
                                                        variant="standard"
                                                        type="text"
                                                        label="First Name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.first_name}
                                                        name="first_name"
                                                        error={!!touched.first_name && !!errors.first_name}
                                                        helperText={touched.first_name && errors.first_name}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        inputProps={{ style: { textTransform: "capitalize" } }}
                                                        variant="standard"
                                                        type="text"
                                                        label="Last Name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.last_name}
                                                        name="last_name"
                                                        error={!!touched.last_name && !!errors.last_name}
                                                        helperText={touched.last_name && errors.last_name}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: { xs: "column", sm: "row" },
                                                        gap: "20px",
                                                    }}
                                                >
                                                    <FormControl variant='standard' fullWidth sx={{ flex: 1 }}>
                                                        <InputLabel id="demo-select-gender">Gender</InputLabel>
                                                        <Select
                                                            label="Gender"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.gender}
                                                            name="gender"
                                                            error={!!touched.gender && !!errors.gender}
                                                        >
                                                            <MenuItem value="male">Male</MenuItem>
                                                            <MenuItem value="female">Female</MenuItem>
                                                            <MenuItem value="other">Other</MenuItem>
                                                        </Select>
                                                        <FormHelperText error={!!touched.gender && !!errors.gender}>{touched.gender && errors.gender}</FormHelperText>
                                                    </FormControl>
                                                    <TextField
                                                        sx={{ flex: 1 }}
                                                        fullWidth
                                                        variant="standard"
                                                        type="text"
                                                        label="Email"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        name="email"
                                                        error={!!touched.email && !!errors.email}
                                                        helperText={touched.email && errors.email}
                                                    />
                                                    <TextField
                                                        sx={{ flex: 2 }}
                                                        fullWidth
                                                        variant="standard"
                                                        type="text"
                                                        label="Address"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.address}
                                                        name="address"
                                                        error={!!touched.address && !!errors.address}
                                                        helperText={touched.address && errors.address}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: { xs: "column", sm: "row" },
                                                        gap: "20px",
                                                    }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        variant="standard"
                                                        type="number"
                                                        label="Pincode"
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            debouncedSearchPin(e.target.value)
                                                                .then((data) => {
                                                                    if (data?.length > 0) {
                                                                        setFieldValue("city", data[0]);
                                                                        setFieldValue("state", data[1]);
                                                                        setFieldValue("country", data[2]);
                                                                    } else {
                                                                        setFieldValue("city", "");
                                                                        setFieldValue("state", "");
                                                                        setFieldValue("country", "");
                                                                        enqueueSnackbar("Invalid Pincode !", { variant: "error" });
                                                                    }
                                                                })
                                                                .catch((error) => {
                                                                    console.error('Error:', error);
                                                                });

                                                        }}
                                                        value={values.pincode}
                                                        name="pincode"
                                                        error={!!touched.pincode && !!errors.pincode}
                                                        helperText={touched.pincode && errors.pincode}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        inputProps={{ style: { textTransform: "capitalize" } }}
                                                        disabled
                                                        variant="standard"
                                                        type="text"
                                                        label="City"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.city}
                                                        name="city"
                                                        error={!!touched.city && !!errors.city}
                                                        helperText={touched.city && errors.city}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        inputProps={{ style: { textTransform: "capitalize" } }}
                                                        disabled
                                                        variant="standard"
                                                        type="text"
                                                        label="State"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.state}
                                                        name="state"
                                                        error={!!touched.state && !!errors.state}
                                                        helperText={touched.state && errors.state}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        inputProps={{ style: { textTransform: "capitalize" } }}
                                                        disabled
                                                        variant="standard"
                                                        type="text"
                                                        label="Country"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.country}
                                                        name="country"
                                                        error={!!touched.country && !!errors.country}
                                                        helperText={touched.country && errors.country}
                                                    />
                                                </Box>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    variant="standard"
                                                    type="text"
                                                    label="Remark"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.remark}
                                                    name="remark"
                                                    error={!!touched.remark && !!errors.remark}
                                                    helperText={touched.remark && errors.remark}
                                                />
                                            </Box>
                                            <Paper sx={{ display: "flex", justifyContent: 'center', flexDirection: "column", alignItems: "center", width: { xs: "100%", md: "180px" }, height: { xs: "250px", md: "220px" }, }}>
                                                <Avatar alt="Profile" src={file.image}
                                                    sx={{
                                                        width: { xs: "100%", md: "180px" },
                                                        height: { xs: "220px", md: "180px" },
                                                        marginBottom: "0px",
                                                        borderRadius: "10px"
                                                    }}
                                                >Upload Photo</Avatar>
                                                <IconButton color="primary" aria-label="upload picture" component="label">
                                                    <input hidden accept="image/*" type="file" onChange={handlePChange} />
                                                    <Typography variant='h6'>{file.file === null ? "UPLOAD" : "CHANGE"}&nbsp;</Typography>
                                                </IconButton>
                                            </Paper>
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "center", gap: "50px" }}>
                                            <Button
                                                disabled={loading}
                                                type='submit'
                                                sx={{ margin: "20px 0px" }}
                                                variant="contained"
                                            >Add Customer</Button>
                                            <Button
                                                type='reset'
                                                color='error'
                                                onClick={() => handleReset(resetForm)}
                                                sx={{ margin: "20px 0px" }}
                                                variant="outlined"
                                            >Reset Form</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>

                </Paper>
            </Box >
        </>
    )
}

const initialValues = {
    first_name: "",
    last_name: "",
    address: "",
    gender: "male",
    pincode: "",
    city: "",
    state: "",
    country: "",
    mobile_no: "",
    email: "",
    remark: "",
}

const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    address: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    pincode: yup.string().min(6, "Pincode must be 6 digit").required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    country: yup.string().required("Required"),
    mobile_no: yup.string().min(10, "Mobile no must be 10 digits").max(10, "Mobile no must be 10 digits").required("Required"),
    email: yup.string().email("Email is not Valid"),
    remark: yup.string()
});

export default AddCustomer