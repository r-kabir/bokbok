import { Button, Box } from '@mui/material'
import React, {useState} from 'react'
import tapos from '../assets/tapos.png';
import CreateGroup from './CreateGroup';

const GroupList = () => {

  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h3>Group List</h3>
          <CreateGroup />
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>Tapos Kabir</h4><p>ghjgfjfhkgk hkhggkgkk</p></Box>
            <Button size='small' variant='contained' color='error' sx={{textTransform:'capitalize', fontSize:'11px'}}>Join Group</Button>
        </Box>
    </Box>
  )
}

export default GroupList