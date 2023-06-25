import React from 'react'
import { Box, Button } from '@mui/material'
import tapos from '../assets/tapos.png';

const FriendRequest = () => {
  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px"}}><h3>Friend Requests</h3></Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>Tapos Kabir</h4><p>ghjgfjfhkgk hkhggkgkk</p></Box>
            <Button size='small' variant='contained'>Accept</Button>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>Tapos Kabir</h4><p>ghjgfjfhkgk hkhggkgkk</p></Box>
            <Button size='small' variant='contained'>Accept</Button>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>Tapos Kabir</h4><p>ghjgfjfhkgk hkhggkgkk</p></Box>
            <Button size='small' variant='contained'>Accept</Button>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>Tapos Kabir</h4><p>ghjgfjfhkgk hkhggkgkk</p></Box>
            <Button size='small' variant='contained'>Accept</Button>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>Tapos Kabir</h4><p>ghjgfjfhkgk hkhggkgkk</p></Box>
            <Button size='small' variant='contained'>Accept</Button>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>Tapos Kabir</h4><p>ghjgfjfhkgk hkhggkgkk</p></Box>
            <Button size='small' variant='contained'>Accept</Button>
        </Box>
    </Box>
  )
}

export default FriendRequest