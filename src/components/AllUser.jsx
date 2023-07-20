import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import tapos from '../assets/tapos.png';
import { getDatabase, ref, onValue } from "firebase/database";

const AllUser = () => {
    const db = getDatabase();
    let [bokAllUser, setBokAllUser] = useState([]);
    
    useEffect(()=>{
        const hudaiRef = ref(db, 'bokbokUsers/');
        onValue(hudaiRef, (snapshot) => {
         let hudaiArray = [];
         snapshot.forEach(bokitem=>{ hudaiArray.push( {...bokitem.val(), id: bokitem.key} ) })
         setBokAllUser(hudaiArray);
        });
        
    },[])


  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px"}}><h3>All Users</h3></Box>
        {bokAllUser.map(bokitem=>(
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>{bokitem.username}</h4><p>{bokitem.email}</p></Box>
            <Button size='small' variant='contained'>Add Friend</Button>
        </Box>
        ))}    
    </Box>
  )
}

export default AllUser