import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Container, TextField, Button, Typography, Box } from '@mui/material';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          email: email,
          password: password
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
  
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>  
   <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ background: '#0073e6', color: 'white', width: '100%', textAlign: 'center', padding: '8px 0' }}>
            Login/sign-up
          </Typography>
          <img alt="Login Icon" src="favicon.ico" />
        </Box>
      {errors.loginMessage && (
        <Typography variant="body1" color="error">
          {errors.loginMessage}
        </Typography>
      )}
      <TextField 
      label="Email"
            type="text"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            variant='outlined'
            fullWidth
            />
      <TextField
        label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            variant='outlined'
            fullWidth
          />
       
      
       <Box sx={{ display: 'flex',alignItems: 'center', flexDirection: 'column' ,gap: 2}}>
          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>
          <Typography variant="body2" sx={{gap:100}} >
            Don't have an account?
          </Typography>
        </Box>
  
    </form>
    </Container>

  );
}

export default LoginForm;
