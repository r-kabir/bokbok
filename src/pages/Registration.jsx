import React from 'react'
import { useState } from 'react';
import {Button, Box, Stack, Container, Paper, TextField, CircularProgress, Alert} from '@mui/material';
import image2 from '../assets/image2.jpg';
import TypoLarge from '../assets/components/TypoLarge';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';

let bokInitialValues = {
  email:"",
  fullName:"",
  password:"",
  loading:false
}

const Registration = () => {

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
      createUserWithEmailAndPassword(auth, email, password).then((bokuser)=>{
      setBokValues({
        email:"",
        fullName:"",
        password:"",
        loading : false
      })
      bokNavigate("/login")
    })
  }

  return (
    <>
      <Container maxWidth="md" sx={{}} >
        <Paper elevation={16} sx={{ display:'flex', m:'10vh', p:'8px', backgroundColor:'azure'}}>
          <Box sx={{ width:"60%", p:'2vh'}}>
            <Stack spacing={1} sx={{width:'70%', m:'auto', pb:'30px'}}>
              <TypoLarge  boktitle="Get Started With Easy Register"/>
              <p>Free Registration And You Will Really Enjoy It !</p>
            </Stack>
            <Stack spacing={5} sx={{ width:'70%', m:'auto'}}>
              <TextField onChange={handleBokBokValues} value ={bokValues.email} name="email" label="Email Address" variant="outlined" color='warning' />
              <TextField onChange={handleBokBokValues} value ={bokValues.fullName} name="fullName" label="Full Name" variant="outlined" color='warning' />
              <TextField onChange={handleBokBokValues} value ={bokValues.password} name="password" label="Password" type='password' variant="outlined" color='warning' />
              {bokValues.loading ?
                <CircularProgress color="warning" />
                :
                <Button onClick={handleSubmit} variant="contained" color='warning' sx={{width:"50%"}}>Sign Up</Button>
              }
              <Alert variant="outlined" severity="warning">
                Already Have an Account?<strong><Link to='/login'> Login</Link></strong>
              </Alert>
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

export default Registration;