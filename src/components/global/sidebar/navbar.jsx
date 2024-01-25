import React, { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Paper, IconButton, OutlinedInput, InputAdornment, Typography, FormControl, Container, Button, Divider, Alert } from '@mui/material';
import Badge from '@mui/material/Badge';
import Notifications from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { Search } from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LogoLarge } from "./logo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setName, setUserId } from "../../../store/globalSlice";
import { useMycontext } from "../MyContext";
import dayjs from "dayjs";


const Navbar = ({ toggleCollapse, showDrawer, setRole }) => {

    const [searchText, setSearchText] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNEl, setAnchorNEl] = useState(null);
    const { apiUrl, role } = useMycontext();
    const [followUp, setFollowUp] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector((state) => state.global.name);
    const userId = useSelector((state) => state.global.userId);
    const open = Boolean(anchorEl);
    const nopen = Boolean(anchorNEl);
    const handleClick = (event) => {
        if (role == null) {
            navigate('/login');
        }
        else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleNClick = (event) => {
        setAnchorNEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNClose = () => {
        setAnchorNEl(null);
    };

    const getAll = () => {
        axios.get(apiUrl + 'followup/notification')
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
            });
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleLogout = () => {
        axios.post(apiUrl + 'auth/logout')
            .then(function (response) {
                if (response.data.status) {
                    setRole(response.data.data.role);
                    setRole(null);
                    dispatch(setName(null));
                    dispatch(setUserId(null));
                    navigate('/login');
                }
                else {
                    setRole(null);
                    dispatch(setName(null));
                    dispatch(setUserId(null));
                }
            })
            .catch(function (error) {
                setRole(null);
                dispatch(setName(null));
                dispatch(setUserId(null));
            });
        handleClose();
    }

    const searchSuggest = (event) => {
    }



    return (
        <>
            <Paper elevation={0} sx={{ borderRadius: "0px", borderBottom: "solid 1px #b8b7b6", width: '100%' }}>
                <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: "10px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0px" }}>
                        {role !== null && <IconButton
                            sx={{ padding: "10px" }}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleCollapse || showDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        }
                        <Box sx={{ display: role !== null ? { xs: "block", md: "none" } : "block" }}>
                            <LogoLarge />
                        </Box>
                    </Box>
                    <FormControl variant="outlined" sx={{ flex: 1, alignItems: "center", maxWidth: "40%", display: { xs: "none", md: "block" } }}>
                        <OutlinedInput
                            sx={{ height: "40px", width: "100%" }}
                            placeholder="Search..."
                            value={searchText}
                            onChange={searchSuggest}
                            id="outlined-adornment-search"
                            startAdornment={
                                <InputAdornment position="start">

                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                    <Search />
                                </InputAdornment>
                            }
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight"
                            }}
                        />
                    </FormControl>
                    {role !== null && <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '15px', md: '25px' } }}>
                        <IconButton
                            onClick={handleNClick}
                            label={`show 1 new notifications`}
                            color="primary"
                        >
                            <Badge badgeContent={followUp.length} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <Typography variant="h5" sx={{ display: { xs: "none", md: "block" }, textTransform: "capitalize" }}>{"Hi ! " + name.payload}</Typography>
                        <IconButton sx={{ padding: "0px" }} onClick={handleClick}>
                            <Avatar src={apiUrl + "assets/associate-photos/" + userId.payload + ".png"}>{name.payload}</Avatar>
                        </IconButton>
                    </Box>}
                    {role == null && <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>}
                </Container>
            </Paper>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorNEl}
                open={nopen}
                onClose={handleNClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "80vh", maxWidth: "400px", minWidth: "300px", overflowX: "hidden", padding: "0px 10px" }}>
                    {followUp.length > 0 && followUp.map((item, index) => {
                        return (
                            <Box sx={{ display: "flex" }}>
                                <Alert severity="info" sx={{ alignItems: "center" }}>
                                    {`Reminder for our scheduled follow-up with ${item.full_name}, today at ${dayjs(item.date_time).format('hh:mm A')}.`}
                                </Alert>
                            </Box>
                        )
                    })}
                    {followUp.length == 0 &&
                        <Alert>
                            No Notification Found
                        </Alert>
                    }
                </Box>
            </Menu>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => { navigate('/profile'); handleClose() }}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default Navbar