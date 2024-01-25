import React, { useEffect, useState } from 'react';
import { Box, Paper, Button, Typography } from '@mui/material';
import CardBox from '../components/cardbox';
import Header from '../components/header';
import RecentHold from '../components/recenthold';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMycontext } from '../components/global/MyContext';
import { useSelector } from 'react-redux';

const Home = () => {

  const navigate = useNavigate();
  const { apiUrl } = useMycontext();
  const [count, setCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.global.userId);

  const getTeamCount = () => {
    setLoading(true);
    axios.get(apiUrl + 'associate/getteamcount')
      .then(function (response) {
        if (response.data.status) {
          setCount(response.data.data);
        }
        else {
          setCount([]);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getTeamCount();
  }, []);

  return (
    <>
      <Box sx={{ padding: "10px 0px" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: "15px" }}>
          <Box sx={{ width: { xs: "100%", md: "65%" } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
              <Header title="Team Data" />
              <Button variant='outlined' onClick={() => navigator.clipboard.writeText(userId.payload)}>ID: {userId.payload}</Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: "15px", margin: "15px 0px" }}>
              <CardBox title="My Team" number={count.length > 1 ? count[1]?.level_count : 0} subtitle="Level - 1" bgColor="#F3E8FB" txtColor="#ba68c8" onClick={() => navigate('/level-view')} />
              <CardBox title="My Total Team" number={count.length > 0 ? count.filter(item => parseInt(item.depth, 10) <= 5).reduce((acc, item) => acc + parseInt(item.level_count, 10), 0) - 1 : 0} subtitle="Level 1 to 5" bgColor="#EBFDED" txtColor="#5aad64" onClick={() => navigate('/view-team')} />
              <CardBox title="Total Team" number={count.length > 0 ? count.reduce((acc, item) => acc + parseInt(item.level_count, 10), 0) - 1 : 0} subtitle="All Team Member" bgColor="#FFE7E7" txtColor="#ef5350" />
            </Box>
            <Header title="Projects" />
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: "15px", margin: "15px 0px" }}>
              <CardBox title="Available Plots" number="0" subtitle="0 Booking for process" bgColor="#FFEFE7" txtColor="#FF5151" />
              <CardBox title="Available Hotels" number="0" subtitle="0 Booking for process" bgColor="#E8F0FB" txtColor="#3786F1" />
              <CardBox title="Available Flats" number="0" subtitle="0 Booking for process" bgColor="#FDEBF9" txtColor="#EE61CF" />
            </Box>
            s
          </Box>
          <Box sx={{ flex: 1 }}>
            <RecentHold />
          </Box>
        </Box>
      </Box >
    </>
  )
}

export default Home