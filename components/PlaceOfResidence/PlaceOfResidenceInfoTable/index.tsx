import React from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface Props {
  placeOfResidence: any;
  placeOfResidenceTableRef: any;
}

const PlaceOfResidenceInfoTable: React.FC<Props> = ({
  placeOfResidence,
  placeOfResidenceTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={placeOfResidenceTableRef}
      component={Paper}
      sx={{
        margin: "auto",
        width: "100%",
      }}
    >
      <Table
        aria-label="Place of Residence Info Table"
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
              <strong>Surname</strong>
            </TableCell>
            <TableCell>
              <strong>Type of Address</strong>
            </TableCell>
            <TableCell>
              <strong>Location of Address</strong>
            </TableCell>
            <TableCell>
              <strong>Is Current Address</strong>
            </TableCell>
            <TableCell>
              <strong>Settlement Date</strong>
            </TableCell>
            <TableCell>
              <strong>Leaving Date</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {placeOfResidence.placeOfResidenceInfos.map(
            (placeOfResidence: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{placeOfResidence.name}</TableCell>
                <TableCell>{placeOfResidence.surname}</TableCell>
                <TableCell>{placeOfResidence.typeOfAddress}</TableCell>
                <TableCell>{placeOfResidence.locationOfAddress}</TableCell>
                <TableCell>
                  {placeOfResidence.isCurrentAddress.toString()}
                </TableCell>
                <TableCell>{placeOfResidence.settlementDate}</TableCell>
                <TableCell>{placeOfResidence.leavingDate}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlaceOfResidenceInfoTable;
