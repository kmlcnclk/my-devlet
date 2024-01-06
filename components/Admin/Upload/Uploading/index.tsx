import React from 'react';

import { Box, Typography } from '@mui/material';

import Fonts from '@/constants/fonts';

import styles from '@/styles/Uploading.module.css';
import CircleLoadingIcon from '@/icons/CircleLoadingIcon';
import CircleFinishIcon from '@/icons/CircleFinishIcon';
import { File } from 'buffer';
import TickIcon from '@/icons/TickIcon';

interface Props {
  ratio: number;
  file: File;
}

const Uploading: React.FC<Props> = ({ ratio, file }: Props) => {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        {ratio <= 25 && (
          <Box
            sx={{
              position: 'absolute',
              right: '0px',
              top: '-1px',
              width: '70px',
              height: '80px',
              border: '4px solid #317DED',
              borderTopRightRadius: '85%',
              borderLeft: '0px',
              borderBottom: '0px',
            }}
          ></Box>
        )}
        {ratio > 25 && ratio <= 50 && (
          <Box
            sx={{
              position: 'absolute',
              right: '0px',
              width: '70px',
              height: '126px',
              borderTopRightRadius: '110px',
              borderBottomRightRadius: '110px',
              border: '4px solid #317DED',
              borderLeft: '0',
            }}
          ></Box>
        )}
        {ratio > 50 && ratio < 100 && (
          <Box className={styles.loadingIcon}>
            <CircleLoadingIcon />
          </Box>
        )}
        {ratio == 100 && (
          <Box
            sx={{
              position: 'absolute',
            }}
          >
            <CircleFinishIcon />
          </Box>
        )}

        <Box
          sx={{
            bgcolor: '#F3F8FF',
            border: 'solid 1px #91BCF6',
            width: '125px',
            height: '125px',
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            '&::before': {
              height: '10px',
              bgcolor: 'red',
            },
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: Fonts.BOLD,
              color: '#666666',
              mx: '5px',
              textAlign: 'center',
            }}
          >
            {ratio}%
          </Typography>
          <Typography
            sx={{
              fontSize: '10px',
              fontWeight: Fonts.REGULAR,
              color: '#666666',
              mt: '3px',
              mx: '5px',
              textAlign: 'center',
            }}
          >
            {file?.name}
          </Typography>
          {ratio == 100 && (
            <Box sx={{ mb: '-13px' }}>
              <TickIcon />
            </Box>
          )}
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: Fonts.SEMI_BOLD,
          mt: '32px',
          color: '#666666',
        }}
      >
        {ratio < 100 ? 'Uploading...' : 'Ready'}
      </Typography>
    </>
  );
};

export default Uploading;
