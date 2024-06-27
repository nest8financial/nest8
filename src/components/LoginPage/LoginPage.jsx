import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Container } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Container style={{ paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </Container>
  );
}

export default LoginPage;
