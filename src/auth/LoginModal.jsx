import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LoginModal = ({ open, handleClose }) => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // sends th creds to the backend and if the creds are true it will loges the user else throws an errro
  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', credentials);
      login(res.data.access);
      handleClose();
    } catch {
      alert("Login failed");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
        <TextField fullWidth margin="dense" label="Password" type="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Login</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
