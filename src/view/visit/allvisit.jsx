import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import { Paper, Box, Avatar, Typography, FormControl, OutlinedInput, InputAdornment, Button, Modal, IconButton } from '@mui/material';
import { Search, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useMycontext } from '../../components/global/MyContext';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const AllVisit = () => {

    const { apiUrl } = useMycontext();
    const [customer, setCustomer] = useState([]);
    const [seletion, setSelection] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const goToEdit = () => {

    }

    const getAll = () => {
        axios.get(apiUrl + 'visit/getvisit?id=' + id)
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
                <Header title="All Visits" />
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
                        <Paper sx={{ padding: { xs: "10px", md: '10px' }, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: 'center', gap: "0px", width: { xs: "calc(50% - 5px)", sm: "calc(50% - 5px)", md: "330px" } }}>
                            <Typography variant='h5'>{dayjs(item.visit_at).format('DD-MMM-YYYY')}</Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', gap: "10px" }}>
                                <Avatar alt="Profile" src={apiUrl + "assets/visit-photos/" + item.visit_id + ".png"}
                                    sx={{
                                        width: { xs: "100%", md: "300px" },
                                        height: { xs: "200px", md: "300px" },
                                        marginBottom: "0px",
                                        borderRadius: "10px"
                                    }}
                                >Photo Not Found</Avatar>
                            </Box>
                            <Typography variant='h5' sx={{ textTransform: "capitalize" }}>{item.first_name + " " + item.last_name}</Typography>
                            <Typography variant='h6' sx={{ textTransform: "capitalize" }}>{item.visit_details}</Typography>
                            <Typography variant='p' sx={{ textTransform: "capitalize" }}>{item.remark}</Typography>
                        </Paper>
                    )
                })}
            </Box>
        </>
    )
}

export default AllVisit