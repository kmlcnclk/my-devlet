import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { whiteTextFieldCss } from '@/common';
import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { SignInType } from '@/types/User';
import { addAccessTokenToLocalStorage } from '@/localstorage/accessTokenStorage';
import { addRefreshTokenToLocalStorage } from '@/localstorage/refreshTokenStorage';
import { toast } from 'react-toastify';
import { addRememberMeToLocalStorage } from '@/localstorage/rememberMeStorage';

type SignInDataType = {
  email: string;
  password: string;
  isRemember: boolean;
};

function SignIn() {
  const [signInData, setSignInData] = useState<SignInDataType>({
    email: '',
    password: '',
    isRemember: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard/');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const userData: SignInType = {
      email: signInData.email,
      password: signInData.password,
    };

    const res = await fetch('/api/user/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const status = await res.status;

    const data = await res.json();

    if (status === 200) {
      toast.success('Sign in is successful');
      addAccessTokenToLocalStorage(data.accessToken);
      addRefreshTokenToLocalStorage(data.refreshToken);
      addRememberMeToLocalStorage(signInData.isRemember.toString());
      setIsLoading(false);
      router.push('/dashboard/');
    } else {
      setIsLoading(false);
      if (data?.message) toast.error(data.message);
      else if (data?.error) toast.error(data.error.message);
      else if (data[0]) toast.error(data[0].message);
    }
  };

  const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData((prev: SignInDataType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFuncForCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData((prev: SignInDataType) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(90deg, #FC9BB3 0%, #7673FE 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component={Paper}
        sx={{
          boxShadow: '0px 4px 20px 2px rgba(0, 0, 0, 0.25)',
          borderRadius: '30px',
          px: { xs: '25px', md: '50px' },
          py: { xs: '25px', md: '40px' },
          width: { xs: '310px', sm: '420px', md: '450px', xl: '520px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ color: 'black', display: 'flex', alignItems: 'center' }}
        >
          Welcome back!
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: 'black', mb: { xs: '5px', md: '20px' }, mt: '5px' }}
        >
          Login to your account
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            sx={whiteTextFieldCss}
            size="small"
            type="email"
            placeholder="E-Mail"
            value={signInData.email}
            name="email"
            onChange={onChangeFunc}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            sx={whiteTextFieldCss}
            size="small"
            type="password"
            placeholder="Password"
            value={signInData.password}
            name="password"
            onChange={onChangeFunc}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FormControlLabel
              sx={{
                color: 'black',
                mt: '5px',
                '& MuiCheckbox-root': {
                  p: 0,
                },
              }}
              control={
                <Checkbox
                  sx={{
                    pr: '3px',
                    color: 'black',
                    '&.Mui-checked': {
                      color: '#2563eb',
                    },
                  }}
                  value={signInData.isRemember}
                  name="isRemember"
                  onChange={onChangeFuncForCheckBox}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: '14px',
                    textAlign: 'center',
                  }}
                >
                  Remember for 7 days
                </Typography>
              }
            />
            <Typography
              sx={{
                background: 'linear-gradient(90deg, #FFBAF8 0%, #84CCF4 100%)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              Forgot Password?
            </Typography>
          </Box>

          <Button
            sx={{
              background: 'linear-gradient(90deg, #FC9BB3 0%, #7673FE 100%)',
              boxShadow: '0px 4px 10px 1px #00000040',
              borderRadius: '10px',
              width: '100%',
              height: '50px',
              my: '10px',
            }}
            type="submit"
          >
            {isLoading ? (
              <CircularProgress size={30} sx={{ color: '#f3f3f3' }} />
            ) : (
              <Typography
                sx={{
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}
              >
                SIGN IN
              </Typography>
            )}
          </Button>

          <Typography sx={{ textAlign: 'center', mt: '20px', color: 'black' }}>
            Don’t have an account?
            <Link
              href="/sign-up"
              sx={{
                marginLeft: '10px',
                fontWeight: 'bold',
                background: 'linear-gradient(180deg, #FC9BB3 0%, #7FABF4 100%)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SIGN UP
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SignIn;
