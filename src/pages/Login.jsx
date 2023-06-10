import React from 'react'
import { useState } from 'react';
import {Button, Box, Stack, Container, Paper, TextField, CircularProgress, Alert} from '@mui/material';
import image1 from '../assets/image1.jpg';
import google2 from '../assets/google2.png';
import fb2 from '../assets/fb2.png';
import TypoLarge from '../assets/components/TypoLarge';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';

let bokInitialValues = {
  email:"",
  password:"",
  loading:false
}

const Login = () => {

  const auth = getAuth();
  let bokNavigate = useNavigate();
  let [bokValues, setBokValues] = useState(bokInitialValues);


  let handleBokBokValues = (e) => {
    setBokValues({
      ...bokValues,
      [e.target.name] : e.target.value
    })
  }

  let handleSubmit = () => {
    let {email, fullName, password} = bokValues
      setBokValues({
        ...bokValues,
        loading : true
      })
      signInWithEmailAndPassword(auth, email, password).then((bokuser)=>{
      setBokValues({
        email:"",
        password:"",
        loading : false
      })
      console.log(bokuser);
      bokNavigate("/")
    })
  }


  return (
    <>
      <Container maxWidth="md" sx={{}}>
        <Paper elevation={16} sx={{ display:'flex', m:'10vh', p:'8px', backgroundColor:'azure'}}>
          <Box sx={{ width:"60%", p:"2vh"}}>
            <Box sx={{width:'70%', m:'auto'}}>
              <TypoLarge boktitle="Easy Login To Your Account"/>
            </Box>
            <Box sx={{width:'70%', display:'flex', m:'auto', pb:'30px'}}>
              <img className="socialLogin" src={google2} />
              <img className="socialLogin" src={fb2} />
            </Box>
            <Stack spacing={5} sx={{width:'70%', m:'auto'}}>
              <TextField onChange={handleBokBokValues} value ={bokValues.email} name="email" label="Email Address" variant="outlined" color='warning' />
              <TextField  onChange={handleBokBokValues} value ={bokValues.password} name="password" label="Password" type='password' variant="outlined" color='warning' />
              {bokValues.loading ?
                <CircularProgress color="warning" />
                :
                <Button onClick={handleSubmit} variant="contained" color='warning' sx={{}}>Login To Continue</Button>
              }
              <Alert variant="outlined" severity="warning">
                Don't Have an Account?<strong><Link to='/'>Registration</Link></strong>
              </Alert>
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