import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';

const SignOut = () => {
    const auth = getAuth();
    let bokNavigate = useNavigate();

    let handleSignOut =() => {
        signOut(auth).then(() => {
            bokNavigate('/login')
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });          
    }

  return (
    <div>
        <Button color='inherit' variant='contained' onClick={handleSignOut}><Logout/></Button>
    </div>
  )
}

export default SignOut