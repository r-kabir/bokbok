import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import tapos from '../assets/tapos.png';
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {

  const db = getDatabase();
  let [friendRequestList, setFriendRequestList] = useState([]);

  let currentuser = useSelector((state)=> state.storeduser.value);

  useEffect(()=>{
    const hudaiRef = ref(db, 'bokbokFriendRequests/');
    onValue(hudaiRef, (snapshot) => {
      let hudaiArray = [];
      snapshot.forEach(bokitem=>{
        if(bokitem.val().receiverid == currentuser.uid){
          hudaiArray.push({...bokitem.val(), id: bokitem.key})
        }
      })
      setFriendRequestList(hudaiArray);
    });
  },[]);

  let handleAccept =(bokitem)=>{
    set(push(ref(db, 'bokbokFriendList/')), {
      ...bokitem,
    }).then(()=>{
      remove(ref(db, 'bokbokFriendRequests/' + bokitem.id));
    });
  };

  let handleReject =(id)=>{
    remove(ref(db, 'bokbokFriendRequests/' + id))
  }


  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px"}}><h3>Friend Requests</h3></Box>
        {friendRequestList.map(bokitem=>(
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
          <img className="tapos" src={tapos} />
          <Box><h4>{bokitem.sendername}</h4><p>{bokitem.email}</p></Box>
          <Button onClick={()=>handleAccept(bokitem)} size='small' variant='contained' color='inherit' sx={{textTransform:'capitalize', fontSize:'11px'}}>Accept</Button>
          <Button onClick={()=>handleReject(bokitem.id)} size='small' variant='contained' color='error' sx={{textTransform:'capitalize', fontSize:'11px'}}>Reject</Button>
      </Box>
        ))}
    </Box>
  )
}

export default FriendRequest