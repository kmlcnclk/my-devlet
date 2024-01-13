import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Button, Grid } from '@mui/material';

function Card1() {
  return (
    <Box
      sx={{
        minHeight: '210px',
        bgcolor: '#F2FDFF',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: '30px',
        mt: '40px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          mb: '5px',
        }}
      >
        <Typography
          sx={{ color: '#666666', fontSize: '20px', fontWeight: '600' }}
        >
          Create a Smart Contract
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          mt: '20px',
        }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Link href="/admin/dashboard/smart-contract">
              <Button
                sx={{
                  color: '#FFFDFF',
                  fontWeight: '500',
                  fontSize: '15px',
                  height: '45px',
                  width: '100%',
                  borderRadius: '10px',

                  border: '2px solid #d946ef',
                  boxShadow: '0px 4px 10px 0px #00000040',
                  background: '#d946ef',
                  '&:hover': {
                    background: '#c026d3',
                  },
                }}
                variant="contained"
              >
                <Typography sx={{ fontSize: '14px', textDecoration: 'none' }}>
                  Create Smart Contract
                </Typography>
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Card1;
