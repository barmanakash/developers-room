import React from 'react';
import { Drawer, Box, Typography, Button, Divider } from '@mui/material';

export default function ProfileDrawer({ open, onClose, user, onLogout, onViewMyPosts }) {
  if (!user) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          backgroundColor: '#F9F6EE',
          borderLeft: '3px solid #000000',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#000' }}>
            User Profile
          </Typography>
          <Button
            onClick={onClose}
            sx={{ minWidth: 'auto', color: '#000', fontWeight: 800, border: '2px solid #000', borderRadius: '6px', px: 1, py: 0.5 }}
          >
            ✕
          </Button>
        </Box>

        <Divider sx={{ borderColor: '#000', mb: 3, borderWidth: '1px' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {[
            { label: 'Full Name', value: user.full_name },
            { label: 'Email Id', value: user.email },
            { label: 'Mobile Number', value: user.mobile_number },
            { label: 'Location', value: user.location },
            { label: 'Current Company', value: user.current_company },
          ].map((item, idx) => (
            <Box key={idx} sx={{ backgroundColor: '#FFF', border: '2px solid #000', p: '10px 14px', borderRadius: '8px', boxShadow: '2px 2px 0px #000' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#666', display: 'block' }}>
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 800, color: '#000' }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={() => { onClose(); onViewMyPosts(); }}
          sx={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fontWeight: 800,
            textTransform: 'none',
            padding: '10px 0',
            borderRadius: '8px',
            border: '2px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            '&:hover': {
              backgroundColor: '#F2EDE1',
              boxShadow: '1px 1px 0px #000000',
            },
          }}
        >
          My Posts 📝
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onLogout}
          sx={{
            backgroundColor: '#FF6B55',
            color: '#000000',
            fontWeight: 800,
            textTransform: 'none',
            padding: '10px 0',
            borderRadius: '8px',
            border: '2px solid #000000',
            boxShadow: '4px 4px 0px #000000',
            '&:hover': {
              backgroundColor: '#FF543B',
              boxShadow: '2px 2px 0px #000000',
              transform: 'translate(2px, 2px)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}