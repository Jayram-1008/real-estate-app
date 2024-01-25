import React, { useEffect, useState, useRef } from 'react'
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setHiddenColumn } from '../../store/globalSlice';
import { useOutletContext } from 'react-router-dom';
import { useMycontext } from '../../components/global/MyContext';
import Header from '../../components/header';

const columns = [
    {
        field: 'sno',
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
        field: 'associate_name',
        headerName: 'Associate Name',
        minWidth: 150,
        valueGetter: (params) =>
            `${params.row.first_name} ${params.row.last_name}`,
    },
    {
        field: 'date',
        headerName: 'Attendence Date',
        width: 150,
        valueGetter: (params) =>
            `${dayjs(params.row.date).format('DD-MMM-YYYY')}`,
    },
    {
        field: 'created_at',
        headerName: 'Attendence Time',
        width: 220,
        valueGetter: (params) =>
            `${dayjs(params.row.created_at).format('DD-MMM-YYYY hh:mm:ss A')}`,
    }
];

const initialValue = dayjs();

function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
        !props.outsideCurrentMonth &&
        highlightedDays.indexOf(props.day.date()) >= 0;

    return (
        <Paper sx={{ background: isSelected ? "green" : "" }}>
            <PickersDay
                sx={{ color: isSelected ? "#fff" : "" }}
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
            />
        </Paper >
    );
}

const DateCalendarServerRequest = () => {

    const props = useOutletContext();
    const { apiUrl } = useMycontext();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const requestAbortController = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([]);
    const hiddenColumn = useSelector((state) => state.global.hiddenColumn);
    const associate_id = useSelector((state) => state.global.userId);

    const fetchHighlightedDays = (date) => {
        if (associate_id == undefined) {
            return;
        }
        const controller = new AbortController();
        axios.get(apiUrl + "attendence/get?id=" + associate_id.payload + "&month=" + dayjs(date).format('M') + "&year=" + dayjs(date).format('YYYY'))
            .then(function (response) {
                if (response.data.status) {
                    setHighlightedDays(response.data.data.map((row) => (parseInt(row.date.split('-')[2]))));
                }
                else {
                    setHighlightedDays([]);
                }
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });

        requestAbortController.current = controller;
    };

    const getAll = () => {
        setLoading(true);
        axios.get(apiUrl + "attendence/getall?id=" + associate_id.payload)
            .then(function (response) {
                if (response.data.status) {
                    setRows(response.data.data.map((row, index) => ({ ...row, sno: index + 1 })));
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

    useEffect(() => {
        getAll();
    }, [])

    useEffect(() => {
        fetchHighlightedDays(initialValue);
        return () => requestAbortController.current?.abort();
    }, []);

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            requestAbortController.current.abort();
        }
        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };

    return (
        <Box sx={{ display: "flex", gap: "10px", flexDirection: { xs: "column-reverse", md: "row" }, height: "100%" }}>
            <Box>
                <Box sx={{ paddingBottom: "15px", paddingTop: "5px" }}>
                    <Header title="View Attendance" />
                </Box>
                <Paper sx={{
                    height: "calc(100vh - 135px)",
                    maxWidth: "100%",
                    width: { xs: "calc(100vw - 30px)", md: props.collapsed ? "calc(100vw - 435px)" : "calc(100vw - 600px)" },
                }}>
                    <DataGrid
                        loading={loading}
                        rows={rows}
                        columns={columns}
                        //onPaginationModelChange={(params) => setPage(params.page)}
                        hideFooterSelectedRowCount={true}
                        pageSizeOptions={[100]}
                        initialState={{
                            columns: {
                                columnVisibilityModel: hiddenColumn.payload
                            },
                        }}
                        //onRowClick={(e) => getTeamDetails(e.row.associate_id)}
                        onColumnVisibilityModelChange={(params) => { dispatch(setHiddenColumn(params)) }}
                        //rowCount={rowCount}
                        hideFooter
                        paginationMode="server"
                    />
                </Paper >
            </Box>
            <Paper sx={{ flex: 1, textAlign: "center", paddingTop: "10px", width: "100%", height: "100%" }}>
                <Typography variant='h3'>This Month <br></br>Total Attendence : <IconButton color='primary'><b>{highlightedDays.length}</b></IconButton></Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        defaultValue={initialValue}
                        loading={isLoading}
                        onMonthChange={handleMonthChange}
                        renderLoading={() => <DayCalendarSkeleton />}
                        slots={{
                            day: ServerDay
                        }}
                        slotProps={{
                            day: {
                                highlightedDays
                            }
                        }}
                    />
                </LocalizationProvider>
            </Paper>
        </Box>
    );
}

export default DateCalendarServerRequest