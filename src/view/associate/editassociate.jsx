import React, { useEffect, useState } from 'react';
import { Paper, Box, TextField, Typography, Button, InputAdornment, FormControl, InputLabel, MenuItem, Select, FormHelperText, useTheme, IconButton, Avatar } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import Compressor from 'compressorjs';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../../components/header';
import { useMycontext } from '../../components/global/MyContext';
import CircleLoading from '../../components/global/circleloading';


const AddAssociate = () => {

    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const userId = useSelector((state) => state.global.userId);
    const navigate = useNavigate();
    const { apiUrl, user } = useMycontext();
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState({ file: null });
    const [sponsor, setSponsor] = useState(null);
    const [formValues, setFormValues] = useState({
        sponsor_code: "",
        category: "Diamond",
        branch: "Bhopal",
        first_name: "",
        last_name: "",
        father_name: "",
        father_last_name: "",
        permanent_address: "",
        blood_group: "N/A",
        gender: "male",
        date_of_birth: "1980-09-12",
        anniversary_date: "2023-09-12",
        pincode: "",
        city: "",
        state: "",
        country: "",
        mobile_no: "",
        pan_no: "",
        local_address: "",
        email_id: "",
        bank_ac_no: "",
        bank_name: "",
        bank_ifsc: "",
        nominee_name: "",
        nominee_last_name: "",
        relationship: "",
        join_date: "",
    });

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
        formData.append('associateid', userId.payload);
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
        formData.append('pan', values.pan_no);
        formData.append('localaddress', values.local_address);
        formData.append('email', values.email_id);
        formData.append('bankaccountno', values.bank_ac_no);
        formData.append('bankname', values.bank_name);
        formData.append('ifsc', values.bank_ifsc);
        formData.append('nomineename', values.nominee_name);
        formData.append('nomineelastname', values.nominee_last_name);
        formData.append('relationship', values.relationship);
        if (file.file !== null) {
            formData.append('photo', file.file, file.file.name);
        }
        else {
            formData.append('photo', "");
        }
        setLoading(true);
        axios.post(apiUrl + 'associate/updateprofile', formData)
            .then(function (response) {
                if (response.data.status) {
                    enqueueSnackbar(response.data.message, { variant: "success" });
                    setFile({ file: null });
                    onSubmitProps.resetForm();
                    getAssociateDetails();
                }
                else {

                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    };

    const getAssociateDetails = () => {
        setLoading(true);
        axios.get(apiUrl + 'associate/getone?id=' + userId.payload)
            .then(function (response) {
                if (response.data.status) {
                    setFormValues(response.data.data);
                }
                else {
                    navigate('/associate-report');
                    enqueueSnackbar(response.data.message, { variant: "error" });
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getAssociateDetails();
    }, []);


    return (
        <>
            {loading && <CircleLoading />}
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: "20px" }}>
                <Header title="Edit Profile" />
                {sponsor !== null &&
                    <Box sx={{ width: { xs: "100%", md: "70%" }, display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, backgroundColor: theme.palette.primary.main, padding: "5px 10px", borderRadius: "5px" }}>
                        <Typography sx={{ flex: 1 }} variant='span' color='#fff'>Sponsor Name : <b>{`${formValues.sponsor_first_name} ${formValues.sponsor_last_name}`}</b></Typography>
                        <Typography sx={{ flex: 1 }} variant='span' color='#fff'>Sponsor ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <b>{formValues.sponsor_code}</b></Typography>
                    </Box>
                }
            </Box>
            <Box sx={{ marginTop: "10px" }}>
                <Paper sx={{ padding: "15px 20px" }}>

                    <Formik
                        enableReinitialize={true}
                        onSubmit={handleFormSubmit}
                        initialValues={formValues}
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
                                                        disabled
                                                        inputProps={{ style: { textTransform: "uppercase" } }}
                                                        variant="standard"
                                                        type="text"
                                                        label="Associate ID"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.associate_id}
                                                        name="associate_id"
                                                        error={!!touched.associate_id && !!errors.associate_id}
                                                        helperText={touched.associate_id && errors.associate_id}
                                                    />
                                                    <FormControl variant='standard' fullWidth>
                                                        <InputLabel id="demo-select-Category">Category</InputLabel>
                                                        <Select
                                                            disabled
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
                                                            disabled
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
                                                        disabled
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
                                                        disabled
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
                                                        disabled
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
                                                    label="Permanent Address"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.permanent_address}
                                                    name="permanent_address"
                                                    error={!!touched.permanent_address && !!errors.permanent_address}
                                                    helperText={touched.permanent_address && errors.permanent_address}
                                                />
                                            </Box>
                                            <Paper sx={{ display: "flex", justifyContent: 'center', flexDirection: "column", alignItems: "center", width: "150px", height: "220px" }}>
                                                <Avatar alt="Profile" src={file.file === null ? apiUrl + "assets/associate-photos/" + userId.payload + ".png" : file.image}
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
                                                disabled
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
                                                value={values.email_id}
                                                name="email_id"
                                                error={!!touched.email_id && !!errors.email_id}
                                                helperText={touched.email_id && errors.email_id}
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
                                                    value={values.bank_ac_no}
                                                    name="bank_ac_no"
                                                    error={!!touched.bank_ac_no && !!errors.bank_ac_no}
                                                    helperText={touched.bank_ac_no && errors.bank_ac_no}
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
                                        <Box sx={{ display: "flex", justifyContent: "center", gap: "80px" }}>
                                            <Button
                                                type='submit'
                                                sx={{ margin: "20px 0px" }}
                                                variant="contained"
                                            >Update Profile</Button>
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

const checkoutSchema = yup.object().shape({
    sponsor_code: yup.string().required("Required"),
    category: yup.string().required("Required"),
    branch: yup.string().required("Required"),
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    father_name: yup.string().required("Required"),
    father_last_name: yup.string().required("Required"),
    permanent_address: yup.string().required("Required"),
    blood_group: yup.string(),
    gender: yup.string().required("Required"),
    date_of_birth: yup.string().required("Required"),
    anniversary_date: yup.string(),
    pincode: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    country: yup.string().required("Required"),
    mobile_no: yup.string().required("Required"),
    pan_no: yup.string().required("Required"),
    email_id: yup.string().email("Email is not Valid"),
    local_address: yup.string(),
    bank_ac_no: yup.string(),
    bank_name: yup.string(),
    bank_ifsc: yup.string(),
    nominee_name: yup.string().required("Required"),
    nominee_last_name: yup.string().required("Required"),
    relationship: yup.string().required("Required"),
    join_date: yup.string().required("Required"),
});

export default AddAssociate