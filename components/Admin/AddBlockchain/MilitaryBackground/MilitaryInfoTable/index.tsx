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
  militaryBackground: any;
  militaryTableRef: any;
}

const MilitaryInfoTable: React.FC<Props> = ({
  militaryBackground,
  militaryTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={militaryTableRef}
      component={Paper}
      sx={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <Table
        aria-label="Military Info Table"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Date of Birth</strong>
            </TableCell>
            <TableCell>
              <strong>State of Military</strong>
            </TableCell>
            <TableCell>
              <strong>Postponement Date</strong>
            </TableCell>
            <TableCell>
              <strong>Date of Construction</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {militaryBackground.militaryInfos.map((military: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{military.name}</TableCell>
              <TableCell>{military.dateOfBirth}</TableCell>
              <TableCell>{military.stateOfMilitary}</TableCell>
              <TableCell>{military.postponementDate}</TableCell>
              <TableCell>{military.dateOfConstruction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MilitaryInfoTable;
