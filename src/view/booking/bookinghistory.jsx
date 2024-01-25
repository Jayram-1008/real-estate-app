import React, { useState, useEffect } from 'react';
import { Paper, Box, Button, InputAdornment, OutlinedInput, Modal, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Delete, Edit, Print, Search } from '@mui/icons-material';
import dayjs from 'dayjs';
import axios from 'axios';
import Header from '../../components/header';
import { setHiddenColumn } from '../../store/globalSlice';
import { useMycontext } from '../../components/global/MyContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import clsx from "clsx";
import Invoice from '../../components/invoice/bookingbill';

const AllBooking = () => {

    const columns = [
        {
            field: 'id',
            headerName: 'S.No',
            width: 55
        },
        {
            field: 'booking_no',
            headerName: 'Booking ID',
            width: 100
        },
        {
            field: 'project_name',
            headerName: 'Project',
            minWidth: 100,
            flex: 1
        },
        {
            field: 'block_name',
            headerName: 'Block',
            width: 20,
            type: "number"
        },
        {
            field: 'pn_no',
            headerName: 'Plot No',
            width: 60,
            type: "number"
        },
        {
            field: 'customer_name',
            headerName: 'Customer Name',
            minWidth: 150,
            flex: 1,
            type: "text",
            valueGetter: (params) =>
                `${params.row.customer_first_name} ${params.row.customer_last_name}`,
        },
        {
            field: 'mobile_no',
            headerName: 'Mobile No',
            width: 120,
        },
        {
            field: 'final_amount',
            headerName: 'Total Amt(₹)',
            width: 130,
            type: "number"
        },
        {
            field: 'booking_mode',
            headerName: 'Mode',
            width: 100,
        },
        {
            field: 'booking_amount',
            headerName: 'Booking Amt(₹)',
            width: 130,
            type: "number"
        },
        {
            field: 'booking_date',
            headerName: 'Booking Date',
            width: 110,
            valueGetter: (params) =>
                `${dayjs(params.row.booking_date).format('DD-MMM-YYYY')}`,
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
                    cancelled: params.value === "Cancelled",
                    completed: params.value === "Completed",
                    active: params.value === "Active",
                });
            }
        },
        {
            field: 'booked_by',
            headerName: 'Booked By',
            minWidth: 150,
            flex: 1,
            valueGetter: (params) =>
                `${params.row.first_name || ''} ${params.row.last_name || ''}`,
        }
    ];

    const { dispatch } = useDispatch();
    const { apiUrl, setUser } = useMycontext();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const props = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [page, setPage] = useState();
    const [rowCount, setRowCount] = useState();
    const hiddenColumn = useSelector((state) => state.global.hiddenColumn);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (selectionModel.length !== 1) {
            enqueueSnackbar("Please select one Plot.", { variant: "error" });
            return;
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

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

    const getAllBooking = (text = "") => {
        setLoading(true);
        axios.get(apiUrl + 'booking/getallmy?text=' + text)
            .then(function (response) {
                if (response.data.status) {
                    setProjects(response.data.data.map((row, index) => ({ ...row, id: index + 1 })));
                }
                else {
                    enqueueSnackbar(response.data.message, { variant: "error" });
                    setProjects([]);
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    const debouncedSearch = debounce(getAllBooking, 1000);

    const goToEdit = () => {
        if (selectionModel.length !== 1) {
            enqueueSnackbar("Please select one Plot.", { variant: "error" });
            return;
        }
        setUser({ 'editid': selectionModel[0] });
    }

    useEffect(() => {
        getAllBooking();
    }, []);

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "", md: "center" }, gap: "20px", flexDirection: { xs: "column", md: "row" } }}>
                <Header title="My Bookings" />
                <Box sx={{ display: "flex", gap: "10px", flexDirection: { xs: "column-reverse", md: "row" } }}>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <Button size='small' variant='outlined' color='primary' startIcon={<Print />} onClick={handleOpen}>Print</Button>
                        {/* <Button size='small' variant='contained' color='warning' startIcon={<Edit />} onClick={goToEdit}>Edit Booking</Button> */}
                    </Box>
                    <FormControl sx={{ width: { xs: "100%", md: "30ch" } }} variant="outlined">
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
                marginTop: '10px',
                height: { xs: "calc(100vh - 225px)", md: "calc(100vh - 135px)" },
                width: { xs: "calc(100vw - 20px)", md: props.collapsed ? "calc(100vw - 105px)" : "calc(100vw - 270px)" },
                maxWidth: "calc(100vw - 20px)",
                "& .super-app.active": {
                    "& .MuiDataGrid-cellContent": {
                        textAlign: "center",
                        minWidth: "80px",
                        border: "solid 1px lightGreen",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        color: "#fff",
                        fontWeight: "500",
                        fontFamily: "Poppins",
                        backgroundColor: "green"
                    }
                },
                "& .super-app.completed": {
                    "& .MuiDataGrid-cellContent": {
                        textAlign: "center",
                        minWidth: "80px",
                        border: "solid 1px green",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        color: "#fff",
                        backgroundColor: "green"
                    }
                },
                "& .super-app.cancelled": {
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
            }}>
                <DataGrid
                    loading={loading}
                    checkboxSelection={true}
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={(selection) => {
                        if (selection.length > 1) {
                            const selectionSet = new Set(selectionModel);
                            const result = selection.filter((s) => !selectionSet.has(s));
                            setSelectionModel(result);
                        } else {
                            setSelectionModel(selection);
                        }
                    }}
                    rows={projects}
                    columns={columns}
                    onPaginationModelChange={(params) => setPage(params.page)}
                    hideFooterSelectedRowCount={true}
                    hideFooter={true}
                    pageSizeOptions={[100]}
                    initialState={{
                        columns: {
                            columnVisibilityModel: hiddenColumn.payload
                        },
                    }}
                    onColumnVisibilityModelChange={(params) => { dispatch(setHiddenColumn(params)) }}
                    rowCount={rowCount}
                    paginationMode="server"
                />
            </Box>

            <Modal
                sx={{ overflowX: "hidden" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper sx={{
                    position: 'absolute',
                    top: '0%',
                    left: '50%',
                    transform: 'translate(-50%)',
                    minWidth: 350,
                }}>

                    <Invoice data={projects[selectionModel[0] - 1]} />
                </Paper>
            </Modal>
        </Box>
    )
}

export default AllBooking