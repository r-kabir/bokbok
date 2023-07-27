import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import tapos from '../assets/tapos.png';
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockList = () => {

  const db = getDatabase();
  let [blockList, setBlockList] = useState([]);
  let currentuser = useSelector((state)=> state.storeduser.value);

  useEffect(()=>{
    const hudaiRef = ref(db, 'bokbokBlockList/');
    onValue(hudaiRef, (snapshot) => {
      let hudaiArray = [];
      snapshot.forEach(bokitem=>{
        hudaiArray.push({...bokitem.val(), id:bokitem.key}) 
      })
      setBlockList(hudaiArray);
    });
  },[]);

  let handleUnblock =(bokitem)=>{
    remove(ref(db, 'bokbokBlockList/' + bokitem.id));
  };

  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px"}}><h3>Blocked Users</h3></Box>
        {blockList.map(bokitem=>(
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
          <img className="tapos" src={tapos} />
          <Box>
            {bokitem.blockedbyid == currentuser.uid ?
            <h4>{bokitem.blockedname}</h4>
            :
            <h4>{bokitem.blockedbyname}</h4>
            }
            <p>{}</p>
            </Box>
          {bokitem.blockedbyid == currentuser.uid &&
            <Button onClick={()=>handleUnblock(bokitem)} size='small' variant='contained' color='error' sx={{textTransform:'capitalize', fontSize:'11px'}}>Unblock</Button>
          }
        </Box>
        ))}
    </Box>
  )
}

export default BlockList