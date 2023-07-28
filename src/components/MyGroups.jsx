import React, {useState, useEffect} from 'react'
import { Box, Button } from '@mui/material'
import tapos from '../assets/tapos.png';
import CreateGroup from './CreateGroup';
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';

const MyGroups = () => {
  const db = getDatabase();
  let currentuser = useSelector((state)=> state.storeduser.value);
  let [bokMyGroup, setBokMyGroup] = useState([]);

  useEffect(()=>{
    const hudaiRef = ref(db, 'bokbokGroupList/')
    onValue(hudaiRef, (snapshot)=>{
      let hudaiArray = [];
      snapshot.forEach(bokitem=>{
        if(currentuser.uid == bokitem.val().adminid){
          hudaiArray.push({...bokitem.val(), id: bokitem.key})
        }
      })
      setBokMyGroup(hudaiArray);
    })
  },[])
  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h3>My Groups</h3>
          <CreateGroup />
        </Box>
        {bokMyGroup.map(bokitem=>(
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
          <img className="tapos" src={tapos} />
          <Box><h4>{bokitem.groupname}</h4><p>{bokitem.grouptagline}</p></Box>
          <Button size='small' variant='contained' color='error' sx={{textTransform:'capitalize', fontSize:'11px'}}>Leave Group</Button>
          </Box>
        ))}
    </Box>
  )
}

export default MyGroups