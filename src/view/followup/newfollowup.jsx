import React, { useState } from 'react';
import { Paper, Box, TextField, Typography, Button, FormControl, InputLabel, MenuItem, Select, FormHelperText, useTheme, IconButton, Avatar } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import dayjs from 'dayjs';
import Header from '../../components/header';
import CircleLoading from '../../components/global/circleloading';
import { useMycontext } from '../../components/global/MyContext';

const NewFollowUp = () => {

    const { enqueueSnackbar } = useSnackbar();
    const { apiUrl } = useMycontext();
    const userId = useSelector((state) => state.global.userId);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = (values, onSubmitProps) => {
        console.log(values);
        const formData = new FormData();
        formData.append('fullname', values.full_name);
        formData.append('mettingplace', values.metting_place);
        formData.append('address', values.address);
        formData.append('mobile', values.mobile_no);
        formData.append('datetime', values.fdate + " " + values.ftime);
        formData.append('remark', values.remark);
        setLoading(true);
        axios.post(apiUrl + 'followup/add', formData)
            .then(function (response) {
                if (response.data.status) {
                    enqueueSnackbar(response.data.message, { variant: "success" });
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
        resetForm();
    }

    return (
        <>
            {loading && <CircleLoading />}
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: "20px" }}>
                <Header title="New Follow UP" />
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
                                                        label="Full Name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.full_name}
                                                        name="full_name"
                                                        error={!!touched.full_name && !!errors.full_name}
                                                        helperText={touched.full_name && errors.full_name}
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
                                                        label="Metting Place"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.metting_place}
                                                        name="metting_place"
                                                        error={!!touched.metting_place && !!errors.metting_place}
                                                        helperText={touched.metting_place && errors.metting_place}
                                                    />
                                                    <TextField
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
                                                <Box sx={{ display: "flex", gap: "20px", flexDirection: { xs: "column", sm: "row" }, }}>
                                                    <Box sx={{ display: "flex", flex: 1, gap: "20px", flexDirection: { xs: "column", sm: "row" }, }}>
                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            type="date"
                                                            label="Follow Date"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.fdate}
                                                            name="fdate"
                                                            error={!!touched.fdate && !!errors.fdate}
                                                            helperText={touched.fdate && errors.fdate}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            type="time"
                                                            label="Remark"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.ftime}
                                                            name="ftime"
                                                            error={!!touched.ftime && !!errors.ftime}
                                                            helperText={touched.ftime && errors.ftime}
                                                        />
                                                    </Box>
                                                    <TextField
                                                        sx={{ flex: 2 }}
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

                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "center", gap: "50px" }}>
                                            <Button
                                                disabled={loading}
                                                type='submit'
                                                sx={{ margin: "20px 0px" }}
                                                variant="contained"
                                            >Add Follow Up</Button>
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
    full_name: "",
    mobile_no: "",
    metting_place: "",
    address: "",
    fdate: dayjs().format('YYYY-MM-DD'),
    ftime: dayjs().format('HH:mm'),
    remark: "",
}

const checkoutSchema = yup.object().shape({
    full_name: yup.string().required("Required"),
    mobile_no: yup.string().min(10, "Mobile no must be 10 digits").max(10, "Mobile no must be 10 digits").required("Required"),
    metting_place: yup.string().required("Required"),
    address: yup.string().required("Required"),
    fdate: yup.string().required("Required"),
    ftime: yup.string().required("Required"),
    remark: yup.string(),
});

export default NewFollowUp