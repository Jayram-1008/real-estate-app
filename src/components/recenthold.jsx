import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

let RecentHold = () => {
  return (
    <Paper sx={{ backgroundColor: "#161E54", color: "#fafafa", width: "100%", height: "100%", borderRadius: "8px" }}>
      <Box sx={{ padding: "10px 15px", backgroundColor: "#1B204A", borderTopRightRadius: "8px", borderTopLeftRadius: "8px" }}>
        <Typography variant="h3">Recenty Hold Item</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px", height: { xs: "500px", md: "calc(100vh - 220px)" }, padding: "15px 5px 10px 15px", overflowX: "hidden" }}>

        <Paper sx={{ border: "1px solid #fff", backgroundColor: "#292F59", borderRadius: "5px", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", marginRight: "10px" }}>
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", padding: "5px" }}>
            <Typography variant="caption">5 minute ago</Typography>
            <Typography variant="h4">Project- 32 - Plot -12</Typography>
            <Typography variant='p'>Hold By -  Ankit</Typography>
          </Box>
          <Button sx={{ flex: 1 }} variant="contained" color="primary" size="small">View Details</Button>
        </Paper>

        <Paper sx={{ border: "1px solid #fff", backgroundColor: "#292F59", borderRadius: "5px", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", marginRight: "10px" }}>
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", padding: "5px" }}>
            <Typography variant="caption">5 minute ago</Typography>
            <Typography variant="h4">Project- 32 - Plot -12</Typography>
            <Typography variant='p'>Hold By -  Ankit</Typography>
          </Box>
          <Button sx={{ flex: 1 }} variant="contained" color="primary" size="small">View Details</Button>
        </Paper>

        <Paper sx={{ border: "1px solid #fff", backgroundColor: "#292F59", borderRadius: "5px", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", marginRight: "10px" }}>
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", padding: "5px" }}>
            <Typography variant="caption">5 minute ago</Typography>
            <Typography variant="h4">Project- 32 - Plot -12</Typography>
            <Typography variant='p'>Hold By -  Ankit</Typography>
          </Box>
          <Button sx={{ flex: 1 }} variant="contained" color="primary" size="small">View Details</Button>
        </Paper>

        <Paper sx={{ border: "1px solid #fff", backgroundColor: "#292F59", borderRadius: "5px", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", marginRight: "10px" }}>
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", padding: "5px" }}>
            <Typography variant="caption">5 minute ago</Typography>
            <Typography variant="h4">Project- 32 - Plot -12</Typography>
            <Typography variant='p'>Hold By -  Ankit</Typography>
          </Box>
          <Button sx={{ flex: 1 }} variant="contained" color="primary" size="small">View Details</Button>
        </Paper>


      </Box>
      <Box>

      </Box>
      <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center", padding: "15px 15px", backgroundColor: "#161E54", borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px" }}>
        <Typography variant="h5">Today Associate's hold 12 items.</Typography>
        <Button variant="contained" size="small">See All Holding</Button>
      </Box>
    </Paper>
  );
};
export default RecentHold;
