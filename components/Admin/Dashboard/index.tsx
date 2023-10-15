import React from 'react';

import Box from '@mui/material/Box';
import Card1 from './Card1';
import NftInfo from './NftInfo';

import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from '@mui/material';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={'/images/dashboard-home-image.jpg'}
          sx={{
            width: '100%',
            minHeight: '180px',
            objectFit: 'cover',
            objectPosition: 'left',
            borderRadius: '20px',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: '0px',
            p: '20px',
          }}
        >
          <Typography
            className={inter.className}
            sx={{
              color: '#FFFBFB',
              fontSize: { xs: '20px', lg: '30px' },
              fontWeight: '700',
              ml: '9px',
            }}
          >
            Welcome to Future
          </Typography>

          <Typography
            sx={{
              color: '#FFFBFB',
              fontSize: { xs: '11px', lg: '13px' },
              fontWeight: '400',
              ml: '9px',
              mt: { xs: '12px', sm: '18px' },
            }}
            className={inter.className}
          >
            You have gained early access to My Devlet's unique Web3.0 technology
            solutions.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronRightIcon
              sx={{
                width: '32px',
                height: '32px',
                color: '#f3f3f3',
                mt: { xs: '9px', sm: '17px' },
              }}
            />
            <Typography
              sx={{
                color: '#FFFBFB',
                fontSize: { xs: '13px', lg: '16px' },
                fontWeight: '500',
                mt: { xs: '9px', sm: '16px' },
              }}
              className={inter.className}
            >
              <strong>Join </strong>
              for early access benefits
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center',
            lg: 'space-evenly',
          },
          flexWrap: 'wrap',
          mb: '40px',
        }}
      >
        <Card1 />
      </Box>

      <NftInfo />
    </Box>
  );
}

export default Dashboard;
