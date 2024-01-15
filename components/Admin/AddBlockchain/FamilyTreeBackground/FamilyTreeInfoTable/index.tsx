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
  familyTreeBackground: any;
  familyTreeTableRef: any;
}

const FamilyTreeInfoTable: React.FC<Props> = ({
  familyTreeBackground,
  familyTreeTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={familyTreeTableRef}
      component={Paper}
      sx={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <Table
        aria-label="Family Tree Info Table"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Sequence Number</strong>
            </TableCell>
            <TableCell>
              <strong>Gender</strong>
            </TableCell>
            <TableCell>
              <strong>Degree of Relationship</strong>
            </TableCell>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Surname</strong>
            </TableCell>
            <TableCell>
              <strong>Father&apos;s Name</strong>
            </TableCell>
            <TableCell>
              <strong>Mother&apos;s Name</strong>
            </TableCell>
            <TableCell>
              <strong>Place of Birth</strong>
            </TableCell>
            <TableCell>
              <strong>Date of Birth</strong>
            </TableCell>
            <TableCell>
              <strong>City District Neighbourhood/Village</strong>
            </TableCell>
            <TableCell>
              <strong>Marital Status</strong>
            </TableCell>
            <TableCell>
              <strong>Status</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {familyTreeBackground.familyTreeInfos.map(
            (familyTree: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{familyTree.sequenceNumber}</TableCell>
                <TableCell>{familyTree.gender}</TableCell>
                <TableCell>{familyTree.degreeOfRelationship}</TableCell>
                <TableCell>{familyTree.name}</TableCell>
                <TableCell>{familyTree.surname}</TableCell>
                <TableCell>{familyTree.fathersName}</TableCell>
                <TableCell>{familyTree.mothersName}</TableCell>
                <TableCell>{familyTree.placeOfBirth}</TableCell>
                <TableCell>{familyTree.dateOfBirth}</TableCell>
                <TableCell>
                  {familyTree.cityDistrictNeighbourhoodVillage}
                </TableCell>
                <TableCell>{familyTree.maritalStatus}</TableCell>
                <TableCell>
                  {familyTree.status} / {familyTree.dateOfDeath}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FamilyTreeInfoTable;
