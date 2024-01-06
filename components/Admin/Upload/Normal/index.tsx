import React from 'react';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import Fonts from '@/constants/fonts';
import MouseIcon from '@/icons/MouseIcon';

interface Props {
  inputRef: any;
}

const Normal: React.FC<Props> = ({ inputRef }: Props) => {
  return (
    <>
      <Box
        sx={{
          color: '#A39E9E',
          width: '100%',
          textAlign: 'center',
          fontWeight: Fonts.SEMI_BOLD,
          fontSize: '15px',
          cursor: 'pointer',
          mb: '17px',
        }}
      >
        Drag or
        <Typography
          onClick={() => inputRef?.current?.click()}
          sx={{
            display: 'inline-block',
            ml: '5px',
            color: '#2F80ED',
          }}
        >
          Browse
        </Typography>
      </Box>
      <Box
        sx={{
          border: 'solid 1px #91BCF6',
          borderRadius: '100%',
          width: '125px',
          height: '125px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F3F8FF',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            border: 'dashed 0.5px #A39E9E',
            borderRadius: '4px',
            width: '65px',
            height: '37px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            position: 'absolute',
            left: '21%',
            top: '32%',
          }}
        >
          <Box
            sx={{
              border: 'solid 0.5px #A39E9E',
              borderRadius: '4px',
              width: '65px',
              height: '37px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#E7F1FF',
              justifyContent: 'center',
              position: 'absolute',
              left: '16%',
              top: '26%',
              '& .mouse-icon': {
                mb: '8px',
              },
            }}
          >
            <MouseIcon />
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          color: '#666',
          fontWeight: Fonts.SEMI_BOLD,
          fontSize: '13px',
          mt: '14px',
        }}
      >
        Upload Excel File
      </Typography>
      <Typography
        sx={{
          color: '#2F80ED',
          fontWeight: Fonts.REGULAR,
          fontSize: '13px',
          mt: '14px',
        }}
      >
        Max size: 200 MB
      </Typography>
    </>
  );
};

export default Normal;
