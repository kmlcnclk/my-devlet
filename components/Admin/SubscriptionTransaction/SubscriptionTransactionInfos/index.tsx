import { getAdminAccessTokenFromLocalStorage } from "@/localstorage/adminAccessTokenStorage";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  subscriptionTransactionInfos: any;
  setSubscriptionTransactionInfos: Function;
  userId: string;
  isUserSelected: boolean;
  setFile: Function;
  setRatio: Function;
}

const SubscriptionTransactionInfos: React.FC<Props> = ({
  subscriptionTransactionInfos,
  setSubscriptionTransactionInfos,
  userId,
  isUserSelected,
  setFile,
  setRatio,
}: Props) => {
  const [subscriptionType, setSubscriptionType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [subscriptionStartDate, setSubscriptionStartDate] = useState("");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState("");
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberSurname, setSubscriberSurname] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const submitSubscriptionTransactionInfos = async (e: any) => {
    e.preventDefault();

    if (isUserSelected) {
      if (subscriptionTransactionInfos.length > 0) {
        setIsLoading(true);
        const subscriptionTransactionData = {
          userId,
          subscriptionTransactionInfos,
        };

        const res = await fetch("/api/admin/subscriptionTransaction/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(subscriptionTransactionData),
        });

        const data = await res.json();
        if (res.ok) {
          setIsLoading(false);
          toast.success(data.message);
        } else {
          if (
            data?.error?.message ===
            "User has already Subscription Transaction infos"
          ) {
            const subscriptionTransactionData = {
              userId,
              subscriptionTransactionInfos,
            };

            const res = await fetch(
              "/api/admin/subscriptionTransaction/update",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
                },
                body: JSON.stringify(subscriptionTransactionData),
              }
            );

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
        setSubscriptionType("");
        setCompanyName("");
        setSubscriptionStartDate("");
        setSubscriptionEndDate("");
        setSubscriberName("");
        setSubscriberSurname("");
        setFile(null);
        setSubscriptionTransactionInfos([]);
        setRatio(0);
      } else {
        toast.info(
          "You have to enter at least one Subscription Transaction info"
        );
      }
    } else {
      toast.info("You have to enter a user id");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitSubscriptionTransactionInfos}
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
            width: { xs: "100%", md: "49%" },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: "500", fontSize: { xs: "14px", sm: "18px" } }}
          >
            Subscription Type
          </Typography>
          <Box
            component="input"
            value={subscriptionType}
            onChange={(e: any) => setSubscriptionType(e.target.value)}
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
            width: { xs: "100%", md: "49%" },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: "500", fontSize: { xs: "14px", sm: "18px" } }}
          >
            Company Name
          </Typography>
          <Box
            component="input"
            value={companyName}
            onChange={(e: any) => setCompanyName(e.target.value)}
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "flex-start" },
            flexDirection: "column",
            width: { xs: "100%", md: "49%" },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: "500", fontSize: { xs: "14px", sm: "18px" } }}
          >
            Subscriber Name
          </Typography>
          <Box
            component="input"
            value={subscriberName}
            onChange={(e: any) => setSubscriberName(e.target.value)}
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
            width: { xs: "100%", md: "49%" },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: "500", fontSize: { xs: "14px", sm: "18px" } }}
          >
            Subscriber Surname
          </Typography>
          <Box
            component="input"
            value={subscriberSurname}
            onChange={(e: any) => setSubscriberSurname(e.target.value)}
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
        <DatePicker
          label="Subscription Start Date"
          value={subscriptionStartDate}
          onChange={(e: any) => {
            setSubscriptionStartDate(new Date(e).toString());
          }}
          sx={{
            width: "100%",
            mt: { xs: "30px", sm: "0px" },
          }}
        />
        <DatePicker
          label="Subscription End Date"
          value={subscriptionEndDate}
          onChange={(e: any) => {
            setSubscriptionEndDate(new Date(e).toString());
          }}
          sx={{
            width: "100%",
            ml: { xs: "0px", sm: "20px" },
            mt: { xs: "30px", sm: "0px" },
          }}
        />
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
            setSubscriptionTransactionInfos((prev: any) => {
              const updatedPrev = [...prev];
              const data = {
                subscriptionType,
                companyName,
                subscriptionStartDate,
                subscriptionEndDate,
                subscriberName,
                subscriberSurname,
              };
              updatedPrev.push(data);
              return updatedPrev;
            });
            setSubscriptionType("");
            setCompanyName("");
            setSubscriptionStartDate("");
            setSubscriptionEndDate("");
            setSubscriberName("");
            setSubscriberSurname("");
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

export default SubscriptionTransactionInfos;
