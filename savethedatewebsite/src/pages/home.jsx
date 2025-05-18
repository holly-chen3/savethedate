import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import curzon from '../assets/curzon.jpg';

export const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${curzon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: 1, fontFamily: "'Suranna', serif" }}>
          Celebrate with us
        </Typography>
        <Typography variant="h4" sx={{ mb: 1, fontFamily: "'Suranna', serif" }}>
          28 March 2026
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 400, mb: 3, fontFamily: "'Suranna', serif" }}>
          Libby &amp; Jayson
        </Typography>
        <a
          href="/libby-jayson-wedding.ics"
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1a1a00',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.4rem',
              borderRadius: '8px',
              textTransform: 'none',
              mb: 3,
              fontFamily: "'Suranna', serif",
              '&:hover': {
                backgroundColor: '#333300',
              },
            }}
          >
            Save the date
          </Button>
        </a>
        <Typography variant="subtitle1" sx={{ fontFamily: "'Suranna', serif" }}>Sydney, NSW</Typography>
      </Box>
    </Box>
  );
};