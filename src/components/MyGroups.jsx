import React from 'react'
import { Box, Button } from '@mui/material'
import tapos from '../assets/tapos.png';


const MyGroups = () => {
  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px", display:"flex", alignItems:"center", justifyContent:"space-between"}}><h3>My Groups</h3><Button variant='outlined' size='small' color='warning'>Create Group</Button></Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>Tapos Kabir</h4><p>ghjgfjfhkgk hkhggkgkk</p></Box>
            <Button size='small' variant='contained' color='error'>Leave Group</Button>
        </Box>
    </Box>
  )
}

export default MyGroups