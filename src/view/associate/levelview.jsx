import React, { useEffect, useState } from 'react'
import { Box, Paper, FormControl, OutlinedInput, InputAdornment, Avatar, Modal, ToggleButton, ToggleButtonGroup, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit, Search } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import clsx from "clsx";
import dayjs from 'dayjs';
import Header from '../../components/header'
import { setHiddenColumn } from '../../store/globalSlice';
import { useMycontext } from '../../components/global/MyContext';

const columns = [
    {
        field: 'id',
        headerName: 'S.No',
        filterable: false,
        width: 30,
    },
    {
        field: 'associate_id',
        headerName: 'Associate ID',
        minWidth: 120
    },
    {
        field: 'full_name',
        headerName: 'Full Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        minWidth: 150,
        flex: 1,
        valueGetter: (params) =>
            `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    {
        field: 'mobile_no',
        headerName: 'Mobile No',
        minWidth: 120,
    },
    {
        field: 'sponsor_code',
        headerName: 'Sponsor Code',
        minWidth: 120,
    },
    {
        field: 'sponsor_name',
        headerName: 'Sponsor Name',
        minWidth: 150,
        flex: 1,
        valueGetter: (params) =>
            `${params.row.sponsor_first_name || ''} ${params.row.sponsor_last_name || ''}`,
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 120,
        cellClassName: (params) => {
            if (params.value === null) {
                return "";
            }
            return clsx("super-app", {
                gold: params.value === 'Gold',
                diamond: params.value === 'Diamond',
            });
        }
    },
    {
        field: 'branch',
        headerName: 'Branch',
        width: 100,
    },
    {
        field: 'join_date',
        headerName: 'Joining Date',
        width: 110,
        valueGetter: (params) =>
            `${dayjs(params.row.join_date).format('DD-MMM-YYYY')}`,
    },
    {
        field: 'pan_no',
        headerName: 'Pan No',
        width: 120,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 110,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 130,
        cellClassName: (params) => {
            if (params.value === null) {
                return "";
            }
            return clsx("super-app", {
                deactive: params.value === "In-Active",
                active: params.value === "Active",
            });
        },
        valueGetter: (params) =>
            params.row.status == 1 ? "Active" : "In-Active",
    }
];

const LevelView = () => {

    const dispatch = useDispatch();
    const { apiUrl } = useMycontext();
    const props = useOutletContext();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { setUser, role } = useMycontext();
    const userId = useSelector((state) => state.global.userId);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [page, setPage] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    const [associate, setAssociate] = useState({});
    const hiddenColumn = useSelector((state) => state.global.hiddenColumn);
    const [tree, setTree] = useState([]);
    const [rows, setRows] = useState([]);
    const [level, setLevel] = useState("1");

    const handleChange = (event, newLevel) => {
        if (newLevel !== null) {
            setLevel(newLevel);
            setRows(filterObjectsByDepth(tree, newLevel).map((row, index) => ({ ...row, id: index + 1 })));
        }
    };

    function filterObjectsByDepth(array, depth) {
        return array.filter(item => item.depth === depth);
    }

    function debounce(fn, delay) {
        var timer = null;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    const searchItems = async (searchtext) => {
        setLoading(true);
        axios.get('realstateapi/associate/search?text=' + searchtext)
            .then(function (response) {
                if (response.data.status) {
                    setRows(response.data.data.map((row, index) => ({ ...row, id: index + 1 })));
                }
                else {
                    setRows([]);
                    enqueueSnackbar(response.data.message, { variant: "error" });
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }
    const debouncedSearch = debounce(searchItems, 1000);

    const getTeam = () => {
        setLoading(true);
        axios.get(apiUrl + 'associate/getteam?id=' + userId.payload)
            .then(function (response) {
                if (response.data.status) {
                    setTree(response.data.data);
                    setRows(filterObjectsByDepth(response.data.data, level).map((row, index) => ({ ...row, id: index + 1 })));
                }
                else {
                    setRows([]);
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    const getTeamDetails = (id) => {
        setLoading(true);
        axios.get(apiUrl + 'associate/getteamdetails?id=' + id)
            .then(function (response) {
                if (response.data.status) {
                    setAssociate(response.data.data);
                    handleOpen();
                }
                else {
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
        getTeam();
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "", md: "center" }, gap: "10px", flexDirection: { xs: "column", md: "row" } }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
                        <Header title={"Level " + level} />
                        <Button size='small' variant='outlined'>Total - {rows.length}</Button>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px", flexDirection: { xs: "column-reverse", md: "row" } }}>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                            <ToggleButtonGroup
                                sx={{ width: "100%" }}
                                size='small'
                                color="primary"
                                value={level}
                                exclusive
                                onChange={handleChange}
                                aria-label="Platform"
                            >
                                <ToggleButton sx={{ padding: "5px 10px", width: "100%" }} value="1">Level 1</ToggleButton>
                                <ToggleButton sx={{ padding: "5px 10px", width: "100%" }} value="2">Level 2</ToggleButton>
                                <ToggleButton sx={{ padding: "5px 10px", width: "100%" }} value="3">Level 3</ToggleButton>
                                <ToggleButton sx={{ padding: "5px 10px", width: "100%" }} value="4">Level 4</ToggleButton>
                                <ToggleButton sx={{ padding: "5px 10px", width: "100%" }} value="5">Level 5</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <FormControl sx={{ width: { xs: "100%", md: "40ch" } }} variant="outlined">
                            <OutlinedInput
                                sx={{ height: "35px" }}
                                placeholder="Search..."
                                onChange={(e) => debouncedSearch(e.target.value)}
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
                </Box >
                <Box sx={{
                    height: { xs: "calc(100vh - 225px)", md: "calc(100vh - 135px)" },
                    width: { xs: "calc(100vw - 20px)", md: props.collapsed ? "calc(100vw - 105px)" : "calc(100vw - 270px)" },
                    marginTop: "10px",
                    "& .super-app.active": {
                        "& .MuiDataGrid-cellContent": {
                            textAlign: "center",
                            minWidth: "80px",
                            border: "solid 1px green",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            color: "#fff",
                            fontWeight: "500",
                            fontFamily: "Poppins",
                            backgroundColor: "green"
                        }
                    },
                    "& .super-app.deactive": {
                        "& .MuiDataGrid-cellContent": {
                            textAlign: "center",
                            minWidth: "80px",
                            border: "solid 1px orange",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            color: "#fff",
                            backgroundColor: "red"
                        }
                    },
                    "& .super-app.gold": {
                        "& .MuiDataGrid-cellContent": {
                            textAlign: "center",
                            minWidth: "80px",
                            border: "solid 1px orange",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            color: "#000",
                            fontFamily: "Poppins",
                            backgroundColor: "#ffb319"
                        }
                    },
                    "& .super-app.diamond": {
                        "& .MuiDataGrid-cellContent": {
                            textAlign: "center",
                            minWidth: "80px",
                            border: "solid 1px skyblue",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            color: "#000",
                            fontWeight: "500",
                            backgroundColor: "#9cf8ff"
                        }
                    },
                }}>
                    <DataGrid
                        loading={loading}
                        rows={rows}
                        columns={columns}
                        onPaginationModelChange={(params) => setPage(params.page)}
                        hideFooterSelectedRowCount={true}
                        pageSizeOptions={[100]}
                        initialState={{
                            columns: {
                                columnVisibilityModel: hiddenColumn.payload
                            },
                        }}
                        onRowClick={(e) => getTeamDetails(e.row.associate_id)}
                        onColumnVisibilityModelChange={(params) => { dispatch(setHiddenColumn(params)) }}
                        rowCount={rowCount}
                        hideFooter
                        paginationMode="server"
                    />
                </Box>
            </Box>

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
                    maxWidth: 800,
                    minWidth: 380,
                    padding: "5px 0px",
                }}>
                    <Box sx={{ padding: "10px 0px", textAlign: "center" }}>
                        <Header title="Associate Details" />
                    </Box>
                    <hr></hr>
                    {associate !== null && <Box sx={{ padding: "10px 15px", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                        <Avatar alt="Profile" src={apiUrl + "assets/associate-photos/" + associate.associate_id + ".png"}
                            sx={{
                                width: "150px",
                                height: "180px",
                                marginBottom: "0px",
                                borderRadius: "10px"
                            }}
                        >Profile Photo</Avatar>
                        <Box sx={{ display: "flex", gap: "20px" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: '20px' }}>
                                <Typography variant='h5' sx={{ textAlign: "right" }}>Assocaite ID : </Typography>
                                <Typography variant='h5' sx={{ textAlign: "right" }}>Name : </Typography>
                                <Typography variant='h5' sx={{ textAlign: "right" }}>Mobile No : </Typography>
                                <Typography variant='h5' sx={{ textAlign: "right" }}>Joining Date : </Typography>
                                <Typography variant='h5' sx={{ textAlign: "right" }}>Branch : </Typography>
                                <Typography variant='h5' sx={{ textAlign: "right" }}>City : </Typography>
                                <Typography variant='h5' sx={{ textAlign: "right" }}>State : </Typography>
                                <Typography variant='h5' sx={{ textAlign: "right" }}>Country : </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: '20px' }}>
                                <Typography variant='h5'>{`${associate.associate_id}`}</Typography>
                                <Typography variant='h5'>{`${associate.first_name} ${associate.last_name}`}</Typography>
                                <Typography variant='h5'>{`${associate.mobile_no}`}</Typography>
                                <Typography variant='h5'>{`${dayjs(associate.join_date).format('DD-MMM-YYYY')}`}</Typography>
                                <Typography variant='h5'>{`${associate.branch}`}</Typography>
                                <Typography variant='h5'>{`${associate.city}`}</Typography>
                                <Typography variant='h5'>{`${associate.state}`}</Typography>
                                <Typography variant='h5'>{`${associate.country}`}</Typography>
                            </Box>
                        </Box>

                    </Box>}
                    <Box sx={{ padding: "10px 0px", textAlign: "center" }}>
                        <Button onClick={handleClose} variant='outlined' color='error'>Close</Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}

export default LevelView