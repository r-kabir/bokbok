import { Box, Container, Grid, IconButton, Stack} from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';
import tapos from '../assets/tapos.png';

const RootLayout = () => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <Box sx={{maxWidth:"95vw", minHeight:"100vh", m:"auto", boxShadow:"4"}}>
      <Box sx={{ height:"10vh", boxShadow:"2", display:'flex',justifyContent:'space-evenly', alignItems:"center"}} >
        {/* <Box > */}
        <Link to="/bokbok/home"><IconButton><HomeIcon color={location.pathname == "/bokbok/home" ? 'secondary':'inherit' }/></IconButton></Link>
        <Link to="/bokbok/message"><IconButton><ChatIcon color={location.pathname == "/bokbok/message" ?'secondary': 'inherit'}/></IconButton></Link>
        <IconButton><NotificationsIcon /></IconButton>
        <IconButton><SettingsIcon /></IconButton>
        <IconButton><LogoutIcon /></IconButton>
        <img className="tapos" src={tapos} />
        {/* </Box> */}
      </Box>
      <Outlet/>
      {/* <Box sx={{height:"90%", bgcolor:"cyan"}}><Outlet /></Box> */}
    </Box>
  ) 
}

export default RootLayout