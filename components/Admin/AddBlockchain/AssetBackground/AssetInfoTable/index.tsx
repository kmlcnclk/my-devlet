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
  assetBackground: any;
  assetTableRef: any;
}

const AssetInfoTable: React.FC<Props> = ({
  assetBackground,
  assetTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={assetTableRef}
      component={Paper}
      sx={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <Table
        aria-label="Asset Info Table"
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
              <strong>Type of Asset</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
            <TableCell>
              <strong>Location</strong>
            </TableCell>
            <TableCell>
              <strong>Purchase Date</strong>
            </TableCell>
            <TableCell>
              <strong>Purchase Price</strong>
            </TableCell>
            <TableCell>
              <strong>Previous Owner</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assetBackground.assetInfos.map((school: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{school.name}</TableCell>
              <TableCell>{school.typeOfAsset}</TableCell>
              <TableCell>{school.description}</TableCell>
              <TableCell>{school.location}</TableCell>
              <TableCell>{school.purchaseDate}</TableCell>
              <TableCell>{school.purchasePrice}</TableCell>
              <TableCell>{school.previousOwner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssetInfoTable;
