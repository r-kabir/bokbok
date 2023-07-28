import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, Stack } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const DialogModalForgotPassword = () => {
    let [dialogModalOpen, setDialogModalOpen] = useState(false)
    let [emailAddress, setEmailAddress] = useState("")
    const auth = getAuth();

    let handlePasswordResetEmail = () => {
      sendPasswordResetEmail(auth, emailAddress)
      .then(() => {
        setDialogModalOpen(false)
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    }

  return (
    <Box>
      <Button onClick={()=>setDialogModalOpen(!dialogModalOpen)} sx={{px:1, py:0, mx:"20%"}} variant='outlined' size='small' color='error'>Forgot Password?</Button>
      <Dialog sx={{zIndex:"9999"}} open={dialogModalOpen} onClose={()=>setDialogModalOpen(!dialogModalOpen)}>
        <DialogTitle>Forgot Your Password? Recover It!</DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <h2>Enter Your Email to Reset Password</h2>
            <TextField onChange={(e)=>setEmailAddress(e.target.value)} fullWidth variant='outlined' color='warning' label="Reset Password By Email" />
            <Button onClick={handlePasswordResetEmail} variant="contained" color='warning' sx={{width:"50%"}}>Send Reset Email</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default DialogModalForgotPassword