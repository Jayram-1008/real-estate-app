import React, { useEffect, useState } from 'react'
import { Box, Paper, FormControl, Autocomplete, Button, Modal, Typography, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import clsx from "clsx";
import dayjs from 'dayjs';
import Header from '../../components/header'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { setHiddenColumn } from '../../store/globalSlice';
import { useMycontext } from '../../components/global/MyContext';
import { CustomFooter } from './customfooter';

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
        field: 'booking_no',
        headerName: 'Booking ID',
        width: 90,
        type: "number"
    },
    {
        field: 'full_name',
        headerName: 'Customer Full Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        minWidth: 150,
        flex: 1,
        valueGetter: (params) =>
            `${params.row.customer_first_name || ''} ${params.row.customer_last_name || ''}`,
    },
    {
        field: 'paid_amount',
        headerName: 'Amount(₹)',
        minWidth: 150,
        type: "number"
    },
    {
        field: 'txn_date',
        headerName: 'TXN Date',
        minWidth: 120,
        valueGetter: (params) =>
            `${dayjs(params.row.txn_date).format('DD-MMM-YYYY')}`,
    },
    {
        field: 'com_percent',
        headerName: 'Percent',
        minWidth: 70,
        type: "number",
        valueGetter: (params) =>
            `${params.row.com_percent}%`,
    },
    {
        field: 'com_amount',
        headerName: 'Commision(₹)',
        minWidth: 120,
        type: "number"
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
        cellClassName: (params) => {
            if (params.value === null) {
                return "";
            }
            return clsx("super-app", {
                success: params.value === 'success',
                paid: params.value === 'paid',
            });
        }
    },
    {
        field: 'recieved_date',
        headerName: 'Recieved Date',
        width: 110,
        valueGetter: (params) =>
            `${params.row.recieved_date !== null ? dayjs(params.row.recieved_date).format('DD-MMM-YYYY') : "Not Recieved"}`,
    }
];

const Payment = () => {

    const dispatch = useDispatch();
    const props = useOutletContext();
    const { enqueueSnackbar } = useSnackbar();
    const { apiUrl } = useMycontext();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [page, setPage] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    const [selectionModel, setSelectionModel] = useState([]);
    const hiddenColumn = useSelector((state) => state.global.hiddenColumn);
    const [rows, setRows] = useState([]);

    const handleOpen = () => {
        if (selectionModel.length !== 1) {
            enqueueSnackbar("Please select one Associate.", { variant: "error" });
            return;
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    function downloadCSV(rows, columns) {
        const newData = rows.map((rows) => {
            // Format the date and time fields
            const formattedDate = dayjs(rows.join_date).format('DD-MMM-YYYY');
            const full_name = rows.first_name + " " + rows.last_name;
            const sponsor_name = rows.sponsor_first_name + " " + rows.sponsor_last_name;
            const status = rows.status == 1 ? "Active" : "In-Active";
            // Return a new object with the formatted fields
            return {
                ...rows,
                full_name: full_name,
                sponsor_name: sponsor_name,
                join_date: formattedDate,
                status: status
            };
        });

        const csvContent =
            'data:text/csv;charset=utf-8,' +
            columns.map((column) => column.headerName).join(',') +
            '\n' +
            newData
                .map((row) =>
                    columns.map((column) => row[column.field]).join(',')
                )
                .join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
    }

    const getBusiness = () => {
        setLoading(true);
        axios.get(apiUrl + "business/getmy?date=" + dayjs(date).format('YYYY-DD-MM'))
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

    const getBusinessData = (data) => {
        let total = {
            "total_amount": 0,
        };

        data.forEach((item) => {
            total['total_amount'] = total['total_amount'] + parseFloat(item.com_amount)
        });

        return total;
    }

    useEffect(() => {
        getBusiness();
    }, [date]);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "", md: "center" }, gap: "10px", flexDirection: { xs: "column", md: "row" } }}>
                    <Header title="Associate Business" />
                    <Box sx={{ display: "flex", gap: "10px", flexDirection: { xs: "column-reverse", md: "row" } }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{ flex: 1 }}
                                    value={date}
                                    onChange={(value) => setDate(value)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: "small",
                                        }
                                    }}
                                    label="Select Month"
                                    views={['month', 'year']}
                                />
                            </LocalizationProvider>
                            <Button sx={{ minWidth: "100px" }} size='small' variant='contained' color='success' onClick={() => { downloadCSV(rows, columns) }}>Export to Excel</Button>
                        </Box>
                    </Box>
                </Box >
                <Box sx={{
                    height: { xs: "calc(100vh - 220px)", md: "calc(100vh - 140px)" },
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
                    "& .super-app.success": {
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
                    "& .super-app.paid": {
                        "& .MuiDataGrid-cellContent": {
                            textAlign: "center",
                            minWidth: "80px",
                            border: "solid 1px skyblue",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            color: "#000",
                            fontWeight: "500",
                            backgroundColor: "#0c7a00"
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
                        onRowClick={handleOpen}
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
                        slots={{
                            footer: CustomFooter,
                        }}
                        slotProps={{
                            footer: getBusinessData(rows),
                        }}
                        onColumnVisibilityModelChange={(params) => { dispatch(setHiddenColumn(params)) }}
                        rowCount={rowCount}
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
                    maxWidth: 600,
                    minWidth: 350,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Do you want to Delete {rows[selectionModel[0] - 1]?.first_name}'s Account?
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
                            onClick={""}
                        >Yes</Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}

export default Payment