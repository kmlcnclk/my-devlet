import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { SignUpType } from '@/types/User';
import { addAccessTokenToLocalStorage } from '@/localstorage/accessTokenStorage';
import { addRefreshTokenToLocalStorage } from '@/localstorage/refreshTokenStorage';
import { toast } from 'react-toastify';
import { addRememberMeToLocalStorage } from '@/localstorage/rememberMeStorage';
import { whiteTextFieldCss } from '@/common';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type SignUpDataType = {
  name: string;
  email: string;
  age: number;
  identityNumber: number;
  password: string;
  passwordConfirmation: string;
  isRemember: boolean;
  privacyPolicy: boolean;
};

function SignUp() {
  const [signUpData, setSignUpData] = useState<SignUpDataType>({
    name: '',
    email: '',
    identityNumber: 0,
    age: 0,
    password: '',
    passwordConfirmation: '',
    isRemember: false,
    privacyPolicy: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (signUpData.password == signUpData.passwordConfirmation) {
      const userData: SignUpType = {
        name: signUpData.name,
        email: signUpData.email,
        identityNumber: Number(signUpData.identityNumber),
        age: Number(signUpData.age),
        password: signUpData.password,
        passwordConfirmation: signUpData.passwordConfirmation,
      };

      const res = await fetch('/api/user/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const status = await res.status;

      const data = await res.json();

      if (status === 201) {
        toast.success('Sign up is successful');
        addAccessTokenToLocalStorage(data.accessToken);
        addRefreshTokenToLocalStorage(data.refreshToken);
        addRememberMeToLocalStorage(signUpData.isRemember.toString());
        setIsLoading(false);
        router.push('/dashboard/');
      } else {
        setIsLoading(false);

        if (data?.message) toast.error(data.message);
        else if (data?.error) toast.error(data.error.message);
        else if (data[0]) toast.error(data[0].message);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast.error('Passwords are not same');
    }
  };

  const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData((prev: SignUpDataType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFuncForCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData((prev: SignUpDataType) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(90deg, #FC9BB3 0%, #7673FE 100%)',
      }}
    >
      <Box
        component={Paper}
        sx={{
          boxShadow: '0px 4px 20px 2px rgba(0, 0, 0, 0.25)',
          borderRadius: '30px',
          px: { xs: '25px', md: '50px' },
          py: { xs: '25px', md: '40px' },
          width: { xs: '310px', sm: '420px', md: '520px', xl: '600px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          my: '30px',
        }}
      >
        <Typography
          sx={{
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}
          className={inter.className}
        >
          Welcome to the new age of technology!
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          className={inter.className}
          sx={{
            mb: { xs: '5px', md: '20px' },
            mt: '5px',
          }}
        >
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            sx={whiteTextFieldCss}
            size="small"
            type="text"
            placeholder="Name"
            value={signUpData.name}
            name="name"
            onChange={onChangeFunc}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            sx={whiteTextFieldCss}
            size="small"
            placeholder="E-Mail"
            value={signUpData.email}
            name="email"
            onChange={onChangeFunc}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            sx={whiteTextFieldCss}
            size="small"
            placeholder="identityNumber"
            name="identityNumber"
            onChange={onChangeFunc}
          />{' '}
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            sx={whiteTextFieldCss}
            size="small"
            placeholder="Age"
            name="age"
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
            value={signUpData.password}
            name="password"
            onChange={onChangeFunc}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            sx={whiteTextFieldCss}
            size="small"
            type="password"
            placeholder="Confirm Password"
            value={signUpData.passwordConfirmation}
            name="passwordConfirmation"
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
                color: 'white',
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
                  value={signUpData.isRemember}
                  name="isRemember"
                  onChange={onChangeFuncForCheckBox}
                />
              }
              label={
                <Typography
                  className={inter.className}
                  sx={{
                    color: 'black',
                    fontSize: '14px',
                    textAlign: 'center',
                  }}
                >
                  Remember for 7 days
                </Typography>
              }
            />
            <Typography
              className={inter.className}
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
          <FormControlLabel
            sx={{
              color: 'white',
              '& MuiCheckbox-root': {
                p: 0,
              },
            }}
            control={
              <Checkbox
                required
                sx={{
                  pr: '3px',
                  color: 'black',
                  '&.Mui-checked': {
                    color: '#2563eb',
                  },
                }}
                value={signUpData.privacyPolicy}
                name="privacyPolicy"
                onChange={onChangeFuncForCheckBox}
              />
            }
            label={
              <Typography
                sx={{
                  fontSize: '14px',
                  textAlign: 'center',
                  color: 'black',
                }}
              >
                I accept the{' '}
                <Link sx={{ fontWeight: 'bold' }}>Terms and Conditions</Link>{' '}
                and <Link sx={{ fontWeight: 'bold' }}>Privacy Politicy</Link>
              </Typography>
            }
          />
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
                SIGN UP
              </Typography>
            )}
          </Button>
          <Typography sx={{ textAlign: 'center', mt: '20px', color: 'black' }}>
            Do you have an account?
            <Link
              href="/sign-in"
              sx={{
                marginLeft: '10px',
                fontWeight: 'bold',
                background: 'linear-gradient(180deg, #FC9BB3 0%, #7FABF4 100%)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SIGN IN
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
