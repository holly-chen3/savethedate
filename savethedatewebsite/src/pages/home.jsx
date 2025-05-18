import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import curzon from '../assets/curzon.jpg';

export const Home = () => {
  const handleDownloadICS = () => {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Libby & Jayson Wedding//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:libby-jayson-wedding-2026@example.com',
      'DTSTAMP:20250518T000000Z',
      'DTSTART;VALUE=DATE:20260328',
      'DTEND;VALUE=DATE:20260329',
      'SUMMARY:Libby & Jayson\'s Wedding',
      'DESCRIPTION:Save the date for Libby & Jayson\'s wedding at Curzon Hall!',
      'LOCATION:Curzon Hall, Sydney, NSW',
      'STATUS:CONFIRMED',
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
      'END:VCALENDAR',
    ];
    const icsContent = icsLines.join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'libby-jayson-wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
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
      <Typography variant="h4" sx={{ mb: 1 }}>
        28 March 2026
      </Typography>
      <Typography variant="h2" sx={{ fontWeight: 400, mb: 3, fontFamily: "'Suranna', serif" }}>
        Libby &amp; Jayson
      </Typography>
      <Button
        variant="contained"
        onClick={handleDownloadICS}
        sx={{
          backgroundColor: '#333300',
          color: 'white',
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          borderRadius: '8px',
          textTransform: 'none',
          mb: 3,
          '&:hover': {
            backgroundColor: '#3B3B0C',
          },
        }}
      >
        Save the date
      </Button>
      <Typography variant="subtitle1">Sydney, NSW</Typography>
    </Box>
  );
};