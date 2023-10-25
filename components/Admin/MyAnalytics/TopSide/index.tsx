import React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import GridItem from './GridItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { SmartContractReturnType } from '@/types/SmartContract';

function TopSide() {
  const smartContracts: SmartContractReturnType[] = useSelector(
    (state: RootState) => state.smartContractForAdmin.values
  ) as SmartContractReturnType[];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={3}>
        <GridItem
          bgColor="#D8F1D3"
          label="Smart Contracts"
          value={smartContracts.length.toString() ?? '0'}
          percentage="0.7"
        />
      </Grid>
    </Box>
  );
}

export default TopSide;
