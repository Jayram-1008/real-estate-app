import React, { useEffect, useState } from 'react';
import { Paper, Box, TextField, Typography, Button, Autocomplete, FormControl, InputLabel, MenuItem, Select, FormHelperText, useTheme, IconButton, Avatar } from '@mui/material';
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

const NewVisit = () => {

    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const { apiUrl } = useMycontext();
    const [file, setFile] = useState({ file: null });
    const [customer, setCustomer] = useState([]);
    const [loading, setLoading] = useState(false);

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
        console.log(values.customer.customer_id);
        formData.append('customer', values.customer.customer_id);
        formData.append('visitdetails', values.visit_details);
        formData.append('remark', values.remark);
        if (file.file !== null) {
            formData.append('photo', file.file, file.file.name);
        }
        else {
            formData.append('photo', "");
        }
        setLoading(true);
        axios.post(apiUrl + 'visit/newvisit', formData)
            .then(function (response) {
                if (response.data.status) {
                    enqueueSnackbar(response.data.message, { variant: "success" });
                    setFile({ file: null });
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
        resetForm();
    }

    const getCustomer = () => {
        axios.get(apiUrl + 'customer/get')
            .then(function (response) {
                if (response.data.status) {
                    setCustomer(response.data.data);
                }
                else {
                    setCustomer([]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getCustomer();
    }, []);


    return (
        <>
            {loading && <CircleLoading />}
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: "20px" }}>
                <Header title="New Visit" />
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
                                                        <Autocomplete
                                                            fullWidth
                                                            autoComplete
                                                            disableClearable
                                                            includeInputInList
                                                            size='small'
                                                            value={values.customer.lable}
                                                            onInputChange={(event, newInputValue) => {
                                                                values.customer = newInputValue;
                                                            }}
                                                            onChange={(event, newValue) => {
                                                                values.customer = newValue;
                                                            }}
                                                            options={customer.map(option => ({ ...option, label: `${option.first_name} ${option.last_name} : ${option.address}` }))}

                                                            renderInput={(params) =>
                                                                <TextField {...params}
                                                                    variant="standard"
                                                                    sx={{ textTransform: "capitalize" }}
                                                                    label="Customer Name"
                                                                    name="customer"
                                                                    error={!!touched.customer && !!errors.customer}
                                                                    helperText={touched.customer && errors.customer}
                                                                />}
                                                        />
                                                    </FormControl>
                                                </Box>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    variant="standard"
                                                    type="text"
                                                    label="Visit Place"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.visit_details}
                                                    name="visit_details"
                                                    error={!!touched.visit_details && !!errors.visit_details}
                                                    helperText={touched.visit_details && errors.visit_details}
                                                />
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

                                        <Box sx={{ display: "flex", justifyContent: "center", gap: "80px" }}>
                                            <Button
                                                disabled={loading}
                                                type='submit'
                                                sx={{ margin: "20px 0px" }}
                                                variant="contained"
                                            >New Visit</Button>
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
    customer: "",
    visit_details: "",
    remark: "",
}

const checkoutSchema = yup.object().shape({
    customer: yup.object().required("Required"),
    visit_details: yup.string().required("Required"),
});

export default NewVisit