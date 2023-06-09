import React from 'react'
import {Button, Box, Stack, Container, Paper, TextField} from '@mui/material';
import image2 from '../assets/image2.jpg';

const Registration = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ }} >
        <Paper elevation={16} sx={{ display:'flex', m:'10vw', p:'8px', backgroundColor:'azure'}}>
          <Box sx={{ width:"60%", p:'2vw'}}>
            <Stack spacing={5} sx={{ width:'70%', m:'auto'}}>
              <TextField label="Email" variant="outlined" color='warning' />
              <TextField label="Full Name" variant="outlined" color='warning' />
              <TextField label="Password" type='password' variant="outlined" color='warning' />
              <Button variant="contained" color='warning' sx={{width:"50%"}}>Sign Up</Button>
            </Stack>
          </Box>
          <Box sx={{ width:"40%"}}>
            <img className="regimage" src={image2} />
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default Registration