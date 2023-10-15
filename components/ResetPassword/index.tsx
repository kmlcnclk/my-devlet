import React from "react";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { whiteTextFieldCss } from "@/common";

function ResetPassword() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundImage: "url(/images/signin-bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid
        item
        md={7}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/images/save-your-time.png"
          sx={{
            width: { md: "400px", xl: "500px" },
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        py={"50px"}
        sx={{
          px: { xs: "25px", md: "0px" },
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
        }}
      >
        <Box
          component={Paper}
          sx={{
            background: "rgba(217, 217, 217, 0.1)",
            boxShadow: "0px 4px 20px 2px rgba(0, 0, 0, 0.25)",
            borderRadius: "30px",
            px: { xs: "25px", md: "50px" },
            py: { xs: "25px", md: "40px" },
            width: { xs: "420px", md: "450px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src="/images/signin-header-staff.png"
              sx={{ marginRight: "5px" }}
            />
            Welcome back!
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "white", mb: { xs: "5px", md: "20px" }, mt: "5px" }}
          >
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Typography
              sx={{ color: "white", textAlign: "center", mt: "10px" }}
            >
              Lost your password? Please enter your e-mail address. You will
              receive a link to create a new password via e-mail.
            </Typography>
            <Box
              component="img"
              src="/images/reset-password.png"
              sx={{ width: "100%", cursor: "pointer", mt: "15px", mb: "5px" }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ResetPassword;
