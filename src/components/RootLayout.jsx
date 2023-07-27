import { Box, Container, Grid, IconButton, Stack, Button} from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import {Home, Chat, Settings, Notifications} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import tapos from '../assets/tapos.png';
import SignOut from './SignOut';
import { useSelector } from 'react-redux';

const RootLayout = () => {
  const location = useLocation();
  // console.log(location.pathname);

  let currentuser = useSelector((state)=> state.storeduser.value);
  return (
    <Box sx={{maxWidth:"95vw", m:"3vh auto"}}>
      <Box sx={{ minHeight:"8vh", borderRadius:"10px", boxShadow:"4", display:'flex',justifyContent:'space-evenly', alignItems:"center"}} >
        {/* <Box > */}
        <Link to="/bokbok/home"><Button color='error' variant={location.pathname == "/bokbok/home" ?'outlined': 'contained'}><Home/></Button></Link>
        <Link to="/bokbok/message"><Button color='error' variant={location.pathname == "/bokbok/message" ?'outlined': 'contained'}><Chat /></Button></Link>
        <Button color='inherit' variant='contained'><Notifications /></Button>
        <Button color='inherit' variant='contained'><Settings /></Button>
        <SignOut />
        <img className="tapos" src={tapos} />
        <h5>{currentuser.displayName}</h5>
        {/* </Box> */}
      </Box>
      <Outlet/>
      {/* https://i.ibb.co/y0F2SLf/avatar.png */}
      {/* https://i.ibb.co/QFNMgyM/default-image.png */}
      {/* <Box sx={{height:"90%", bgcolor:"cyan"}}><Outlet /></Box> */}
    </Box>
  ) 
}

export default RootLayout