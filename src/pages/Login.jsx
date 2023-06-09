import React from 'react'
import {Button, Box, Stack, Container, Paper, TextField} from '@mui/material';
import image1 from '../assets/image1.jpg';

const Login = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ }}>
        <Paper elevation={16} sx={{ display:'flex', m:'10vw', p:'8px', backgroundColor:'azure'}}>
          <Box sx={{ width:"60%", p:"2vw"}}>
            <Stack spacing={5} sx={{width:'70%', m:'auto'}}>
              <TextField id="outlined-basic" label="Email" variant="outlined" color='warning' />
              <TextField id="outlined-basic" label="Password" type='password' variant="outlined" color='warning' />
              <Button variant="contained" color='warning' sx={{width:"100%"}}>Login</Button>
            </Stack>
          </Box>
          <Box sx={{ width:"40%"}}>
            <img className="regimage" src={image1} />
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default Login