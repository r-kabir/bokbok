import { Button, Box } from '@mui/material'
import React, {useState, useEffect} from 'react'
import tapos from '../assets/tapos.png';
import CreateGroup from './CreateGroup';
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';

const GroupList = () => {
  const db = getDatabase();
  let currentuser = useSelector((state)=> state.storeduser.value);
  let [bokAllGroup, setBokAllGroup] = useState([]);

  useEffect(()=>{
    const hudaiRef = ref(db, 'bokbokGroupList/')
    onValue(hudaiRef, (snapshot)=>{
      let hudaiArray = [];
      snapshot.forEach(bokitem=>{
        if(currentuser.uid != bokitem.val().adminid){
          hudaiArray.push({...bokitem.val(), id: bokitem.key})
        }
      })
      setBokAllGroup(hudaiArray);
    })
  },[])
  return (
    <Box boxShadow={4} sx={{height:"40vh", overflow:"auto", borderRadius:"10px"}}>
        <Box sx={{p:"15px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h3>Group List</h3>
          <CreateGroup />
        </Box>
        {bokAllGroup.map(bokitem=>(
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid red", p:"10px"}}>
          <img className="tapos" src={tapos} />
          <Box><h4>{bokitem.groupname}</h4><p>{bokitem.grouptagline}</p></Box>
          <Button size='small' variant='contained' color='error' sx={{textTransform:'capitalize', fontSize:'11px'}}>Join Group</Button>
          </Box>
        ))}
    </Box>
  )
}

export default GroupList