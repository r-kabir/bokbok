import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import tapos from '../assets/tapos.png';
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';


const FriendList = () => {

  const db = getDatabase();
  let [friendList, setFriendList] = useState([]);
  let currentuser = useSelector((state)=> state.storeduser.value);

  useEffect(()=>{
    const hudaiRef = ref(db, 'bokbokFriendList/');
    onValue(hudaiRef, (snapshot) => {
      let hudaiArray = [];
      snapshot.forEach(bokitem=>{
        if(bokitem.val().senderid == currentuser.uid || bokitem.val().receiverid == currentuser.uid){
          hudaiArray.push({...bokitem.val(), id:bokitem.key})
        }
      })
      setFriendList(hudaiArray);
    });
  },[]);

  let handleUnfriend =(bokitem)=>{
    remove(ref(db, 'bokbokFriendList/' + bokitem.id));
  }

  let handleBlock =(bokitem)=>{
    if(currentuser.uid == bokitem.senderid){
      set(push(ref(db, 'bokbokBlockList/')), {
        blockedid: bokitem.receiverid,
        blockedname: bokitem.receivername,
        blockedbyid: bokitem.senderid,
        blockedbyname: bokitem.sendername
      }).then(()=>{
        remove(ref(db, 'bokbokFriendList/' + bokitem.id));
      });
    }else{
      set(push(ref(db, 'bokbokBlockList/')), {
        blockedid: bokitem.senderid,
        blockedname: bokitem.sendername,
        blockedbyid: bokitem.receiverid,
        blockedbyname: bokitem.receivername
      }).then(()=>{
        remove(ref(db, 'bokbokFriendList/' + bokitem.id));
      });
    }
  }

  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px"}}><h3>Friend List</h3></Box>
        {friendList.map(bokitem=>(
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
          <img className="tapos" src={tapos} />
          <Box>
            {bokitem.receiverid == currentuser.uid ?
            <h4>{bokitem.sendername}</h4>
            :
            <h4>{bokitem.receivername}</h4>
            }
            <p>ghjgfjfhkgk hkhggkgkk</p>
          </Box>
          <Button onClick={()=>handleBlock(bokitem)} size='small' variant='contained' color='inherit' sx={{textTransform:'capitalize', fontSize:'11px'}}>Block</Button>
          <Button onClick={()=>handleUnfriend(bokitem)} size='small' variant='contained' color='error' sx={{textTransform:'capitalize', fontSize:'11px'}}>Unfriend</Button>
      </Box>
        ))}
    </Box>
  )
}

export default FriendList