import React, { useEffect, useState } from 'react'
import { Box, Paper, FormControl, OutlinedInput, InputAdornment, Avatar, Typography, SvgIcon, Collapse } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { alpha, styled } from '@mui/material/styles';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { Delete, Edit, Search } from '@mui/icons-material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Header from '../../components/header'
import dayjs from 'dayjs';
import { useMycontext } from '../../components/global/MyContext';

function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon
            className="close"
            fontSize="inherit"
            style={{ width: 14, height: 14 }}
            {...props}
        >
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

function TransitionComponent(props) {
    const style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

const CustomTreeItem = React.forwardRef((props, ref) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
));

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

const ViewTeam = () => {

    const [team, setTeam] = useState({ associate_id: "91MPBPL0000" });
    const { apiUrl } = useMycontext();
    const { enqueueSnackbar } = useSnackbar();
    const userId = useSelector((state) => state.global.userId);
    const navigate = useNavigate();
    const [associate, setAssociate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
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

    const searchItems = async (searchtext) => {
        setLoading(true);
        axios.get(apiUrl + 'associate/search?text=' + searchtext)
            .then(function (response) {
                if (response.data.status) {
                    setAssociate(response.data.data);
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
    const debouncedSearch = debounce(searchItems, 1000);

    const renderTree = (nodes) => (

        <StyledTreeItem key={nodes.associate_id} nodeId={nodes.associate_id} label={nodes.first_name + " " + nodes.last_name} sx={{ padding: "5px" }} onClick={() => getTeamDetails(nodes.associate_id)}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </StyledTreeItem>

    );

    const getAllTeam = () => {
        axios.get(apiUrl + 'associate/getallteam?id=' + userId.payload)
            .then(function (response) {
                if (response.data.status) {
                    setTeam(buildTree(response.data.data, response.data.data[0].sponsor_code)[0]);
                }
                else {
                    setTeam([]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function buildTree(data, sponsorCode) {
        const tree = [];
        data.forEach((item) => {
            if (item.sponsor_code === sponsorCode) {
                const childNode = buildTree(data, item.associate_id);
                if (childNode.length > 0) {
                    item.children = childNode;
                } else {
                    item.children = [];
                }
                tree.push(item);
            }
        });
        return tree;
    }

    const getTeamDetails = (id) => {
        setLoading(true);
        axios.get(apiUrl + 'associate/getteamdetails?id=' + id)
            .then(function (response) {
                if (response.data.status) {
                    setAssociate(response.data.data);
                    //console.log(response.data.data);
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
        getAllTeam();
        getTeamDetails(userId.payload);
    }, []);

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "", md: "center" }, gap: "20px", flexDirection: { xs: "column", md: "row" } }}>
                <Header title="View Team" />
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
            </Box >
            <Box sx={{ display: "flex", gap: "10px", marginTop: "10px", flexDirection: { xs: "column", md: "row" } }}>
                <Paper sx={{ padding: "5px 10px", flex: 1, height: "calc(100vh - 135px)", overflowX: "hidden" }}>
                    <TreeView
                        aria-label="customized"
                        defaultExpanded={[userId.payload]}
                        defaultCollapseIcon={<MinusSquare />}
                        defaultExpandIcon={<PlusSquare />}
                        defaultEndIcon={<CloseSquare />}
                        sx={{ overflowX: 'hidden' }}
                    >
                        {renderTree(team)}
                    </TreeView>
                </Paper>
                <Paper sx={{ flex: 1 }}>
                    <Box sx={{ padding: "5px 10px" }}>
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
                </Paper>
            </Box>
        </Box >
    );
}

export default ViewTeam