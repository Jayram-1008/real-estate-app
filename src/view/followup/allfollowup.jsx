import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import { Paper, Box, Typography, FormControl, OutlinedInput, InputAdornment, Button, Modal, IconButton } from '@mui/material';
import { Search, Delete, Event, AccessTime } from '@mui/icons-material';
import axios from 'axios';
import { useMycontext } from '../../components/global/MyContext';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import CircleLoading from '../../components/global/circleloading';

const AllFollowUp = () => {

    const navigate = useNavigate();
    const { apiUrl } = useMycontext();
    const [followUp, setFollowUp] = useState([]);
    const [seletion, setSelection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => { setSelection(id); setOpen(true) };
    const handleClose = (id) => { setSelection(null); setOpen(false) };
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = (id) => {
        handleClose();
        setLoading(true);
        axios.delete(apiUrl + 'followup/delete?id=' + id)
            .then(function (response) {
                if (response.data.status) {
                    enqueueSnackbar(response.data.message, { variant: "success" });
                    getAll();
                }
                else {
                    handleClose();
                    enqueueSnackbar(response.data.message, { variant: "error" });
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    const getAll = () => {
        setLoading(true);
        axios.get(apiUrl + 'followup/getall')
            .then(function (response) {
                if (response.data.status) {
                    setFollowUp(response.data.data);
                }
                else {
                    setFollowUp([]);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setLoading(false);
            });
    }

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

    const searchFollowUp = (text) => {
        setLoading(true);
        axios.get(apiUrl + 'followup/search?text=' + text)
            .then(function (response) {
                if (response.data.status) {
                    setFollowUp(response.data.data);
                }
                else {
                    setFollowUp([]);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setLoading(false);
            });
    }

    const debouncedSearchFollowUp = debounce(searchFollowUp, 1000);

    useEffect(() => {
        getAll();
    }, [])

    return (
        <>
            {loading && <CircleLoading />}
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: "10px", alignItems: "center" }}>
                <Header title="My Follow UP" />
                <FormControl sx={{ width: { xs: "100%", md: "40ch" } }} variant="outlined">
                    <OutlinedInput
                        sx={{ height: "35px" }}
                        placeholder="Search..."
                        onChange={(e) => {
                            debouncedSearchFollowUp(e.target.value)
                        }}
                        id="outlined-adornment-weight"
                        endAdornment={
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight"
                        }}
                    />
                </FormControl>
            </Box>
            <Box sx={{ padding: "10px 0px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {followUp.map((item) => {
                    return (
                        <Paper sx={{ padding: '10px', display: "flex", justifyContent: "space-between", gap: "0px", width: { xs: "100%", sm: "100%", md: "calc(50% - 5px)" } }}>
                            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography variant='h6'>Name &nbsp;&nbsp;&nbsp; -</Typography>
                                    <Typography variant='h6'>Mobile &nbsp;&nbsp;&nbsp;-</Typography>
                                    <Typography variant='h6'>Metting &nbsp;-</Typography>
                                    <Typography variant='h6'>Address -</Typography>
                                    <Typography variant='h6'>Remark&nbsp;&nbsp;-</Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.full_name}</Typography>
                                    <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.mobile_no}</Typography>
                                    <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.metting_place}</Typography>
                                    <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.address}</Typography>
                                    <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.remark + "."}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-between", flexDirection: "column", gap: "20px" }} >
                                <Box>
                                    <Typography variant='h6' sx={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "5px" }}><Event fontSize='small' color='primary' />{dayjs(item.date_time).format('DD-MMM-YYYY')}</Typography>
                                    <Typography variant='h6' sx={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "5px" }}><AccessTime fontSize='small' color='primary' /> {dayjs(item.date_time).format('hh:mm A')}</Typography>
                                </Box>
                                <Button size='small' variant='contained' color='error' startIcon={<Delete />} onClick={(event) => { handleOpen(item.id); event.stopPropagation() }}>Delete</Button>
                            </Box>
                            <Box sx={{ display: { xs: "flex", lg: "none" }, justifyContent: "space-between", flexDirection: "column", gap: "5px" }}>
                                <Box>
                                    <Typography variant='h6' sx={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "5px" }}><Event fontSize='small' color='primary' />{dayjs(item.date_time).format('DD-MMM-YYYY')}</Typography>
                                    <Typography variant='h6' sx={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "5px" }}><AccessTime fontSize='small' color='primary' /> {dayjs(item.date_time).format('hh:mm A')}</Typography>
                                </Box>
                                <IconButton sx={{ padding: "5px", alignSelf: "end" }} color='error' onClick={(event) => { handleOpen(item.id); event.stopPropagation() }}><Delete /></IconButton>
                            </Box>
                        </Paper>
                    )
                })}
            </Box >

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 600,
                    minWidth: 350,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Do you want to Delete Customer?
                    </Typography>
                    <Box sx={{ display: "flex", gap: '10px', marginTop: "30px" }}>
                        <Button
                            fullWidth size="large"
                            sx={{ borderRadius: "5px", margin: "0px", height: "40px" }}
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                        >No</Button>
                        <Button
                            fullWidth size="large"
                            sx={{ borderRadius: "5px", margin: "0px", height: "40px" }}
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(seletion)}
                        >Yes</Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}

export default AllFollowUp