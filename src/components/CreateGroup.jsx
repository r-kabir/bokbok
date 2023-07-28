import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, Stack } from '@mui/material'
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";

let initialGroupInfo = {
    groupname:'',
    grouptagline:''
}
const CreateGroup = () => {
    const db = getDatabase();
    let [dialogModalOpen, setDialogModalOpen] = useState(false)
    let [bokGroupInfo, setBokGroupInfo] = useState(initialGroupInfo);
    let currentuser = useSelector((state)=> state.storeduser.value);

    let handleChange =(e)=>{
        setBokGroupInfo({
            ...bokGroupInfo,
            [e.target.name]: e.target.value
        });
    }

    let handleCreateGroup =()=>{
        set(push(ref(db, 'bokbokGroupList/')),{
            groupname: bokGroupInfo.groupname,
            grouptagline: bokGroupInfo.grouptagline,
            adminid: currentuser.uid,
            adminname: currentuser.displayName
        }).then(() => {
            setDialogModalOpen(false)
            
          });
    }

  return (
    <Box>
      <Button onClick={()=>setDialogModalOpen(!dialogModalOpen)} variant='outlined' size='small' color='warning' sx={{textTransform:'capitalize', fontSize:'11px'}}>Create Group</Button>
      <Dialog sx={{zIndex:"9999"}} open={dialogModalOpen} onClose={()=>setDialogModalOpen(!dialogModalOpen)}>
        <DialogTitle>Create Your Own Group !</DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <h2>Set Group Name & Tag Line to Create Your Own Group</h2>
            <TextField onChange={handleChange} name='groupname' fullWidth variant='outlined' color='warning' label="Group Name" />
            <TextField onChange={handleChange} name='grouptagline' fullWidth variant='outlined' color='warning' label="Group Tag Line"/>
            <Button onClick={handleCreateGroup} variant="contained" color='warning' sx={{width:"50%"}}>Create</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default CreateGroup