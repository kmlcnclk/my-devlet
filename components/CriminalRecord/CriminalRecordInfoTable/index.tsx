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
  criminalRecord: any;
  criminalRecordTableRef: any;
}

const CriminalRecordInfoTable: React.FC<Props> = ({
  criminalRecord,
  criminalRecordTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={criminalRecordTableRef}
      component={Paper}
      sx={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <Table
        aria-label="Criminal Record Info Table"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Case Number</strong>
            </TableCell>
            <TableCell>
              <strong>Court</strong>
            </TableCell>
            <TableCell>
              <strong>Prosecutor</strong>
            </TableCell>
            <TableCell>
              <strong>Incident Date</strong>
            </TableCell>
            <TableCell>
              <strong>Trial Outcome</strong>
            </TableCell>
            <TableCell>
              <strong>Evidence</strong>
            </TableCell>
            <TableCell>
              <strong>Lawyers</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {criminalRecord.criminalRecordInfos.map(
            (criminalRecord: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{criminalRecord.caseNumber}</TableCell>
                <TableCell>{criminalRecord.court}</TableCell>
                <TableCell>{criminalRecord.prosecutor}</TableCell>
                <TableCell>{criminalRecord.incidentDate}</TableCell>
                <TableCell>{criminalRecord.trialOutcome}</TableCell>
                <TableCell>{criminalRecord.evidence}</TableCell>
                <TableCell>{criminalRecord.lawyers}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CriminalRecordInfoTable;
