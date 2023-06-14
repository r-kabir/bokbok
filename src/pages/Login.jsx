import React from 'react'
import { useState } from 'react';
import {Button, Box, Stack, Container, Paper, TextField, CircularProgress, Alert, Dialog, DialogTitle} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import image1 from '../assets/image1.jpg';
import google2 from '../assets/google2.png';
import fb2 from '../assets/fb2.png';
import TypoLarge from '../assets/components/TypoLarge';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import DialogModalForgotPassword from '../assets/components/DialogModalForgotPassword';

let bokInitialValues = {
  email:"",
  password:"",
  loading:false
}

const Login = () => {

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let bokNavigate = useNavigate();
  let [bokValues, setBokValues] = useState(bokInitialValues);

  let [openDial, setOpenDial] = useState(false);


  let handleBokBokValues = (e) => {
    setBokValues({
      ...bokValues,
      [e.target.name] : e.target.value
    })
  }

  let handleSubmit = () => {
    let {email, password} = bokValues
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
      bokNavigate("/home")
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  let handleGooglePopupLogin = () => {
    signInWithPopup(auth, provider).then((result)=>{console.log(result);})
  }


  return (
    <Container maxWidth="md" sx={{}}>
      <Paper elevation={16} sx={{ display:'flex', m:'10vh', p:'8px', backgroundColor:'azure'}}>
        <Box sx={{ width:"60%", p:"2vh"}}>
          <Box sx={{width:'70%', m:'auto'}}>
            <TypoLarge boktitle="Easy Login To Your Account"/>
          </Box>
          <Box sx={{width:'70%', display:'flex', m:'auto', pb:'30px'}}>
            <img onClick={handleGooglePopupLogin} className="socialLogin" src={google2} />
            <img className="socialLogin" src={fb2} />
          </Box>
          <Stack spacing={3} sx={{width:'70%', m:'auto'}}>
            <TextField onChange={handleBokBokValues} value ={bokValues.email} name="email" label="Email Address" variant="outlined" color='warning' />
            <TextField  onChange={handleBokBokValues} value ={bokValues.password} name="password" label="Password" type='password' variant="outlined" color='warning' />
            {bokValues.loading ?
              <CircularProgress color="warning" />
              :
              <Button onClick={handleSubmit} variant="contained" color='warning' sx={{}}>Login To Continue</Button>
            }
            <Alert variant="outlined" severity="warning" sx={{py:0}}>
              Don't Have an Account?<strong><Link to='/'> Register Here</Link></strong>
            </Alert>
            <DialogModalForgotPassword />
          </Stack>
        </Box>
        <Box sx={{ width:"40%"}}>
          <img className="regimage" src={image1} />
        </Box>
      </Paper>
    </Container>
  )
}

export default Login