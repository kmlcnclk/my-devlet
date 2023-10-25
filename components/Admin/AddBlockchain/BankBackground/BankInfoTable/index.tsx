import React from 'react';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

interface Props {
  bankBackground: any;
  bankTableRef: any;
}

const BankInfoTable: React.FC<Props> = ({
  bankBackground,
  bankTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={bankTableRef}
      component={Paper}
      sx={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <Table
        aria-label="Bank Info Table"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Bank Name</strong>
            </TableCell>
            <TableCell>
              <strong>Account Balance</strong>
            </TableCell>
            <TableCell>
              <strong>Account Number</strong>
            </TableCell>
            <TableCell>
              <strong>Account Type</strong>
            </TableCell>
            <TableCell>
              <strong>Account Opening Date</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bankBackground.bankInfos.map((school: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{school.bankName}</TableCell>
              <TableCell>{school.accountBalance}</TableCell>
              <TableCell>{school.accountNumber}</TableCell>
              <TableCell>{school.accountType}</TableCell>
              <TableCell>{school.accountOpeningDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BankInfoTable;
