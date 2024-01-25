import React from 'react'
import { Box, Container, Typography } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMycontext } from '../components/global/MyContext';
import ExplorePlaces from '../components/exploreplaces';
import Features from '../components/features';
import Navbar from '../components/global/sidebar/navbar';
import Header from '../components/header';
import ExploreCard from '../components/explorecard';

const Landing = () => {

    const { apiUrl } = useMycontext();

    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="xl" sx={{ padding: { xs: "10px 10px 60px 10px", md: "10px" } }}>
                <Box>
                    <Slider {...settings}>
                        <Box>
                            <img src={apiUrl + "assets/carousel/" + "img1" + ".png"} alt="first" width="100%" height="auto" style={{ objectFit: "cover", borderRadius: "10px" }} />
                        </Box>
                        <Box>
                            <img src={apiUrl + "assets/carousel/" + "img1" + ".png"} alt="first" width="100%" height="auto" style={{ objectFit: "cover", borderRadius: "10px" }} />
                        </Box>
                    </Slider>
                </Box>
                <Box sx={{ padding: "10px 0px", display: "flex", gap: "20px", overflowY: "hidden" }}>
                    <ExplorePlaces />
                    <ExplorePlaces />
                    <ExplorePlaces />
                    <ExplorePlaces />
                </Box>
                <Box sx={{ padding: "10px 0px" }}>
                    <Typography variant="h2">Some Highlights</Typography>
                </Box>
                <Box sx={{ padding: "10px 0px", display: "flex", flexWrap: "wrap", gap: "20px", overflowY: "hidden" }}>
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                </Box>
                <Box sx={{ padding: "10px 0px" }}>
                    <Box sx={{ padding: "10px 0px" }}>
                        <Typography variant="h2">Featured List</Typography>
                    </Box>
                    <Box sx={{ padding: "10px 0px", display: "flex", gap: "20px", overflowY: "hidden" }}>
                        <Features />
                        <Features />
                        <Features />
                        <Features />
                        <Features />
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Landing