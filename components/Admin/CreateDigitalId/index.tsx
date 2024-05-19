import { getAdminAccessTokenFromLocalStorage } from "@/localstorage/adminAccessTokenStorage";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SelectUserModal from "../SelectUserModal";
import { ReturnedUserType } from "@/types/User";
import { fetchUsers } from "../FetchUsers";

function CreateDigitalId() {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<ReturnedUserType[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [isUserSelected, setIsUserSelected] = useState<boolean>(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createDigitalIdForUser = async (e: any) => {
    e.preventDefault();
    if (isUserSelected) {
      setIsLoading(true);

      const res = await fetch(
        `/api/admin/create-digital-id-for-user?id=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
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
    } else {
      toast.info("You should select a user");
    }
  };

  return (
    <>
      <form onSubmit={createDigitalIdForUser}>
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
          <Button
            type="submit"
            disabled={isLoading}
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
            {isLoading ? (
              <CircularProgress size={22} sx={{ color: "#317DED" }} />
            ) : (
              "Create Digital Id"
            )}
          </Button>
        </Box>
      </form>

      <SelectUserModal
        {...{ handleClose, users, open, userId, setUserId, setIsUserSelected }}
      />
    </>
  );
}

export default CreateDigitalId;
