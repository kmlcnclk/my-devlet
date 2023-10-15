import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Card1() {
  return (
    <Box
      sx={{
        width: '285px',
        minHeight: '210px',
        bgcolor: '#F2FDFF',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: '20px',
        mt: '40px',
        mr: { xs: '0px', sm: '40px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          mb: '5px',
        }}
      >
        <Box component="img" src="/images/doc.png" sx={{ mr: '15px' }} />
        <Typography sx={{ color: '#666666', fontWeight: '500' }}>
          Web3 Wizard
        </Typography>
      </Box>
      <Typography
        sx={{ textAlign: 'left', color: '#666666', fontSize: '14px' }}
      >
        Start to Create Smart Contracts for adding your informations to
        Blockchian without any coding and save time with our user-friendly
        interface.
      </Typography>
    </Box>
  );
}

export default Card1;
