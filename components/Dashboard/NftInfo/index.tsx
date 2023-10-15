import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Infos from './Infos';

function NftInfo() {
  return (
    <Box
      sx={{
        bgcolor: '#F2FDFF',
        boxShadow: '0px 0px 20px #FFCC5C',
        borderRadius: '20px',
        mt: '20px',
        p: '20px',
        pl: '30px',
        display: 'flex',
        mb: '30px',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography
          sx={{
            fontSize: '25px',
            fontWeight: '500',
            color: '#666666',
            ml: { xs: '0px', md: '33px' },
            mb: '10px',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          What can you learn at My Devlet?
        </Typography>
        <Infos />
      </Box>
      <Box
        component="img"
        src="/images/nft-info.png"
        sx={{ display: { xs: 'none', md: 'block' }, objectFit: 'contain' }}
      />
    </Box>
  );
}

export default NftInfo;
