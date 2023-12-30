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
  notary: any;
  notaryTableRef: any;
}

const NotaryInfoTable: React.FC<Props> = ({
  notary,
  notaryTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={notaryTableRef}
      component={Paper}
      sx={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <Table
        aria-label="Notary Info Table"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Notary Name</strong>
            </TableCell>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
            <TableCell>
              <strong>Type of Document</strong>
            </TableCell>
            <TableCell>
              <strong>Parties Involved</strong>
            </TableCell>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notary.notaryInfos.map((notary: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{notary.notaryName}</TableCell>
              <TableCell>{notary.title}</TableCell>
              <TableCell>{notary.description}</TableCell>
              <TableCell>{notary.typeOfDocument}</TableCell>
              <TableCell>{notary.partiesInvolved}</TableCell>
              <TableCell>{notary.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotaryInfoTable;
