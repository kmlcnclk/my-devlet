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
  taxDebt: any;
  taxDebtTableRef: any;
}

const TaxDebtInfoTable: React.FC<Props> = ({
  taxDebt,
  taxDebtTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={taxDebtTableRef}
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
          {taxDebt.taxDebtInfos.map((taxDebt: any, index: any) => (
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
  );
};

export default TaxDebtInfoTable;
