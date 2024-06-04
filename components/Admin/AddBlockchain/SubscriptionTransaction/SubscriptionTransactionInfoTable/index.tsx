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
  subscriptionTransaction: any;
  subscriptionTransactionTableRef: any;
}

const SubscriptionTransactionInfoTable: React.FC<Props> = ({
  subscriptionTransaction,
  subscriptionTransactionTableRef,
}: Props) => {
  return (
    <TableContainer
      ref={subscriptionTransactionTableRef}
      component={Paper}
      sx={{
        margin: "auto",
        width: "100%",
      }}
    >
      <Table
        aria-label="Subscription Transaction Info Table"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Subscription Type</strong>
            </TableCell>
            <TableCell>
              <strong>Company&apos;s Name</strong>
            </TableCell>
            <TableCell>
              <strong>Subscription Start Date</strong>
            </TableCell>
            <TableCell>
              <strong>Subscription End Date</strong>
            </TableCell>
            <TableCell>
              <strong>Subscriber Name</strong>
            </TableCell>
            <TableCell>
              <strong>Subscriber Surname</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptionTransaction.subscriptionTransactionInfos.map(
            (subscriptionTransaction: any, index: any) => (
              <TableRow key={index}>
                <TableCell>
                  {subscriptionTransaction.subscriptionType}
                </TableCell>
                <TableCell>{subscriptionTransaction.companyName}</TableCell>
                <TableCell>
                  {subscriptionTransaction.subscriptionStartDate}
                </TableCell>
                <TableCell>
                  {subscriptionTransaction.subscriptionEndDate}
                </TableCell>
                <TableCell>{subscriptionTransaction.subscriberName}</TableCell>
                <TableCell>
                  {subscriptionTransaction.subscriberSurname}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscriptionTransactionInfoTable;
