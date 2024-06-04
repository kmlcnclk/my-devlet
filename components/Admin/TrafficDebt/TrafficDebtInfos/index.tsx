import { getAdminAccessTokenFromLocalStorage } from "@/localstorage/adminAccessTokenStorage";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  trafficDebtInfos: any;
  setTrafficDebtInfos: Function;
  userId: string;
  isUserSelected: boolean;
  setFile: Function;
  setRatio: Function;
}

const TrafficDebtInfos: React.FC<Props> = ({
  trafficDebtInfos,
  setTrafficDebtInfos,
  userId,
  isUserSelected,
  setFile,
  setRatio,
}: Props) => {
  const [debtPayer, setDebtPayer] = useState("");
  const [debtAmount, setDebtAmount] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const submitTrafficDebtInfos = async (e: any) => {
    e.preventDefault();

    if (isUserSelected) {
      if (trafficDebtInfos.length > 0) {
        setIsLoading(true);
        const trafficDebtData = {
          userId,
          trafficDebtInfos: trafficDebtInfos,
        };

        const res = await fetch("/api/admin/trafficDebt/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(trafficDebtData),
        });

        const data = await res.json();
        if (res.ok) {
          setIsLoading(false);
          toast.success(data.message);
        } else {
          if (data?.error?.message === "User has already traffic debt infos") {
            const trafficDebtData = {
              userId,
              trafficDebtInfos: trafficDebtInfos,
            };

            const res = await fetch("/api/admin/trafficDebt/update", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
              },
              body: JSON.stringify(trafficDebtData),
            });

            const data = await res.json();

            if (res.ok) {
              setIsLoading(false);
              toast.success(data.message);
            } else {
              setIsLoading(false);
              if (data?.message) toast.error(data.message);
              else if (data?.error) toast.error(data.error.message);
              else if (data[0]) toast.error(data[0].message);
            }
          } else if (data?.message) toast.error(data.message);
          else if (data?.error) toast.error(data.error.message);
          else if (data[0]) toast.error(data[0].message);
          setIsLoading(false);
        }
        setDebtPayer("");
        setDebtAmount(0);
        setExpiryDate("");
        setLicensePlate("");
        setIsPaid(false);
        setPaymentAmount(0);
        setPaymentDate("");
        setFile(null);
        setTrafficDebtInfos([]);
        setRatio(0);
      } else {
        toast.info("You have to enter at least one trafficDebt info");
      }
    } else {
      toast.info("You have to enter a user id");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitTrafficDebtInfos}
      sx={{
        mt: "30px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "flex-start" },
            flexDirection: "column",
            width: { xs: "100%", sm: "49%" },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: "500", fontSize: { xs: "14px", sm: "18px" } }}
          >
            Debt Payer
          </Typography>
          <Box
            component="input"
            value={debtPayer}
            onChange={(e: any) => setDebtPayer(e.target.value)}
            sx={{
              width: "100%",
              height: "40px",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "flex-start" },
            flexDirection: "column",
            width: { xs: "100%", sm: "49%" },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: "500", fontSize: { xs: "14px", sm: "18px" } }}
          >
            Debt Amount
          </Typography>
          <Box
            component="input"
            type="number"
            value={debtAmount}
            onChange={(e: any) => setDebtAmount(e.target.value)}
            sx={{
              width: "100%",
              height: "40px",
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
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          mt: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "flex-start" },
            flexDirection: "column",
            width: { xs: "100%" },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: "500", fontSize: { xs: "14px", sm: "18px" } }}
          >
            License Plate
          </Typography>
          <Box
            component="input"
            value={licensePlate}
            onChange={(e: any) => setLicensePlate(e.target.value)}
            sx={{
              width: "100%",
              height: "40px",
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
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          mt: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "flex-start" },
            flexDirection: "column",
            width: { xs: "100%", sm: "49%" },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: "500", fontSize: { xs: "14px", sm: "18px" } }}
          >
            Payment Amount
          </Typography>
          <Box
            component="input"
            type="number"
            value={paymentAmount}
            onChange={(e: any) => setPaymentAmount(e.target.value)}
            sx={{
              width: "100%",
              height: "40px",
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: { xs: "100%", sm: "49%" },
          }}
        >
          <DatePicker
            label="Expiry Date"
            value={expiryDate}
            onChange={(e: any) => {
              setExpiryDate(new Date(e).toString());
            }}
          />
          <DatePicker
            label="Payment Date"
            value={paymentDate}
            onChange={(e: any) => setPaymentDate(new Date(e).toString())}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mx: "10px",
            }}
          >
            <Typography
              className="titles-label"
              sx={{ fontWeight: "500", fontSize: { xs: "14px" } }}
            >
              Is Paid?
            </Typography>
            <Checkbox
              value={isPaid}
              onChange={(e) => {
                setIsPaid(e.target.checked);
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
        }}
      >
        <Button
          onClick={() => {
            setTrafficDebtInfos((prev: any) => {
              const updatedPrev = [...prev];
              const data = {
                debtPayer,
                debtAmount: Number(debtAmount),
                expiryDate,
                licensePlate,
                isPaid,
                paymentAmount: Number(paymentAmount),
                paymentDate,
              };
              updatedPrev.push(data);
              return updatedPrev;
            });
            setDebtPayer("");
            setDebtAmount(0);
            setExpiryDate("");
            setLicensePlate("");
            setIsPaid(false);
            setPaymentAmount(0);
            setPaymentDate("");
          }}
          type="button"
          sx={{
            color: "#FFFDFF",
            fontWeight: "500",
            fontSize: "15px",
            height: { xs: "40px", sm: "50px" },
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
          Add
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          sx={{
            color: "#FFFDFF",
            fontWeight: "500",
            fontSize: "15px",
            height: { xs: "40px", sm: "50px" },
            width: { xs: "100%", sm: "49%" },
            mt: "27px",
            borderRadius: { xs: "10px", sm: "15px" },
            bgcolor: "#24b307",
            border: "2px solid #24b307",
            boxShadow: "0px 4px 10px 0px #00000040",
            "&:active": {
              bgcolor: "#24b307",
            },
            "&:hover": {
              scale: "1.02",
              bgcolor: "#24b307",
              transition: "transform 0.3s ease",
            },
          }}
          variant="contained"
        >
          {isLoading ? (
            <CircularProgress size={25} sx={{ color: "#24b307" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default TrafficDebtInfos;
