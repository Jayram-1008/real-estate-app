import React, { useRef, useState, useEffect } from 'react'
import numberToWords from 'number-to-words';
import { Box, Paper, Typography, Button } from '@mui/material'
import dayjs from 'dayjs';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import SendIcon from '@mui/icons-material/Send';
import Logo from "../../assets/images/logo.png"
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import axios from 'axios';
import { useMycontext } from '../global/MyContext';
import { useSnackbar } from 'notistack';
import Barcode from 'react-barcode';

const DualInvoice = ({ data }) => {
    const { apiUrl } = useMycontext();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState([]);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    console.log(data);

    const getBooking = () => {
        setLoading(true);
        axios.get(apiUrl + 'booking/get?id=' + data.booking_id)
            .then(function (response) {
                if (response.data.status) {
                    setBooking(response.data.data);
                }
                else {
                    enqueueSnackbar(response.data.message, { variant: "error" });
                    setBooking({});
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
    }, [])

    return (
        <>
            <Paper>
                <Box sx={{ textAlign: "center" }}>
                    <Button startIcon={<Print />} onClick={handlePrint}>Print</Button>
                </Box>
                <Box sx={{ padding: "20px", position: "relative", overflow: "hidden" }} ref={componentRef}>
                    <Box sx={{ border: "solid 1px #000", padding: "10px 20px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <img src={Logo} width="70px" />
                                    <Typography variant='h4'>Castle Heights</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography>Customer Copy</Typography>
                                    <Typography>Reciept</Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Barcode
                                        height={40}
                                        width={1.5}
                                        fontSize={12}
                                        value={data.id} />
                                    <Typography>Date : {dayjs(data.txn_date).format('DD/MM/YYYY')}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>Recieved with thanks from</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography>{booking.customer_first_name + " " + booking.customer_last_name}</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>an amount of Rupees (In Word)</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{numberToWords.toWords(parseInt(data.paid_amount))} Only</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>as Booking amount in Part/Full as per Booking from Nos.</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{data.remark} Amount</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>Plot/Unit No :</Typography>
                                <Box sx={{ flex: .3 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{booking.pn_no}</Typography>
                                    <hr></hr>
                                </Box>
                                <Typography>Project Name :</Typography>
                                <Box sx={{ flex: 1.2 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{booking.project_name}</Typography>
                                    <hr></hr>
                                </Box>
                                <Typography>Tehsil :</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{booking.tehsil}</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>District :</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{booking.district}</Typography>
                                    <hr></hr>
                                </Box>
                                <Typography>Payment Mode :</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{data.payment_mode}</Typography>
                                    <hr></hr>
                                </Box>

                                <Typography>Date :</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography>{dayjs(data.txn_date).format('DD/MM/YYYY')}</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>Rupees :</Typography>
                                <Box sx={{ flex: .3 }}>
                                    <Typography sx={{ lineHeight: "20px" }}>₹ {data.paid_amount}/-</Typography>
                                    <Typography sx={{ fontSize: "10px" }}>(Sub. to realization of Cheque)</Typography>
                                    <hr></hr>
                                </Box>

                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                <Box sx={{ flex: .3, textAlign: "center" }}>
                                    <Typography>Authorised Signature</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "20px", marginTop: '10px' }}>
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
                    </Box>

                    <Box sx={{ border: "solid 1px #000", padding: "10px 20px", marginTop: "30px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <img src={Logo} width="70px" />
                                    <Typography variant='h4'>Castle Heights</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography>Office Copy</Typography>
                                    <Typography>Reciept</Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Barcode
                                        height={40}
                                        width={1.5}
                                        fontSize={12}
                                        value={data.id} />
                                    <Typography>Date : {dayjs(data.txn_date).format('DD/MM/YYYY')}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>Recieved with thanks from</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography>{booking.customer_first_name + " " + booking.customer_last_name}</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>an amount of Rupees (In Word)</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{numberToWords.toWords(parseInt(data.paid_amount))} Only</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>as Booking amount in Part/Full as per Booking from Nos.</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{data.remark} Amount</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>Plot/Unit No :</Typography>
                                <Box sx={{ flex: .3 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{booking.pn_no}</Typography>
                                    <hr></hr>
                                </Box>
                                <Typography>Project Name :</Typography>
                                <Box sx={{ flex: 1.2 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{booking.project_name}</Typography>
                                    <hr></hr>
                                </Box>
                                <Typography>Tehsil :</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{booking.tehsil}</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>District :</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{booking.district}</Typography>
                                    <hr></hr>
                                </Box>
                                <Typography>Payment Mode :</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ textTransform: "capitalize" }}>{data.payment_mode}</Typography>
                                    <hr></hr>
                                </Box>

                                <Typography>Date :</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography>{dayjs(data.txn_date).format('DD/MM/YYYY')}</Typography>
                                    <hr></hr>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Typography>Rupees :</Typography>
                                <Box sx={{ flex: .3 }}>
                                    <Typography sx={{ lineHeight: "20px" }}>₹ {data.paid_amount}/-</Typography>
                                    <Typography sx={{ fontSize: "10px" }}>(Sub. to realization of Cheque)</Typography>
                                    <hr></hr>
                                </Box>

                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                <Box sx={{ flex: .3, textAlign: "center" }}>
                                    <Typography>Authorised Signature</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "20px", marginTop: '10px' }}>
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
                    </Box>
                </Box>
            </Paper>
        </>
    )
}

export default DualInvoice