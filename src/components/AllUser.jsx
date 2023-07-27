import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import tapos from '../assets/tapos.png';
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';

const AllUser = () => {
  const db = getDatabase();
  const auth = getAuth();
  let [bokAllUser, setBokAllUser] = useState([]);
  let [bokFriendRequest, setBokFriendRequest] = useState([]);
  let currentuser = useSelector((state)=> state.storeduser.value);

  useEffect(()=>{
    const hudaiRef = ref(db, 'bokbokFriendRequests/');
    onValue(hudaiRef, (snapshot) => {
      let hudaiArray = [];
      snapshot.forEach(bokitem=>{
        hudaiArray.push(bokitem.val().receiverid + bokitem.val().senderid)
      })
      setBokFriendRequest(hudaiArray);
    });
  },[]);
  
  useEffect(()=>{
    const hudaiRef = ref(db, 'bokbokUsers/');
    onValue(hudaiRef, (snapshot) => {
      let hudaiArray = [];
      snapshot.forEach(bokitem=>{
        if (currentuser.uid != bokitem.key) {
          hudaiArray.push({...bokitem.val(), id: bokitem.key})
        } 
      })
      setBokAllUser(hudaiArray);
    });    
  },[])

  let handleCancelRequest =(bokitem)=>{
    console.log(bokitem.id);
    remove(ref(db, 'bokbokFriendRequests/' + bokitem.id))
  }

  let handleFriendRequest = (bokitem)=>{
    set(ref(db, 'bokbokFriendRequests/' + bokitem.id), {
      senderid: auth.currentUser.uid,
      sendername: auth.currentUser.displayName,
      receiverid: bokitem.id,
      receivername: bokitem.username
    });
  };


  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px"}}><h3>All Users</h3></Box>
        {bokAllUser.map(bokitem=>(
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
            <img className="tapos" src={tapos} />
            <Box><h4>{bokitem.username}</h4><p>{bokitem.email}</p></Box>
            {bokFriendRequest.includes(bokitem.id + auth.currentUser.uid) ?
            <Button onClick={()=>handleCancelRequest(bokitem)} size='small' variant='contained' color='error' sx={{textTransform:'capitalize', fontSize:'11px'}}>Cancel</Button>
            : bokFriendRequest.includes(auth.currentUser.uid + bokitem.id) ?
              <Button size='small' variant='contained' color='inherit' sx={{textTransform:'capitalize', fontSize:'11px'}}>Pending</Button>
            :
            <Button onClick={()=>handleFriendRequest(bokitem)} size='small' variant='contained' color='inherit' sx={{textTransform:'capitalize', fontSize:'11px'}}>Add Friend</Button>
            }
            
            {/* <Button size='small' variant='contained' color='inherit' sx={{textTransform:'capitalize', fontSize:'11px'}}>Friends</Button> */}
            
            {/* <Button size='small' variant='contained' color='inherit' sx={{textTransform:'capitalize', fontSize:'11px'}}>Pending</Button> */}
        </Box>
        ))}    
    </Box>
  )
}

export default AllUser