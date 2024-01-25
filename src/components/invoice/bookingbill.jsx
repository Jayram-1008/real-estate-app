import { Box, Paper, Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LogoLarge } from '../global/sidebar/logo';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import axios from 'axios';
import { useMycontext } from '../global/MyContext';
import { useSnackbar } from 'notistack';

const Invoice = ({ data }) => {

    const { apiUrl } = useMycontext();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [subtotal, setSubTotal] = useState("");
    const [formData, setFormData] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const getBooking = () => {
        setLoading(true);
        axios.get(apiUrl + 'booking/getmy?id=' + data.booking_id)
            .then(function (response) {
                if (response.data.status) {
                    setFormData(response.data.data);
                }
                else {
                    enqueueSnackbar(response.data.message, { variant: "error" });
                    setFormData([]);
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    const getBookingTransaction = () => {
        setLoading(true);
        axios.get(apiUrl + 'transaction/getmy?id=' + data.booking_id)
            .then(function (response) {
                if (response.data.status) {
                    setTransaction(response.data.data);
                    let result = 0;
                    response.data.data.map((item) => {
                        result = result + parseFloat(item.paid_amount);
                    })
                    setSubTotal(result);
                }
                else {
                    enqueueSnackbar(response.data.message, { variant: "error" });
                    setTransaction([]);
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getBooking();
        getBookingTransaction();
    }, [])

    return (
        <>
            <Box ref={componentRef} sx={{ padding: '20px 30px', minHeight: "100vh", display: 'flex', justifyContent: 'space-between', flexDirection: 'column', }}>
                <Box>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>Customer Invoice</Typography>
                    <hr style={{ border: '1px solid black', marginTop: '10px' }}></hr>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                        <Box>
                            <LogoLarge />
                        </Box>
                        <Box>
                            <Typography variant='h4'>Invoice #00{formData?.booking_no}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 10px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='h6'>BILL TO</Typography>
                            <Typography variant='h6'>{`${formData.customer_first_name} ${formData.customer_last_name}`}</Typography>
                            <Typography variant='h6'>{`${formData.address} ${formData.city}, ${formData.state}`}</Typography>
                            <Typography variant='h6'>{`${formData.country} - ${formData.pincode}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='h6' sx={{ textAlign: 'right' }}>Date: <span>{dayjs().format('DD/MM/YYYY')}</span></Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography variant='h5' sx={{ textAlign: 'center', margin: "10px 0px" }}>Project Details</Typography>
                        </Box>
                        <TableContainer component={Box}>
                            <Table sx={{ border: "solid 1px #cfcfcf" }} aria-label="simple table" size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "600" }}>Project Name</TableCell>
                                        <TableCell sx={{ fontWeight: "600" }}>Block</TableCell>
                                        <TableCell align='right' sx={{ fontWeight: "600" }}>Plot No.</TableCell>
                                        <TableCell align='right' sx={{ fontWeight: "600" }}>Area (sqft)</TableCell>
                                        <TableCell align='right' sx={{ fontWeight: "600" }}>Dimension</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    <TableRow>
                                        <TableCell>{formData?.project_name}</TableCell>
                                        <TableCell>{formData?.block_name}</TableCell>
                                        <TableCell align='right'>{formData?.pn_no}</TableCell>
                                        <TableCell align='right'>{formData?.landarea}</TableCell>
                                        <TableCell align='right'>{formData?.dimension}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box>
                        <Box>
                            <Typography variant='h5' sx={{ textAlign: 'center', margin: "10px 0px" }}>Payment Details</Typography>
                        </Box>
                        <TableContainer component={Box}>
                            <Table sx={{ border: "solid 1px #cfcfcf" }} size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "600" }}>S.No</TableCell>
                                        <TableCell sx={{ fontWeight: "600" }}>Date</TableCell>
                                        <TableCell sx={{ fontWeight: "600" }} align='center'>Payment Mode</TableCell>
                                        <TableCell sx={{ fontWeight: "600" }} align='center'>Rate</TableCell>
                                        <TableCell sx={{ fontWeight: "600" }} align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transaction.map((item, index) => (
                                        <TableRow>
                                            <TableCell>{index + 1}.</TableCell>
                                            <TableCell>{dayjs(item?.txn_date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell align='center'>{item?.payment_mode}</TableCell>
                                            <TableCell align='center'>{formData?.rate}</TableCell>
                                            <TableCell align="right">{item?.paid_amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box sx={{ maxWidth: "100%", display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ minWidth: "50%" }}></Box>
                        <TableContainer component={Box}>
                            <Table sx={{ minWidth: "50%", border: "solid 1px #cfcfcf", borderTop: "none" }} aria- label="simple table" size='small'>
                                {/* <TableRow>
                                    <TableCell sx={{ fontWeight: "600" }}>Subtotal</TableCell>
                                    <TableCell align="right">{parseFloat(subtotal).toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "600" }}>Tax (%)</TableCell>
                                    <TableCell align="right">-</TableCell>
                                </TableRow> */}
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "600" }}>Total</TableCell>
                                    <TableCell align="right">{parseFloat(subtotal).toFixed(2)}</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "20px", marginTop: '50px' }}>
                        <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center' }}>
                            <CallIcon fontSize='small' />
                            <Typography variant='p'>
                                +91&nbsp;94949&nbsp;49844
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center' }}>
                            <LanguageIcon fontSize='small' />
                            <Typography variant='p'>
                                www.tilakramgroup.com
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center' }}>
                            <SendIcon fontSize='small' />
                            <Typography variant='p'>
                                contact@tilakramgroup.com
                            </Typography>
                        </Box>
                    </Box>
                    <hr style={{ border: '1px solid black', margin: "5px 0px" }}></hr>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant='p'>Address: 4th Floor, TilakRam Restaurent, Near - People's Mall, Bhopal</Typography>
                    </Box>
                </Box>
            </Box >
            <Box sx={{ textAlign: "center" }}>
                <Button onClick={handlePrint} startIcon={<Print />}>Print</Button>
            </Box>
        </>
    )
}



export default Invoice