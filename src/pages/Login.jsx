import React from 'react'
import { useState, useEffect } from 'react';
import {Button, Box, Stack, Container, Paper, TextField, CircularProgress, Alert} from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import image1 from '../assets/image1.jpg';
import google2 from '../assets/google2.png';
// import fb2 from '../assets/fb2.png';
import TypoLarge from '../components/TypoLarge';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import DialogModalForgotPassword from '../components/DialogModalForgotPassword';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { reduxuserdata } from '../slices/user/userSlice'

let bokInitialValues = {
  email:"",
  password:"",
  loading:false
}

const Login = () => {

  const notify = (boknotify) => toast.error(boknotify);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let bokNavigate = useNavigate();
  let [bokValues, setBokValues] = useState(bokInitialValues);
  let [firebaseError, setFirebaseError] = useState("");
  let dispatch = useDispatch();

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
      if(bokuser.user.emailVerified)
        {
          dispatch(reduxuserdata(bokuser.user));
          bokNavigate("/bokbok/home");
        }
      else{
        notify("Please Verifiy Your Email Address")
        setBokValues({
        ...bokValues,
        password:"",
        loading: false
        })
      };
    }).catch((error) => {
      const errorCode = error.code;
      // notify(errorCode);

      if(errorCode.includes("auth/wrong-password")){
        setBokValues({
        ...bokValues,
        password:"",
        loading: false
        })
        notify("!!Wrong Password!!")
        return
      }
      if(errorCode.includes("auth/user-not-found")){
        setBokValues({
        ...bokValues,
        email:"",
        password:"",
        loading: false
        })
        notify("!!You Are Not Registered Yet!!")
        return
      }
      else{
        setBokValues({
        ...setBokValues,
        email:"",
        password:"",
        loading:false
        })
        notify("Please Fill All The Fields")
        return
      }  
      // setFirebaseError(errorCode);
    });
  }

  let handleGooglePopupLogin = () => {
    signInWithPopup(auth, provider).then((result)=>{console.log(result);})
  }


  return (
    <Container maxWidth="md">
      <Paper elevation={12} sx={{ display:'flex', m:'15vh auto', p:'8px', backgroundColor:'cornsilk'}}>
        <Box sx={{ width:"60%", p:"2vh"}}>
          <Box sx={{width:'80%', mx:'auto', pt:"15px"}}>
            <TypoLarge boktitle="Easy Login To Your Account"/>
          </Box>
          <Box sx={{width:'70%', display:'flex', mx:'auto', pb:'15px'}}>
            <img onClick={handleGooglePopupLogin} className="socialLogin" src={google2} />
            {/* <img className="socialLogin" src={fb2} /> */}
          </Box>
          <Stack spacing={2} sx={{width:'70%', mx:'auto'}}>
            <TextField onChange={handleBokBokValues} value ={bokValues.email} name="email" label="Email Address" variant="outlined" color='warning' />
            {firebaseError.includes("auth/user-not-found") && <Alert variant="outlined" severity="error" sx={{ py:0, width:"80%"}}>!!You Are Not Registered Yet!!</Alert>}
            <TextField  onChange={handleBokBokValues} value ={bokValues.password} name="password" label="Password" type='password' variant="outlined" color='warning' />
            {firebaseError.includes("auth/wrong-password") && <Alert variant="outlined" severity="error" sx={{ py:0, width:"80%"}}>!!Wrong Password!!</Alert>}
            {firebaseError.includes("Verifiy Your Email") && <Alert variant='outlined' severity='error' sx={{py:0, width:"80%"}}>{firebaseError}</Alert>}
            {bokValues.loading ?
              <CircularProgress color="warning" />
              :
              <Button onClick={handleSubmit} variant="contained" color='warning'>Login To Continue</Button>
            }
            {/* <Button onClick={notify}>Notify!</Button> */}
            <Alert sx={{py:0, px:0}}>
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