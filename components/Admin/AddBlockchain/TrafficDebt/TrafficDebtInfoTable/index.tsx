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
import { TrafficDebtReturnType } from "@/types/TrafficDebt";

interface Props {
  trafficDebt: TrafficDebtReturnType;
  trafficDebtTableRef: any;
}

const TrafficDebtInfoTable: React.FC<Props> = ({
  trafficDebt,
  trafficDebtTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={trafficDebtTableRef}
      component={Paper}
      sx={{
        margin: "auto",
        width: "100%",
      }}
    >
      <Table
        aria-label="Traffic Debt Info Table"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Debt Payer</strong>
            </TableCell>
            <TableCell>
              <strong>Debt Amount</strong>
            </TableCell>
            <TableCell>
              <strong>Expiry Date</strong>
            </TableCell>
            <TableCell>
              <strong>License Plate</strong>
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
          {trafficDebt.trafficDebtInfos.map((trafficDebt: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{trafficDebt.debtPayer}</TableCell>
              <TableCell>{trafficDebt.debtAmount}</TableCell>
              <TableCell>{trafficDebt.expiryDate}</TableCell>
              <TableCell>{trafficDebt.licensePlate}</TableCell>
              <TableCell>{trafficDebt.isPaid.toString()}</TableCell>
              <TableCell>{trafficDebt.paymentDate}</TableCell>
              <TableCell>{trafficDebt.paymentAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrafficDebtInfoTable;
