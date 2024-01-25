import React, { useMemo, useState } from 'react';
import { Paper, Box, TextField, Link, Typography, Button, InputAdornment, FormControl, InputLabel, MenuItem, Select, FormHelperText, useTheme, IconButton, Avatar } from '@mui/material';
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

const AddAssociate = () => {

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
        formData.append('category', values.category);
        formData.append('branch', values.branch);
        formData.append('sponsorcode', userId.payload);
        formData.append('firstname', values.first_name);
        formData.append('lastname', values.last_name);
        formData.append('fathername', values.father_name);
        formData.append('fatherlastname', values.father_last_name);
        formData.append('address', values.permanent_address);
        formData.append('birthdate', values.date_of_birth);
        formData.append('gender', values.gender);
        formData.append('anniversary', values.anniversary_date);
        formData.append('bloodgroup', values.blood_group);
        formData.append('country', values.country);
        formData.append('state', values.state);
        formData.append('city', values.city);
        formData.append('pincode', values.pincode);
        formData.append('mobile', values.mobile_no);
        formData.append('pan', values.pan_no);
        formData.append('localaddress', values.local_address);
        formData.append('email', values.email);
        formData.append('bankaccountno', values.bank_acc_no);
        formData.append('bankname', values.bank_name);
        formData.append('ifsc', values.bank_ifsc);
        formData.append('nomineename', values.nominee_name);
        formData.append('nomineelastname', values.nominee_last_name);
        formData.append('relationship', values.relationship);
        formData.append('join-date', values.join_date);
        if (file.file !== null) {
            formData.append('photo', file.file, file.file.name);
        }
        else {
            formData.append('photo', "");
        }
        setLoading(true);
        axios.post(apiUrl + 'associate/add', formData)
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
                <Header title="Add Asociate" />
                {sponsor !== null &&
                    <Box sx={{ width: { xs: "100%", md: "70%" }, display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, backgroundColor: theme.palette.primary.main, padding: "5px 10px", borderRadius: "5px" }}>
                        <Typography sx={{ flex: 1 }} variant='span' color='#fff'>Sponsor Name : <b>{`${sponsor.first_name} ${sponsor.last_name}`}</b></Typography>
                        <Typography sx={{ flex: 1 }} variant='span' color='#fff'>Sponsor ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <b>{sponsor.associate_id}</b></Typography>
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
                                                    <FormControl variant='standard' fullWidth>
                                                        <InputLabel id="demo-select-Category">Category</InputLabel>
                                                        <Select
                                                            label="Category"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.category}
                                                            name="category"
                                                            error={!!touched.category && !!errors.category}
                                                        >
                                                            <MenuItem value="Diamond">Diamond</MenuItem>
                                                            <MenuItem value="Gold">Gold</MenuItem>
                                                        </Select>
                                                        <FormHelperText error={!!touched.category && !!errors.category}>{touched.category && errors.category}</FormHelperText>
                                                    </FormControl>
                                                    <FormControl variant='standard' fullWidth>
                                                        <InputLabel id="demo-select-branch">Branch</InputLabel>
                                                        <Select
                                                            label="Branch"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.branch}
                                                            name="branch"
                                                            error={!!touched.branch && !!errors.branch}
                                                        >
                                                            <MenuItem value="Bhopal">Bhopal</MenuItem>
                                                        </Select>
                                                        <FormHelperText error={!!touched.branch && !!errors.branch}>{touched.branch && errors.branch}</FormHelperText>
                                                    </FormControl>
                                                    <TextField
                                                        fullWidth
                                                        inputProps={{ style: { textTransform: "capitalize" } }}
                                                        variant="standard"
                                                        type="date"
                                                        label="Joining Date"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.join_date}
                                                        name="join_date"
                                                        error={!!touched.join_date && !!errors.join_date}
                                                        helperText={touched.join_date && errors.join_date}
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
                                                    <TextField
                                                        fullWidth
                                                        inputProps={{ style: { textTransform: "capitalize" } }}
                                                        variant="standard"
                                                        type="text"
                                                        label="Father/Husband First Name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.father_name}
                                                        name="father_name"
                                                        error={!!touched.father_name && !!errors.father_name}
                                                        helperText={touched.father_name && errors.father_name}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        inputProps={{ style: { textTransform: "capitalize" } }}
                                                        variant="standard"
                                                        type="text"
                                                        label="Father/Husband Last Name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.father_last_name}
                                                        name="father_last_name"
                                                        error={!!touched.father_last_name && !!errors.father_last_name}
                                                        helperText={touched.father_last_name && errors.father_last_name}
                                                    />
                                                </Box>
                                                <TextField
                                                    fullWidth
                                                    variant="standard"
                                                    type="text"
                                                    label="Permanent "
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.permanent_address}
                                                    name="permanent_address"
                                                    error={!!touched.permanent_address && !!errors.permanent_address}
                                                    helperText={touched.permanent_address && errors.permanent_address}
                                                />
                                            </Box>
                                            <Paper sx={{ display: "flex", justifyContent: 'center', flexDirection: "column", alignItems: "center", width: "150px", height: "215px" }}>
                                                <Avatar alt="Profile" src={file.image}
                                                    sx={{
                                                        width: "150px",
                                                        height: "180px",
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
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: { xs: "column", sm: "row" },
                                                gap: "20px",
                                            }}
                                        >
                                            <FormControl fullWidth variant='standard'>
                                                <InputLabel id="select-blood-group">Blood Group</InputLabel>
                                                <Select
                                                    label="Blood Group"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.blood_group}
                                                    name="blood_group"
                                                    error={!!touched.blood_group && !!errors.blood_group}
                                                >
                                                    <MenuItem value="N/A">N/A</MenuItem>
                                                    <MenuItem value="A+">A+</MenuItem>
                                                    <MenuItem value="A">A-</MenuItem>
                                                    <MenuItem value="B+">B+</MenuItem>
                                                    <MenuItem value="B-">B-</MenuItem>
                                                    <MenuItem value="O+">O+</MenuItem>
                                                    <MenuItem value="O-">O-</MenuItem>
                                                    <MenuItem value="AB+">AB+</MenuItem>
                                                    <MenuItem value="AB-">AB-</MenuItem>
                                                </Select>
                                                <FormHelperText error={!!touched.blood_group && !!errors.blood_group}>{touched.blood_group && errors.blood_group}</FormHelperText>
                                            </FormControl>
                                            <FormControl variant='standard' fullWidth>
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
                                                fullWidth
                                                variant="standard"
                                                type="date"
                                                label="Date of birth"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.date_of_birth}
                                                name="date_of_birth"
                                                error={!!touched.date_of_birth && !!errors.date_of_birth}
                                                helperText={touched.date_of_birth && errors.date_of_birth}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                type="date"
                                                label="Anniversary Date"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.anniversary_date}
                                                name="anniversary_date"
                                                error={!!touched.anniversary_date && !!errors.anniversary_date}
                                                helperText={touched.anniversary_date && errors.anniversary_date}
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
                                                inputProps={{ style: { textTransform: "uppercase" } }}
                                                variant="standard"
                                                type="text"
                                                label="PAN No"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.pan_no}
                                                name="pan_no"
                                                error={!!touched.pan_no && !!errors.pan_no}
                                                helperText={touched.pan_no && errors.pan_no}
                                            />
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
                                        <Box sx={{ display: "flex", gap: "20px", flexDirection: { xs: "column", sm: "row" } }}>
                                            <TextField
                                                fullWidth
                                                sx={{ flex: 1 }}
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
                                                sx={{ flex: 1 }}
                                                inputProps={{
                                                    style: {
                                                        textTransform: "lowercase"
                                                    }
                                                }}
                                                variant="standard"
                                                type="email"
                                                label="Email ID"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                name="email"
                                                error={!!touched.email && !!errors.email}
                                                helperText={touched.email && errors.email}
                                            />
                                            <TextField
                                                fullWidth
                                                sx={{ flex: 2 }}
                                                variant="standard"
                                                type="text"
                                                label="Local Address"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.local_address}
                                                name="local_address"
                                                error={!!touched.local_address && !!errors.local_address}
                                                helperText={touched.local_address && errors.local_address}
                                            />
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                                            <Typography variant='h6' color='primary'>Bank Information</Typography>
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
                                                    label="Bank Account No"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.bank_acc_no}
                                                    name="bank_acc_no"
                                                    error={!!touched.bank_acc_no && !!errors.bank_acc_no}
                                                    helperText={touched.bank_acc_no && errors.bank_acc_no}
                                                />
                                                <TextField
                                                    fullWidth
                                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                                    variant="standard"
                                                    type="text"
                                                    label="Bank Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.bank_name}
                                                    name="bank_name"
                                                    error={!!touched.bank_name && !!errors.bank_name}
                                                    helperText={touched.bank_name && errors.bank_name}
                                                />
                                                <TextField
                                                    fullWidth
                                                    inputProps={{ style: { textTransform: "uppercase" } }}
                                                    variant="standard"
                                                    type="text"
                                                    label="Bank IFSC"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.bank_ifsc}
                                                    name="bank_ifsc"
                                                    error={!!touched.bank_ifsc && !!errors.bank_ifsc}
                                                    helperText={touched.bank_ifsc && errors.bank_ifsc}
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                                            <Typography variant='h6' color='primary'>Nominee Information</Typography>
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
                                                    type="text"
                                                    label="Nominee First Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.nominee_name}
                                                    name="nominee_name"
                                                    error={!!touched.nominee_name && !!errors.nominee_name}
                                                    helperText={touched.nominee_name && errors.nominee_name}
                                                />
                                                <TextField
                                                    fullWidth
                                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                                    variant="standard"
                                                    type="text"
                                                    label="Nominee Last Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.nominee_last_name}
                                                    name="nominee_last_name"
                                                    error={!!touched.nominee_last_name && !!errors.nominee_last_name}
                                                    helperText={touched.nominee_last_name && errors.nominee_last_name}
                                                />
                                                <TextField
                                                    fullWidth
                                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                                    variant="standard"
                                                    type="text"
                                                    label="Relationship with Applicant"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.relationship}
                                                    name="relationship"
                                                    error={!!touched.relationship && !!errors.relationship}
                                                    helperText={touched.relationship && errors.relationship}
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "center", gap: "50px" }}>
                                            <Button
                                                disabled={loading}
                                                type='submit'
                                                sx={{ margin: "20px 0px" }}
                                                variant="contained"
                                            >Add Associate</Button>
                                            <Button
                                                type='reset'
                                                color='error'
                                                onClick={() => handleReset(resetForm)}
                                                sx={{ margin: "20px 0px" }}
                                                variant="contained"
                                            >Reset Form</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>

                </Paper>
            </Box>
        </>
    )
}

const initialValues = {
    category: "Diamond",
    branch: "Bhopal",
    join_date: dayjs().format('YYYY-MM-DD'),
    first_name: "",
    last_name: "",
    father_name: "",
    father_last_name: "",
    permanent_address: "",
    blood_group: "N/A",
    gender: "male",
    date_of_birth: "",
    anniversary_date: "0000-00-00",
    pincode: "",
    city: "",
    state: "",
    country: "",
    mobile_no: "",
    pan_no: "",
    local_address: "",
    email: "",
    bank_acc_no: "",
    bank_name: "",
    bank_ifsc: "",
    nominee_name: "",
    nominee_last_name: "",
    relationship: "",
}

const checkoutSchema = yup.object().shape({
    category: yup.string().required("Required"),
    branch: yup.string().required("Required"),
    join_date: yup.string().required("Required"),
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    father_name: yup.string().required("Required"),
    father_last_name: yup.string().required("Required"),
    permanent_address: yup.string().required("Required"),
    blood_group: yup.string(),
    gender: yup.string().required("Required"),
    date_of_birth: yup.string().required("Required"),
    anniversary_date: yup.string(),
    pincode: yup.string().min(6, "Pincode must be 6 digit").required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    country: yup.string().required("Required"),
    mobile_no: yup.string().min(10, "Mobile no must be 10 digits").max(10, "Mobile no must be 10 digits").required("Required"),
    pan_no: yup.string().required("Required"),
    email: yup.string().email("Email is not Valid"),
    local_address: yup.string(),
    bank_acc_no: yup.string(),
    bank_name: yup.string(),
    bank_ifsc: yup.string(),
    nominee_name: yup.string().required("Required"),
    nominee_last_name: yup.string().required("Required"),
    relationship: yup.string().required("Required"),
});

export default AddAssociate