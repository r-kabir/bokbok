import React from 'react'
import { useState } from 'react';
import {Button, Box, Stack, Container, Paper, TextField, CircularProgress, Alert} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import image2 from '../assets/image2.jpg';
import TypoLarge from '../components/TypoLarge';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate, Link } from 'react-router-dom';

let bokInitialValues = {
  email:"",
  fullName:"",
  password:"",
  loading:false,
  inputError:"",
  showPass:false
}

const Registration = () => {

  const auth = getAuth();
  const db = getDatabase();
  let bokNavigate = useNavigate();
  let [bokValues, setBokValues] = useState(bokInitialValues);

  let handleBokBokValues = (e) => {
    setBokValues({
      ...bokValues,
      [e.target.name] : e.target.value
    })
  }

  let handleSubmit = () => {
    let {email, fullName, password} = bokValues;

    if(!email){
      setBokValues({
        ...bokValues, inputError:"Please Enter Your Email"
      })
      return;
    }
    if(!fullName){
      setBokValues({
        ...bokValues, inputError:"Please Enter Your Full Name" 
      })
      return;
    }
    if(!password){
      setBokValues({
        ...bokValues, inputError:"Please Enter Your Password" 
      })
      return;
    }
    setBokValues({
      ...bokValues,
      loading : true
    })
    createUserWithEmailAndPassword(auth, email, password).then((bokuser)=>{
      
      updateProfile(auth.currentUser, {
        displayName: bokValues.fullName, photoURL: "https://i.ibb.co/QFNMgyM/default-image.png"
      }).then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          console.log('verify email sent');
          console.log(bokuser);
          set(ref(db, 'bokbokUsers/'+bokuser.user.uid), {
            username: bokValues.fullName,
            email: bokValues.email,
            profile_picture : bokuser.user.photoURL
          });
        });
      })
      setBokValues({
        email:"",
        fullName:"",
        password:"",
        loading : false
      });
      bokNavigate("/login");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  return (  
    <Container maxWidth="md" >
      <Paper elevation={12} sx={{ display:'flex', m:'7vh auto',  p:'8px', backgroundColor:'cornsilk'}}>
        <Box sx={{ width:"60%", p:'2vh'}}>
          <Box sx={{width:'80%', m:'auto', pb:'25px'}}>
            <TypoLarge  boktitle="Get Started With Easy Register"/>
            <p>Free Registration And You Will Really Enjoy It !</p>
          </Box>
          <Stack spacing={2} sx={{ width:'70%', m:'auto'}}>
            <TextField onChange={handleBokBokValues} value ={bokValues.email} name="email" label="Email Address" variant="outlined" color='warning' />
            {bokValues.inputError.includes("Email") && <Alert variant="filled" severity="error" sx={{ py:"0px"}}>{bokValues.inputError}</Alert>}
            <TextField onChange={handleBokBokValues} value ={bokValues.fullName} name="fullName" label="Full Name" variant="outlined" color='warning' />
            {bokValues.inputError.includes("Full Name") && <Alert variant="outlined" severity="error" sx={{ py:"0"}}>{bokValues.inputError}</Alert>}
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <TextField sx={{width:"100%"}} onChange={handleBokBokValues} value ={bokValues.password} name="password" label="Password" type={bokValues.showPass ? 'text' : 'password'} variant="outlined" color='warning' />
              <Box sx={{mx:"-15%", zIndex:"9999999"}} onClick={()=>setBokValues({...bokValues, showPass:!bokValues.showPass }) }>
              {bokValues.showPass ? 
                  <VisibilityOffIcon  sx={{  color: 'orange'}}/>
                : 
                  <VisibilityIcon  sx={{  color: 'orange'}}/>
              }
              </Box>                                
            </Box>
            {bokValues.inputError.includes("Password") && <Alert variant='filled' severity="error" sx={{ py:"0"}}>{bokValues.inputError}</Alert>}
            {bokValues.loading ?
              <CircularProgress color="warning" />
              :
              <Button onClick={handleSubmit} variant="contained" color='warning' sx={{width:"50%"}}>Sign Up</Button>
            }
            <Alert sx={{py:0, px:0}}>
              Already Have an Account?<strong><Link to='/login'> Login</Link></strong>
            </Alert>
          </Stack>
        </Box>
        <Box sx={{ width:"40%"}}>
          <img className="regimage" src={image2} />
        </Box>
      </Paper>
    </Container> 
  )
}

export default Registration;