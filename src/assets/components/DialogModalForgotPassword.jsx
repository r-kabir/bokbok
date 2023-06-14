import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, Stack } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const DialogModalForgotPassword = () => {
    let [dialogModalOpen, setDialogModalOpen] = useState(false)

  return (
    <Box>
      <Button onClick={()=>setDialogModalOpen(!dialogModalOpen)} variant='outlined' size='small' color='error'>Forgot Password?</Button>
      <Dialog open={dialogModalOpen} onClose={()=>setDialogModalOpen(!dialogModalOpen)}>
        <DialogTitle>Forgot Your Password? Recover It!</DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <h2>Enter Your Email to Reset Password</h2>
            <TextField fullWidth variant='outlined' color='warning' label="Reset Password By Email" />
            <Button variant="contained" color='warning' sx={{width:"50%"}}>Send Reset Email</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default DialogModalForgotPassword