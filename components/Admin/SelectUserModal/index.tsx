import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ReturnedUserType } from "@/types/User";
import { toast } from "react-toastify";

interface Props {
  handleClose: any;
  users: ReturnedUserType[] | [];
  open: any;
  userId: string;
  setUserId: Function;
  setIsUserSelected: Function;
}

const SelectUserModal: React.FC<Props> = ({
  handleClose,
  open,
  users,
  setUserId,
  userId,
  setIsUserSelected,
}: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, sm: 400 },
          maxHeight: "500px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          outline: "none !important",
          border: "none",
          borderRadius: "15px",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: "10",
            right: { xs: "20px", sm: "20px" },
            top: { xs: "40px", sm: "65px" },
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            mt: { xs: "-30px", sm: "-50px" },
          }}
        >
          <CloseIcon
            sx={{ color: "#333", cursor: "pointer" }}
            onClick={() => handleClose()}
          />
        </Box>
        {users.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mt: "10px",
            }}
          >
            {users.map((user) => (
              <Box
                key={user._id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: userId === user._id ? "#a3a3a3" : "#d4d4d4",
                  borderRadius: "20px",
                  p: "10px",
                  width: "100%",
                  mt: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    background: "#a3a3a3",
                  },
                }}
                onClick={() => {
                  setUserId(user._id);
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {user.name}
                </Typography>
              </Box>
            ))}

            <Button
              sx={{
                width: "100%",
                mt: "20px",
                borderRadius: "20px",
                py: "10px",
                fontWeight: "600",
              }}
              variant="contained"
              onClick={() => {
                if (userId) {
                  setIsUserSelected(true);
                  handleClose();
                  toast.success("You successfully select a user");
                } else {
                  toast.info("You did not select any user");
                }
              }}
            >
              Select User
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "10px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              There is no user with this name
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SelectUserModal;
