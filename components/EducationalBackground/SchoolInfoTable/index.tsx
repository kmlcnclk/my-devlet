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
  educationalBackground: any;
  educationTableRef: any;
}

const SchoolInfoTable: React.FC<Props> = ({
  educationalBackground,
  educationTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={educationTableRef}
      component={Paper}
      sx={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <Table
        aria-label="School Info Table"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Degree</strong>
            </TableCell>
            <TableCell>
              <strong>School Name</strong>
            </TableCell>
            <TableCell>
              <strong>Started Year</strong>
            </TableCell>
            <TableCell>
              <strong>Graduation Year</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {educationalBackground.schoolInfos.map((school: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{school.degree}</TableCell>
              <TableCell>{school.schoolName}</TableCell>
              <TableCell>{school.startedYear}</TableCell>
              <TableCell>{school.graduationYear}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SchoolInfoTable;
