import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TaxDebtInfos from './TaxDebtInfos';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { toast } from 'react-toastify';

function TaxDebt() {
  const [userId, setUserId] = useState<string>('');
  const [taxDebtInfos, setTaxDebtInfos] = useState<any>([]);
  const [isUserSelected, setIsUserSelected] = useState<boolean>(false);

  return (
    <Box
      id="title-inputs"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          my: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'flex-start' },
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            User Id:
          </Typography>
          <Box
            component="input"
            required
            disabled={Boolean(userId) && isUserSelected}
            value={userId}
            onChange={(e: any) => setUserId(e.target.value)}
            sx={{
              height: '40px',
              width: '100%',
              bgcolor: '#F8F9F8',
              color: '#666666',
              border: '0.2px solid #8F8F8F',
              boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              px: '15px',
              '&:focus': {
                outline: 'none',
              },
            }}
          />
        </Box>

        <Button
          onClick={() => {
            if (userId) {
              setIsUserSelected(true);
            } else {
              toast.info('You have to enter an user id');
            }
          }}
          type="button"
          sx={{
            ml: { xs: '0px', sm: '20px' },
            color: '#FFFDFF',
            fontWeight: '500',
            fontSize: '15px',
            height: '40px',
            width: { xs: '100%', sm: '49%' },
            mt: '27px',
            borderRadius: { xs: '10px', sm: '15px' },
            bgcolor: '#317DED',
            border: '2px solid #317DED',
            boxShadow: '0px 4px 10px 0px #00000040',
            '&:hover': {
              scale: '1.02',
              transition: 'transform 0.3s ease',
            },
          }}
          variant="contained"
        >
          Select
        </Button>
      </Box>
      {taxDebtInfos.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            margin: 'auto',
            width: '100%',
          }}
        >
          <Table
            aria-label="TaxDebt Info Table"
            sx={{
              minWidth: 650,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Taxpayer</strong>
                </TableCell>
                <TableCell>
                  <strong>Debt Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Expiry Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Type of Tax</strong>
                </TableCell>
                <TableCell>
                  <strong>Is Paid</strong>
                </TableCell>
                <TableCell>
                  <strong>Payment Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Payment Amount</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxDebtInfos.map((taxDebt: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{taxDebt.taxpayer}</TableCell>
                  <TableCell>{taxDebt.debtAmount}</TableCell>
                  <TableCell>{taxDebt.expiryDate}</TableCell>
                  <TableCell>{taxDebt.typeOfTax}</TableCell>
                  <TableCell>{taxDebt.isPaid.toString()}</TableCell>
                  <TableCell>{taxDebt.paymentDate}</TableCell>
                  <TableCell>{taxDebt.paymentAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}

      <TaxDebtInfos
        {...{ taxDebtInfos, setTaxDebtInfos, userId, isUserSelected }}
      />
    </Box>
  );
}

export default TaxDebt;
