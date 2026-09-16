import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Alert } from '@mui/material';

export default function LoginPage({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    mobile_number: '',
    email: '',
    location: '',
    current_company: '',
    password: '',
  });

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#F9F6EE',
      borderRadius: '8px',
      border: '2px solid #000000',
      '& fieldset': { border: 'none' },
      '&:hover, &.Mui-focused': { boxShadow: '3px 3px 0px #000000' },
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (isSignup) {
      const { full_name, mobile_number, email, location, current_company, password } = formData;
      if (!full_name || !mobile_number || !email || !location || !current_company || !password) {
        setError('All fields are mandatory.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Signup failed');

        setSuccessMsg('Account created successfully! Please sign in.');
        setIsSignup(false);
      } catch (err) {
        setError(err.message);
      }
    } else {
      if (!formData.email || !formData.password) {
        setError('Email and Password are required.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Login failed');

        onLoginSuccess(data.user);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: '#F9F6EE', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ backgroundColor: '#FFFFFF', border: '3px solid #000000', boxShadow: '6px 6px 0px #000000', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#000000', letterSpacing: '-1px' }}>
              Developer Room<span style={{ color: '#FF6B55' }}>.</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#555555', fontWeight: 600, mt: '4px' }}>
              {isSignup ? 'Create your account' : 'Sign in to enter the room'}
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ border: '2px solid #000', borderRadius: '8px' }}>{error}</Alert>}
          {successMsg && <Alert severity="success" sx={{ border: '2px solid #000', borderRadius: '8px' }}>{successMsg}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {isSignup && (
              <>
                <Box>
                  <Typography component="label" sx={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', mb: '4px' }}>Full Name *</Typography>
                  <TextField fullWidth name="full_name" placeholder="Akash Barman" value={formData.full_name} onChange={handleChange} size="small" sx={inputSx} />
                </Box>
                <Box>
                  <Typography component="label" sx={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', mb: '4px' }}>Mobile Number *</Typography>
                  <TextField fullWidth name="mobile_number" placeholder="+91 9876543210" value={formData.mobile_number} onChange={handleChange} size="small" sx={inputSx} />
                </Box>
                <Box>
                  <Typography component="label" sx={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', mb: '4px' }}>Location *</Typography>
                  <TextField fullWidth name="location" placeholder="Jabalpur, Madhya Pradesh" value={formData.location} onChange={handleChange} size="small" sx={inputSx} />
                </Box>
                <Box>
                  <Typography component="label" sx={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', mb: '4px' }}>Current Company *</Typography>
                  <TextField fullWidth name="current_company" placeholder="Company Name" value={formData.current_company} onChange={handleChange} size="small" sx={inputSx} />
                </Box>
              </>
            )}

            <Box>
              <Typography component="label" sx={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', mb: '4px' }}>Email Id *</Typography>
              <TextField fullWidth type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} size="small" sx={inputSx} />
            </Box>

            <Box>
              <Typography component="label" sx={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', mb: '4px' }}>Password *</Typography>
              <TextField fullWidth type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} size="small" sx={inputSx} />
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: '#FF6B55', color: '#000000', fontWeight: 800, textTransform: 'none', padding: '10px 0', borderRadius: '8px', border: '2px solid #000000', boxShadow: '4px 4px 0px #000000', mt: '4px', '&:hover': { backgroundColor: '#FF543B', boxShadow: '2px 2px 0px #000000', transform: 'translate(2px, 2px)' } }}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#555' }}>
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <span onClick={() => { setIsSignup(!isSignup); setError(''); setSuccessMsg(''); }} style={{ color: '#FF6B55', cursor: 'pointer', fontWeight: 800, textDecoration: 'underline' }}>
                {isSignup ? 'Sign in' : 'Sign up'}
              </span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}