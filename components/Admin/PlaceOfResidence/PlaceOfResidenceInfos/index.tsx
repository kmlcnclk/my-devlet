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
  placeOfResidenceInfos: any;
  setPlaceOfResidenceInfos: Function;
  userId: string;
  isUserSelected: boolean;
  setFile: Function;
  setRatio: Function;
}

const PlaceOfResidenceInfos: React.FC<Props> = ({
  placeOfResidenceInfos,
  setPlaceOfResidenceInfos,
  userId,
  isUserSelected,
  setFile,
  setRatio,
}: Props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [typeOfAddress, setTypeOfAddress] = useState("");
  const [locationOfAddress, setLocationOfAddress] = useState("");
  const [isCurrentAddress, setIsCurrentAddress] = useState(false);
  const [settlementDate, setSettlementDate] = useState("");
  const [leavingDate, setLeavingDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitPlaceOfResidenceInfos = async (e: any) => {
    e.preventDefault();

    if (isUserSelected) {
      if (placeOfResidenceInfos.length > 0) {
        setIsLoading(true);
        const placeOfResidenceData = {
          userId,
          placeOfResidenceInfos: placeOfResidenceInfos,
        };

        const res = await fetch("/api/admin/placeOfResidence/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(placeOfResidenceData),
        });

        const data = await res.json();
        if (res.ok) {
          setIsLoading(false);
          toast.success(data.message);
        } else {
          if (
            data?.error?.message === "User has already Place of Residence infos"
          ) {
            const placeOfResidenceData = {
              userId,
              placeOfResidenceInfos: placeOfResidenceInfos,
            };

            const res = await fetch("/api/admin/placeOfResidence/update", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
              },
              body: JSON.stringify(placeOfResidenceData),
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
        setName("");
        setSurname("");
        setTypeOfAddress("");
        setLocationOfAddress("");
        setIsCurrentAddress(false);
        setSettlementDate("");
        setLeavingDate("");
        setFile(null);
        setPlaceOfResidenceInfos([]);
        setRatio(0);
      } else {
        toast.info("You have to enter at least one Place of Residence info");
      }
    } else {
      toast.info("You have to enter a user id");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitPlaceOfResidenceInfos}
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
            Name
          </Typography>
          <Box
            component="input"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
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
            Surname
          </Typography>
          <Box
            component="input"
            value={surname}
            onChange={(e: any) => setSurname(e.target.value)}
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
            Type of Address
          </Typography>
          <Box
            component="input"
            value={typeOfAddress}
            onChange={(e: any) => setTypeOfAddress(e.target.value)}
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
            Location of Address
          </Typography>
          <Box
            component="textarea"
            value={locationOfAddress}
            onChange={(e: any) => setLocationOfAddress(e.target.value)}
            sx={{
              width: "100%",
              height: "100px",
              bgcolor: "#F8F9F8",
              color: "#666666",
              border: "0.2px solid #8F8F8F",
              boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              p: "10px",
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
            label="Settlement Date"
            value={settlementDate}
            onChange={(e: any) => {
              setSettlementDate(new Date(e).toString());
            }}
          />
          <DatePicker
            label="Leaving Date"
            value={leavingDate}
            onChange={(e: any) => setLeavingDate(new Date(e).toString())}
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
              Is Current Address?
            </Typography>
            <Checkbox
              value={isCurrentAddress}
              onChange={(e) => {
                setIsCurrentAddress(e.target.checked);
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
            setPlaceOfResidenceInfos((prev: any) => {
              const updatedPrev = [...prev];
              const data = {
                name,
                surname,
                typeOfAddress,
                locationOfAddress,
                isCurrentAddress,
                settlementDate,
                leavingDate,
              };
              updatedPrev.push(data);
              return updatedPrev;
            });
            setName("");
            setSurname("");
            setTypeOfAddress("");
            setLocationOfAddress("");
            setIsCurrentAddress(false);
            setSettlementDate("");
            setLeavingDate("");
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

export default PlaceOfResidenceInfos;
