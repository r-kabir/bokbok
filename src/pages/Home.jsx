import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import GroupList from '../components/GroupList'
import FriendRequest from '../components/FriendRequest'
import FriendList from '../components/FriendList'
import AllUser from '../components/AllUser'
import MyGroups from '../components/MyGroups'
import BlockList from '../components/BlockList'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  let currentUser = useSelector((state)=>state.storeduser.value)
  let bokNavigate = useNavigate();

  useEffect(()=>{
    if (currentUser == null){
      bokNavigate("/login");
      
    }
  },[])
  return (
  <Box sx={{flexGrow:1}}>
    <Grid container spacing={3} sx={{p:"8px"}}>
      <Grid item xs={12} md={4}><GroupList /></Grid>
      <Grid item xs={12} md={4}><FriendList /></Grid>
      <Grid item xs={12} md={4}><AllUser /></Grid>
      <Grid item xs={12} md={4}><FriendRequest /></Grid>
      <Grid item xs={12} md={4}><MyGroups /></Grid>
      <Grid item xs={12} md={4}><BlockList /></Grid>
      {/* <Grid item xs={12} md={4}  boxShadow={12}><h2>xs=4</h2></Grid> */}
      {/* <Grid item xs={12} md={4} height="40vh" boxShadow={12}><h2>xs=4</h2></Grid> */}
    </Grid>
  </Box>
  )
}

export default Home