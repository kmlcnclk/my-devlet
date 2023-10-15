import React from 'react';

import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';

function Infos() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
        <DoneIcon sx={{ color: '#71BC58', fontSize: '30px', mr: '5px' }} />
        <Typography sx={{ fontSize: '13px', fontWeight: '300' }}>
          Fundamentals of blockchain technology.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
        <DoneIcon sx={{ color: '#71BC58', fontSize: '30px', mr: '5px' }} />
        <Typography sx={{ fontSize: '13px', fontWeight: '300' }}>
          Creating smart contracts without coding expertise.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
        <DoneIcon sx={{ color: '#71BC58', fontSize: '30px', mr: '5px' }} />
        <Typography sx={{ fontSize: '13px', fontWeight: '300' }}>
          Expert guidance and training programs.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
        <DoneIcon sx={{ color: '#71BC58', fontSize: '30px', mr: '5px' }} />
        <Typography sx={{ fontSize: '13px', fontWeight: '300' }}>
          Enhancing understanding and proficiency in decentralized technologies.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
        <DoneIcon sx={{ color: '#71BC58', fontSize: '30px', mr: '5px' }} />
        <Typography sx={{ fontSize: '13px', fontWeight: '300' }}>
          Comprehensive courses on various Web3 aspects.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
        <DoneIcon sx={{ color: '#71BC58', fontSize: '30px', mr: '5px' }} />
        <Typography sx={{ fontSize: '13px', fontWeight: '300' }}>
          Valuable skills to navigate the Web3 ecosystem successfully.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
        <DoneIcon sx={{ color: '#71BC58', fontSize: '30px', mr: '5px' }} />
        <Typography sx={{ fontSize: '13px', fontWeight: '300' }}>
          Suitable for beginners and experienced users.
        </Typography>
      </Box>
    </Box>
  );
}

export default Infos;
