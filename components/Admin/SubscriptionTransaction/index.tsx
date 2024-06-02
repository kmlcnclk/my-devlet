import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SubscriptionTransactionInfos from "./SubscriptionTransactionInfos";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { toast } from "react-toastify";
import Upload from "../Upload";
import { File } from "buffer";
import Fonts from "@/constants/fonts";
import { createXLSXFileForSubscriptionTransaction } from "@/lib/xlsxFileCreators";
import { createCSVFileForSubscriptionTransaction } from "@/lib/csvFileCreators";
import { createJSONFileForSubscriptionTransaction } from "@/lib/jsonFileCreators";
import SelectUserModal from "../SelectUserModal";
import { ReturnedUserType } from "@/types/User";
import { fetchUsers } from "../FetchUsers";

function SubscriptionTransaction() {
  const [userId, setUserId] = useState<string>("");
  const [subscriptionTransactionInfos, setSubscriptionTransactionInfos] =
    useState<any>([]);
  const [isUserSelected, setIsUserSelected] = useState<boolean>(false);
  const [users, setUsers] = useState<ReturnedUserType[]>([]);
  const [userName, setUserName] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);

  const [ratio, setRatio] = useState<number>(0);

  const [xlsxFileURL, setXLSXFileURL] = useState<string>("");
  const [csvFileURL, setCSVFileURL] = useState<string>("");
  const [jsonFileURL, setJSONFileURL] = useState<string>("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (typeof window != "undefined") {
      const { url: xlsxURL } = createXLSXFileForSubscriptionTransaction();
      const { url: csvURL } = createCSVFileForSubscriptionTransaction();
      const { url: jsonURL } = createJSONFileForSubscriptionTransaction();

      setXLSXFileURL(xlsxURL);
      setCSVFileURL(csvURL);
      setJSONFileURL(jsonURL);
    }
  }, []);

  return (
    <Box
      id="title-inputs"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          my: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "flex-start" },
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: "500", fontSize: { xs: "14px", sm: "18px" } }}
          >
            User Name:
          </Typography>
          <Box
            component="input"
            required
            value={userName}
            onChange={(e: any) => setUserName(e.target.value)}
            sx={{
              height: "40px",
              width: "100%",
              bgcolor: "#F8F9F8",
              color: "#666666",
              border: "0.2px solid #8F8F8F",
              boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              px: "15px",
              "&:focus": {
                outline: "none",
              },
            }}
          />
        </Box>

        <Button
          onClick={async () => {
            if (userName) {
              await fetchUsers(userName, setUsers, handleOpen);
            } else {
              toast.info("You have to write user's name");
            }
          }}
          type="button"
          sx={{
            ml: { xs: "0px", sm: "20px" },
            color: "#FFFDFF",
            fontWeight: "500",
            fontSize: "15px",
            height: "40px",
            width: { xs: "100%", sm: "49%" },
            mt: "27px",
            borderRadius: { xs: "10px", sm: "15px" },
            bgcolor: "#317DED",
            border: "2px solid #317DED",
            boxShadow: "0px 4px 10px 0px #00000040",
            "&:hover": {
              scale: "1.02",
              transition: "transform 0.3s ease",
            },
          }}
          variant="contained"
        >
          Search
        </Button>
      </Box>
      {subscriptionTransactionInfos.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            margin: "auto",
            width: "100%",
            overflowX: "scroll",
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
              {subscriptionTransactionInfos.map(
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
                    <TableCell>
                      {subscriptionTransaction.subscriberName}
                    </TableCell>
                    <TableCell>
                      {subscriptionTransaction.subscriberSurname}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}

      <Box
        sx={{
          height: { xs: "auto", md: "130px" },
          bgcolor: "#f3f3f3",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          p: "20px",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "20px",
          mt: "20px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mt: { xs: "10px", md: "0px" },
          }}
        >
          <Typography
            sx={{
              color: "#333",
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: Fonts.REGULAR,
            }}
          >
            CSV File
          </Typography>
          <a
            href={csvFileURL}
            download="my-devlet-sample.csv"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              sx={{
                color: "#FFFDFF",
                fontWeight: "500",
                height: "40px",
                display: "inline",
                borderRadius: "15px",
                bgcolor: "#317DED",
                border: "2px solid #317DED",
                boxShadow: "0px 4px 10px 0px #00000040",
                "&:hover": {
                  scale: "1.02",
                  transition: "transform 0.3s ease",
                },
              }}
              variant="contained"
            >
              <Typography
                sx={{
                  color: "#f3f3f3",
                  fontSize: { xs: "11px", sm: "13px" },
                  fontWeight: Fonts.REGULAR,
                }}
              >
                Download Your Sample File
              </Typography>
            </Button>
          </a>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mt: { xs: "20px", md: "0px" },
          }}
        >
          <Typography
            sx={{
              color: "#333",
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: Fonts.REGULAR,
            }}
          >
            Excel File
          </Typography>
          <a
            href={xlsxFileURL}
            download="my-devlet-sample.xlsx"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              sx={{
                color: "#FFFDFF",
                fontWeight: "500",
                height: "40px",
                display: "inline",
                borderRadius: "15px",
                bgcolor: "#317DED",
                border: "2px solid #317DED",
                boxShadow: "0px 4px 10px 0px #00000040",
                "&:hover": {
                  scale: "1.02",
                  transition: "transform 0.3s ease",
                },
              }}
              variant="contained"
            >
              <Typography
                sx={{
                  color: "#f3f3f3",
                  fontSize: { xs: "11px", sm: "13px" },
                  fontWeight: Fonts.REGULAR,
                }}
              >
                Download Your Sample File
              </Typography>
            </Button>
          </a>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            mt: { xs: "20px", md: "0px" },
          }}
        >
          <Typography
            sx={{
              color: "#333",
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: Fonts.REGULAR,
            }}
          >
            JSON File
          </Typography>
          <a
            href={jsonFileURL}
            download="my-devlet-sample.json"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              sx={{
                color: "#FFFDFF",
                fontWeight: "500",
                height: "40px",
                display: "inline",
                borderRadius: "15px",
                bgcolor: "#317DED",
                border: "2px solid #317DED",
                boxShadow: "0px 4px 10px 0px #00000040",
                "&:hover": {
                  scale: "1.02",
                  transition: "transform 0.3s ease",
                },
              }}
              variant="contained"
            >
              <Typography
                sx={{
                  color: "#f3f3f3",
                  fontSize: { xs: "11px", sm: "13px" },
                  fontWeight: Fonts.REGULAR,
                }}
              >
                Download Your Sample File
              </Typography>
            </Button>
          </a>
        </Box>
      </Box>
      <Upload
        {...{
          file,
          setFile,
          setRatio,
          ratio,
        }}
        whichProperty="subscriptionTransaction"
        setFileData={setSubscriptionTransactionInfos}
      />
      <Typography
        sx={{
          color: "#666",
          fontWeight: 600,
          fontSize: "18px",
          mt: { xs: "14px", md: "30px" },
        }}
      >
        or
      </Typography>
      <SubscriptionTransactionInfos
        {...{
          subscriptionTransactionInfos,
          setSubscriptionTransactionInfos,
          userId,
          isUserSelected,
          setFile,
          setRatio,
        }}
      />

      <SelectUserModal
        {...{ handleClose, users, open, userId, setUserId, setIsUserSelected }}
      />
    </Box>
  );
}

export default SubscriptionTransaction;
