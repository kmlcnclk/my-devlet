import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAccessTokenFromLocalStorage } from '@/localstorage/accessTokenStorage';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/store/slices/userSlice';

import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

function Summary() {
  const dispatch = useDispatch<AppDispatch>();

  const username: string = useSelector(
    (state: RootState) => state.user.value.name
  ) as string;

  const email: string = useSelector(
    (state: RootState) => state.user.value.email
  ) as string;

  const [userInputs, setUserInputs] = useState<any>({
    username: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function getRandomProfileColor() {
    const colors = ['#95BDFF', '#B5D5C5', '#FEBE8C', '#6A8CAF', '#EAC7C7'];
    const randomIndex = Math.floor(Math.random() * 5);

    return colors[randomIndex];
  }

  const changeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputs((prev: any) => {
      const updatedData = { ...prev };
      updatedData[e.target.name] = e.target.value;
      return updatedData;
    });
  };

  const submitFunc = async (e: any) => {
    e.preventDefault();
    let isSomethingDone: boolean = false;

    if (userInputs.username || userInputs.email) {
      isSomethingDone = true;
      const userData: { name?: string; email?: string } = {};
      if (userInputs.username) userData['name'] = userInputs.username;
      if (userInputs.email) userData['email'] = userInputs.email;

      const res = await fetch('/api/user/profile/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        dispatch(getUser(getAccessTokenFromLocalStorage() as string));
        setUserInputs((prev: any) => {
          const updatedData = { ...prev };
          updatedData['username'] = '';
          updatedData['email'] = '';
          return updatedData;
        });
        setIsModalOpen(false);
      } else {
        if (data?.message) toast.error(data.message);
        else if (data?.error) toast.error(data.error.message);
        else if (data[0]) toast.error(data[0].message);
      }
    }

    if (
      userInputs.oldPassword &&
      userInputs.newPassword &&
      userInputs.newPasswordConfirmation
    ) {
      isSomethingDone = true;
      const userData: {
        oldPassword: string;
        newPassword: string;
        newPasswordConfirmation: string;
      } = {
        oldPassword: userInputs.oldPassword,
        newPassword: userInputs.newPassword,
        newPasswordConfirmation: userInputs.newPasswordConfirmation,
      };

      const res = await fetch('/api/user/profile/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        dispatch(getUser(getAccessTokenFromLocalStorage() as string));
        setUserInputs((prev: any) => {
          const updatedData = { ...prev };
          updatedData['oldPassword'] = '';
          updatedData['newPassword'] = '';
          updatedData['newPasswordConfirmation'] = '';
          return updatedData;
        });
        setIsModalOpen(false);
      } else {
        if (data?.message) toast.error(data.message);
        else if (data?.error) toast.error(data.error.message);
        else if (data[0]) toast.error(data[0].message);
      }
    } else if (
      userInputs.oldPassword ||
      userInputs.newPassword ||
      userInputs.newPasswordConfirmation
    ) {
      isSomethingDone = true;
      toast.error('You should fill all input about password');
    }

    if (!isSomethingDone) {
      toast.info("You didn't enter anything!");
    }
  };

  const deleteMyAccount = async () => {
    const res = await fetch('/api/user/delete-my-account', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      router.push('/sign-up');
    } else {
      if (data?.message) toast.error(data.message);
      else if (data?.error) toast.error(data.error.message);
      else if (data[0]) toast.error(data[0].message);
    }
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: '30px 0px',
          boxShadow:
            '-5px 0px 20px rgba(0, 0, 0, 0.25), 10px 10px 20px 1px rgba(0, 0, 0, 0.25)',
          width: '100%',
          minHeight: '250px',
          p: { xs: '30px', md: '40px' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
        }}
      >
        {/* left */}
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            mb: { xs: '20px', sm: '0px' },
          }}
        >
          <Box />
          <Box
            sx={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              bgcolor: getRandomProfileColor(),

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#fff',
              fontSize: '23px',
              mb: { xs: '15px', sm: '0px' },
            }}
          >
            {username.slice(0, 2)}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={deleteMyAccount}
          >
            <Typography
              sx={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                color: 'rgba(184, 25, 25, 1)',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              Delete my account
            </Typography>
            <DeleteIcon
              sx={{
                fontSize: '14px',
                ml: '3px',
                cursor: 'pointer',
                color: 'rgba(184, 25, 25, 1)',
              }}
            />
          </Box>
          <Box />
        </Box>

        {/* right */}
        <Box sx={{ width: '100%', pl: { xs: '0px', md: '30px' } }}>
          <Box
            sx={{
              '& p': { fontSize: '15px' },
              mb: '25px',
            }}
          >
            <Typography color="rgba(102, 102, 102, 1)">Name:</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: '3px',
              }}
            >
              <Typography>{username}</Typography>
              <Box
                sx={{
                  color: 'rgba(47, 128, 237, 1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Edit <CreateIcon sx={{ fontSize: '18px', ml: '5px' }} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ '& p': { fontSize: '15px' }, mb: '25px' }}>
            <Typography color="rgba(102, 102, 102, 1)">E-Mail:</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: '3px',
              }}
            >
              <Typography className="truncate">{email}</Typography>
              <Box
                sx={{
                  color: 'rgba(47, 128, 237, 1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Edit <CreateIcon sx={{ fontSize: '18px', ml: '5px' }} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ '& p': { fontSize: '15px' } }}>
            <Typography color="rgba(102, 102, 102, 1)">Password:</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: '3px',
              }}
            >
              <Typography sx={{ fontSize: '22px !important' }}>
                ***********
              </Typography>
              <Box
                sx={{
                  color: 'rgba(47, 128, 237, 1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Edit <CreateIcon sx={{ fontSize: '18px', ml: '5px' }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal open={isModalOpen}>
        <Box
          component="form"
          onSubmit={submitFunc}
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            right: '50%',
            height: { xs: '450px', sm: '435px' },
            overflowY: 'auto',
            transform: 'translate(-50%, -50%)',
            width: { xs: '300px', sm: '70%', md: '678px' },
            bgcolor: '#F3F6FA',
            boxShadow: 24,
            borderRadius: '10px',
            p: '4px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            outline: 'none',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: { xs: '20%', sm: '5%' },
              width: '100%',
              mb: { xs: '90px', sm: '0px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: '15px',
              }}
            >
              <Typography
                className={inter.className}
                sx={{ fontWeight: '500', fontSize: { xs: '17px', sm: '22px' } }}
              >
                Edit Profile
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                right: { xs: '-10px', sm: '0px' },
                top: { xs: '40px', sm: '65px' },
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                px: '20px',
                mt: { xs: '-30px', sm: '-50px' },
              }}
            >
              <CloseIcon
                sx={{ color: '#666666', cursor: 'pointer' }}
                onClick={() => {
                  setIsModalOpen(false);
                  setUserInputs({
                    username: '',
                    email: '',
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: '',
                  });
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              height: '5%',
              justifyContent: 'flex-start',
              width: '100%',
              px: '20px',
              mt: '40px',
            }}
          >
            <Typography
              className={inter.className}
              sx={{
                fontWeight: '400',
                fontSize: { xs: '15px' },
                color: '#666',
              }}
            >
              Note: You don&apos;t have to change every data!
            </Typography>
          </Box>

          <Box
            sx={{
              mb: { xs: '110px', sm: '20px' },
              height: { xs: '80%', sm: '90%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: { xs: 'flex-start' },
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: { xs: 'block', sm: 'flex' },
                px: { xs: '15px', sm: '0px' },
                justifyContent: 'space-evenly',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  mt: '20px',
                }}
              >
                <Typography
                  className={inter.className}
                  sx={{ fontWeight: '400', fontSize: '15px', mb: '5px' }}
                >
                  Name:
                </Typography>
                <Box
                  component="input"
                  value={userInputs.username}
                  onChange={changeFunc}
                  name="username"
                  sx={{
                    maxWidth: { xs: '100%', sm: '450px' },
                    width: '100%',
                    height: '40px',
                    bgcolor: '#F8F9F8',
                    color: '#666666',
                    border: '0.2px solid #8F8F8F',
                    boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    px: '15px',
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  mt: '20px',
                }}
              >
                <Typography
                  className={inter.className}
                  sx={{ fontWeight: '400', fontSize: '15px', mb: '5px' }}
                >
                  Email:
                </Typography>
                <Box
                  component="input"
                  value={userInputs.email}
                  onChange={changeFunc}
                  name="email"
                  type="email"
                  sx={{
                    maxWidth: { xs: '100%', sm: '450px' },
                    width: '100%',
                    height: '40px',
                    bgcolor: '#F8F9F8',
                    color: '#666666',
                    border: '0.2px solid #8F8F8F',
                    boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    px: '15px',
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: 'block', sm: 'flex' },
                px: { xs: '15px', sm: '0px' },
                justifyContent: 'space-evenly',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  mt: '20px',
                }}
              >
                <Typography
                  className={inter.className}
                  sx={{ fontWeight: '400', fontSize: '15px', mb: '5px' }}
                >
                  Your Old Password:
                </Typography>
                <Box
                  component="input"
                  value={userInputs.oldPassword}
                  onChange={changeFunc}
                  name="oldPassword"
                  type="password"
                  sx={{
                    maxWidth: { xs: '100%', sm: '450px' },
                    width: '100%',
                    height: '40px',
                    bgcolor: '#F8F9F8',
                    color: '#666666',
                    border: '0.2px solid #8F8F8F',
                    boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    px: '15px',
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  mt: '20px',
                }}
              >
                <Typography
                  className={inter.className}
                  sx={{ fontWeight: '400', fontSize: '15px', mb: '5px' }}
                >
                  Your New Password:
                </Typography>
                <Box
                  component="input"
                  value={userInputs.newPassword}
                  onChange={changeFunc}
                  name="newPassword"
                  type="password"
                  sx={{
                    maxWidth: { xs: '100%', sm: '450px' },
                    width: '100%',
                    height: '40px',
                    bgcolor: '#F8F9F8',
                    color: '#666666',
                    border: '0.2px solid #8F8F8F',
                    boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    px: '15px',
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: 'block', sm: 'flex' },
                justifyContent: 'space-evenly',
                px: { xs: '15px', sm: '0px' },
                width: '100%',
              }}
            >
              <Box
                sx={{
                  mt: { xs: '20px' },
                }}
              >
                <Typography
                  className={inter.className}
                  sx={{ fontWeight: '400', fontSize: '15px', mb: '5px' }}
                >
                  Password Confirmation:
                </Typography>
                <Box
                  component="input"
                  value={userInputs.newPasswordConfirmation}
                  onChange={changeFunc}
                  name="newPasswordConfirmation"
                  type="password"
                  sx={{
                    maxWidth: { xs: '100%', sm: '450px' },
                    width: '100%',
                    height: '40px',
                    bgcolor: '#F8F9F8',
                    color: '#666666',
                    border: '0.2px solid #8F8F8F',
                    boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    px: '15px',
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  mt: { xs: '30px', sm: '20px' },
                  display: 'flex',
                  alignItems: 'flex-end',
                  width: { xs: '100%', sm: '170px' },
                }}
              >
                <Button
                  className={inter.className}
                  type="submit"
                  sx={{
                    color: '#FFFDFF',
                    fontWeight: '500',
                    fontSize: '14px',
                    maxWidth: { xs: '100%', sm: '450px' },
                    width: '100%',
                    height: '40px',
                    display: 'inline',
                    borderRadius: '10px',
                    bgcolor: '#317DED',
                    border: '2px solid #317DED',
                    boxShadow: '0px 4px 10px 0px #00000040',
                    '&:hover': {
                      scale: '1.02',
                      transition: 'transform 0.3s ease',
                    },
                  }}
                  variant="contained"
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Summary;
