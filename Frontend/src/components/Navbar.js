import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function Navbar({ user, onOpenProfile, onNewPost }) {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderBottom: '3px solid #000000',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 900, color: '#000000', letterSpacing: '-1px' }}>
        developer room<span style={{ color: '#FF6B55' }}>.</span>
      </Typography>

      <Button
        variant="contained"
        onClick={onNewPost}
        sx={{
          backgroundColor: '#FF6B55',
          color: '#000000',
          fontWeight: 800,
          textTransform: 'none',
          padding: '8px 20px',
          borderRadius: '8px',
          border: '2px solid #000000',
          boxShadow: '3px 3px 0px #000000',
          '&:hover': {
            backgroundColor: '#FF543B',
            boxShadow: '1px 1px 0px #000000',
            transform: 'translate(2px, 2px)',
          },
        }}
      >
        + New Post
      </Button>

      <Box
        onClick={onOpenProfile}
        sx={{
          backgroundColor: '#F9F6EE',
          border: '2px solid #000000',
          borderRadius: '20px',
          padding: '6px 16px',
          cursor: 'pointer',
          boxShadow: '2px 2px 0px #000000',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          '&:hover': {
            backgroundColor: '#F2EDE1',
          },
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 800, color: '#000' }}>
          {user?.full_name || 'Profile'}
        </Typography>
      </Box>
    </Box>
  );
}