import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import { Paper, Box, Avatar, Typography, FormControl, OutlinedInput, InputAdornment, Button, Modal, IconButton } from '@mui/material';
import { Search, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useMycontext } from '../../components/global/MyContext';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const VisitReport = () => {

    const navigate = useNavigate();
    const { apiUrl } = useMycontext();
    const [customer, setCustomer] = useState([]);
    const [seletion, setSelection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => { setSelection(id); setOpen(true) };
    const handleClose = (id) => { setSelection(null); setOpen(false) };
    const { enqueueSnackbar } = useSnackbar();

    const goToEdit = (id) => {
        navigate('/edit-customer/' + id);
    }

    const handelDelete = (id) => {
        handleClose();
        setLoading(true);
        axios.delete(apiUrl + 'customer/delete?id=' + id)
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
        getAll();
    }, [])

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: "10px", alignItems: "center" }}>
                <Header title="My Customers" />
                <FormControl sx={{ width: { xs: "100%", md: "40ch" } }} variant="outlined">
                    <OutlinedInput
                        sx={{ height: "35px" }}
                        placeholder="Search..."
                        onChange={(e) => ""}
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
                {customer.map((item) => {
                    return (
                        <Paper sx={{ padding: '10px', display: "flex", justifyContent: "space-between", alignItems: 'center', gap: "0px", width: { xs: "100%", sm: "100%", md: "calc(50% - 5px)" } }} onClick={() => { navigate('/all-visit/' + item.customer_id) }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', gap: "10px" }}>
                                <Avatar alt="Profile" src={apiUrl + "assets/customer-photos/" + item.customer_id + ".png"}
                                    sx={{
                                        width: { xs: "130px", md: "150px" },
                                        height: { xs: "130px", md: "150px" },
                                        marginBottom: "0px",
                                        borderRadius: "10px"
                                    }}
                                >Upload Photo</Avatar>
                                <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <Box sx={{ display: { xs: "none", sm: "none", md: "flex" }, flexDirection: "column", gap: "5px" }}>
                                        <Typography variant='h6'>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- </Typography>
                                        <Typography variant='h6'>Gender &nbsp;&nbsp;&nbsp;-</Typography>
                                        <Typography variant='h6'>Mobile &nbsp;&nbsp;&nbsp;&nbsp;-</Typography>
                                        <Typography variant='h6'>Add Date-</Typography>
                                        <Typography variant='h6'>Address &nbsp;-</Typography>
                                        <Typography variant='h6'>Remark &nbsp;&nbsp;-</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                        <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.first_name + " " + item.last_name}</Typography>
                                        <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.gender}</Typography>
                                        <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.mobile_no}</Typography>
                                        <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{dayjs(item.created_at).format('DD-MMM-YYYY')}</Typography>
                                        <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{`${item.address} ${item.city}`}</Typography>
                                        <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.remark + "."}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" }, flexDirection: "column", gap: "20px" }}>
                                <Button sx={{ flex: .9 }} size='small' variant='contained' color='warning' startIcon={<Edit />} onClick={(event) => { goToEdit(item.customer_id); event.stopPropagation() }}>Edit</Button>
                                <Button sx={{ flex: 1.2 }} size='small' variant='contained' color='error' startIcon={<Delete />} onClick={(event) => { handleOpen(item.customer_id); event.stopPropagation() }}>Delete</Button>
                            </Box>
                            <Box sx={{ display: { xs: "flex", lg: "none" }, flexDirection: "column", gap: "5px" }}>
                                <IconButton sx={{ flex: .9, padding: "5px" }} color='warning' onClick={(event) => { goToEdit(item.customer_id); event.stopPropagation() }}><Edit /></IconButton>
                                <IconButton sx={{ flex: 1.2, padding: "5px" }} color='error' onClick={(event) => { handleOpen(item.customer_id); event.stopPropagation() }}><Delete /></IconButton>
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
                            onClick={() => handelDelete(seletion)}
                        >Yes</Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}

export default VisitReport