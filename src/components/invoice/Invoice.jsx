import { Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';

const Invoice = ({ formData }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', }}>
                <Box sx={{ textAlign: "center" }}>
                    <Button onClick={handlePrint} startIcon={<Print />}>Print</Button>
                </Box>
                <Box ref={componentRef} sx={{ padding: "25px" }}>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>Customer Invoice</Typography>
                    <hr style={{ border: '1px solid black', marginTop: '10px' }}></hr>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 10px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='h6'>BILL TO</Typography>
                            <Typography variant='h6'>{`${formData.customer.customer_first_name} ${formData.customer.customer_last_name}`}</Typography>
                            <Typography variant='h6'>{`${formData.customer.address} ${formData.customer.city}, ${formData.customer.state}`}</Typography>
                            <Typography variant='h6'>{`${formData.customer.country} - ${formData.customer.pincode}`}</Typography>
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
                            <Table sx={{ border: "solid 1px #cfcfcf" }} aria-label="simple table">
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
                                        <TableCell>{formData.plot.project_name}</TableCell>
                                        <TableCell>{formData.plot.block_name}</TableCell>
                                        <TableCell align='right'>{formData.plot.pn_no}</TableCell>
                                        <TableCell align='right'>{parseFloat(formData.plot.landarea).toFixed(2)}</TableCell>
                                        <TableCell align='right'>{formData.plot.dimension}</TableCell>
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
                            <Table sx={{ border: "solid 1px #cfcfcf" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "600" }}>S.No</TableCell>
                                        <TableCell sx={{ fontWeight: "600" }}>Mode</TableCell>
                                        <TableCell sx={{ fontWeight: "600" }} align='center'>Payment Mode</TableCell>
                                        <TableCell sx={{ fontWeight: "600" }} align='center'>Rate</TableCell>
                                        <TableCell sx={{ fontWeight: "600" }} align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>01.</TableCell>
                                        <TableCell>{formData.payment.booking_mode}</TableCell>
                                        <TableCell align='center'>{formData.payment.payment_mode}</TableCell>
                                        <TableCell align='center'>{parseFloat(formData.payment.rate).toFixed(2)}</TableCell>
                                        <TableCell align="right">{parseFloat(formData.payment.total_amount).toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box sx={{ maxWidth: "100%", display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ minWidth: "50%" }}></Box>
                        <TableContainer component={Box}>
                            <Table sx={{ minWidth: "50%", border: "solid 1px #cfcfcf", borderTop: "none" }} aria- label="simple table">
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "600" }}>Subtotal</TableCell>
                                    <TableCell align="right">{parseFloat(formData.payment.total_amount).toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "600" }}>Discount</TableCell>
                                    <TableCell align="right">{parseFloat(formData.payment.discount_amount).toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "600" }}>Total</TableCell>
                                    <TableCell align="right">{parseFloat(formData.payment.final_amount).toFixed(2)}</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box >
        </>
    )
}



export default Invoice