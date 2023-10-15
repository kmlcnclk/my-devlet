import React from 'react';
import { Box, Typography } from '@mui/material';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface Props {
  ratio: number;
}

const SecondOnBoarding: React.FC<Props> = ({ ratio }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#edebeb',
          p: { xs: '25px', md: '40px' },
          borderRadius: '20px',
          width: '400px',
          height: 'auto',
          boxShadow:
            '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);',
        }}
      >
        <Box
          component="img"
          src="/images/neu.png"
          sx={{ width: '90px', objectFit: 'contain', mb: '10px' }}
        />
        <Typography
          className={inter.className}
          sx={{
            textAlign: 'center',
            color: '#333',
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 600,
          }}
        >
          Sit tight,
        </Typography>
        <Typography
          className={inter.className}
          sx={{
            textAlign: 'center',
            color: '#333',
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 600,
          }}
        >
          Please wait patiently while we build your Smart Contract!
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            my: '10px',
          }}
        >
          <Box
            sx={{
              border: 'solid 0.2px #8F8F8F',
              bgcolor: '#F8F9F8',
              borderRadius: '5px',
              height: '30px',
              width: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                background:
                  'linear-gradient(90deg, #e809d9 2.08%, #730b6c 100%)',
                borderRadius: '5px',
                height: '30px',
                width: `${ratio}%`,
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></Box>
            <Typography
              className={inter.className}
              sx={{
                position: 'absolute',
                left: { xs: '37%', sm: '42%' },
                fontWeight: '600',
                ml: '11px',
                fontSize: '14px',
                color: ratio < 50 ? '#333' : '#f3f3f3',
              }}
            >
              %{ratio}
            </Typography>
          </Box>
        </Box>

        <Typography
          className={inter.className}
          sx={{
            color: '#666',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          2 of 2: Applying store settings
        </Typography>
      </Box>
    </Box>
  );
};

export default SecondOnBoarding;
