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
  hospitalBackground: any;
  hospitalTableRef: any;
}

const HospitalInfoTable: React.FC<Props> = ({
  hospitalBackground,
  hospitalTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={hospitalTableRef}
      component={Paper}
      sx={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <Table
        aria-label="Hospital Info Table"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Hospital Name</strong>
            </TableCell>
            <TableCell>
              <strong>Doctor Name</strong>
            </TableCell>
            <TableCell>
              <strong>Disease Name</strong>
            </TableCell>
            <TableCell>
              <strong>Symptoms</strong>
            </TableCell>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hospitalBackground.diseaseInfos.map((school: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{school.hospitalName}</TableCell>
              <TableCell>{school.doctorName}</TableCell>
              <TableCell>{school.name}</TableCell>
              <TableCell>{school.symptoms}</TableCell>
              <TableCell>{school.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HospitalInfoTable;
