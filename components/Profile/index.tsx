import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import AppGridContainer from '@/components/Sidebar/AppGridContainer';
import Summary from './Summary';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import {
  getProfileTourFromLocalStorage,
  addProfileTourToLocalStorage,
} from '@/localstorage/profileTourStorage';
const Tour = dynamic(() => import('../Tour'), { ssr: false });
import { Inter } from 'next/font/google';
import { toast } from 'react-toastify';
import { getAccessTokenFromLocalStorage } from '@/localstorage/accessTokenStorage';
import { AddBlockChainType } from '@/types/User';
import { SmartContractReturnType } from '@/types/SmartContract';
import { SmartContractState } from '@/store/slices/mySmartContractsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import CloseIcon from '@mui/icons-material/Close';
import { getUser } from '@/store/slices/userSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const inter = Inter({ subsets: ['latin'] });

function Profile() {
  const steps: any = [
    {
      content: <h2>Begin your journey!</h2>,
      locale: { skip: <strong aria-label="skip">SKIP</strong> },
      placement: 'center',
      target: 'body',
    },
    {
      content: <h3>You can change your profile information here</h3>,
      placement: 'bottom',
      spotlightPadding: 20,
      styles: {
        options: {
          width: 300,
        },
      },
      target: '#summary',
    },
    {
      content: <h3>You can add your infos to the Blockchain here</h3>,
      placement: 'bottom',
      spotlightPadding: 20,
      styles: {
        options: {
          width: 300,
        },
      },
      target: '#add-blockchain',
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [smartContract, setSmartContract] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const isUserDataAddedToBlockchain: boolean = useSelector(
    (state: RootState) => state.user.value.isUserDataAddedToBlockchain
  ) as boolean;

  const dispatch = useDispatch<AppDispatch>();

  const smartContracts: SmartContractState = useSelector(
    (state: RootState) => state.smartContracts
  ) as SmartContractState;

  // TODO: eğer zaten eklenmişse eklemesin ekledin yazsın  bu değeride user model da tut

  const addBlockChain = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const addBlockchainData: AddBlockChainType = {
      smartContract: smartContract,
    };

    const res = await fetch('/api/user/addBlockchain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
      },
      body: JSON.stringify(addBlockchainData),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data?.message) toast.error(data.message);
      else if (data?.error) toast.error(data.error.message);
      else if (data[0]) toast.error(data[0].message);
      setOpenModal(false);
      setIsLoading(false);
    } else {
      dispatch(getUser(getAccessTokenFromLocalStorage() as string));
      setIsLoading(false);
      setOpenModal(false);
      toast.success(data.message);
    }
  };

  return (
    <Box>
      {typeof window !== 'undefined' && (
        <Tour
          run={getProfileTourFromLocalStorage() !== 'true'}
          setRun={addProfileTourToLocalStorage}
          steps={steps}
        />
      )}
      <AppGridContainer>
        <Grid item xs={0} md={2}></Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          id="summary"
        >
          <Summary />
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            pl: '30px',
          }}
        >
          {isUserDataAddedToBlockchain ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '40px',
              }}
            >
              <CheckCircleIcon
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: '#4BB543',
                }}
              />
              <Typography
                className={inter.className}
                sx={{
                  color: '#666666',
                  fontWeight: 500,
                  fontSize: '15px',
                  ml: '10px',
                  textAlign: 'center',
                }}
              >
                You have already added your data to Blockchain
              </Typography>
            </Box>
          ) : (
            <Button
              onClick={() => setOpenModal(true)}
              className={inter.className}
              id="add-blockchain"
              type="button"
              sx={{
                color: '#FFFDFF',
                fontWeight: '500',
                fontSize: '13px',
                height: { xs: '49px', md: '59px' },
                minWidth: { xs: '180px', md: '197px' },
                mt: '30px',
                display: 'inline',
                borderRadius: '15px',
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
              Add to Blockchain
            </Button>
          )}
        </Box>
        <Modal open={openModal}>
          <Box
            component="form"
            onSubmit={addBlockChain}
            sx={{
              border: 'none',
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '300px', sm: '400px' },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <CloseIcon
                sx={{
                  width: '20px',
                  position: 'absolute',
                  right: '-15px',
                  top: '-20px',
                  cursor: 'pointer',
                }}
                onClick={() => setOpenModal(false)}
              />
            </Box>
            <Typography
              className={inter.className}
              sx={{
                color: '#333',
                textAlign: 'center',
                fontWeight: '800',
                fontSize: { xs: '14px', md: '18px' },
              }}
            >
              Add Your Data to Blockchain
            </Typography>

            {smartContracts.values.length > 0 ? (
              <>
                <Box
                  sx={{
                    width: '100%',
                    mt: '30px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#666666',
                      fontWeight: '500',
                      fontSize: '14px',
                      mb: '3px',
                      ml: '3px',
                    }}
                  >
                    Choose Your Smart Contract:
                  </Typography>

                  <Select
                    required
                    value={smartContract}
                    onChange={(e) => setSmartContract(e.target.value)}
                    className={inter.className}
                    sx={{
                      bgcolor: '#F8F9F8',
                      boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: '0px',
                      color: '#666666',
                      height: '40px',
                      '&:focus': {
                        outline: 'none',
                      },
                    }}
                  >
                    {smartContracts.values.map(
                      (smartContract: SmartContractReturnType) => (
                        <MenuItem
                          key={smartContract?._id}
                          value={smartContract._id}
                          sx={{
                            color: '#666666',
                            fontWeight: '400',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          className={inter.className}
                        >
                          <Typography
                            className={inter.className}
                            sx={{
                              color: '#666666',
                              fontWeight: 500,
                              fontSize: '12px',
                              display: 'inline-block',
                            }}
                          >
                            {smartContract.name}
                          </Typography>
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Box>
                <Button
                  className={inter.className}
                  disabled={isLoading}
                  type="submit"
                  sx={{
                    color: '#FFFDFF',
                    fontWeight: '500',
                    fontSize: '13px',
                    height: { xs: '49px', md: '59px' },
                    minWidth: { xs: '180px', md: '197px' },
                    mt: '30px',
                    display: 'inline',
                    borderRadius: '15px',
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
                  {isLoading ? (
                    <CircularProgress
                      size={30}
                      sx={{ color: '#317DED', mt: '6px' }}
                    />
                  ) : (
                    'Add to Blockchain'
                  )}
                </Button>
              </>
            ) : (
              <Box>
                <Typography
                  className={inter.className}
                  sx={{
                    color: '#666',
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: '13px',
                    mt: { xs: '10px', md: '30px' },
                  }}
                >
                  You do not have any Smart Contract. You have to create Smart
                  Contract.
                </Typography>
              </Box>
            )}
          </Box>
        </Modal>
      </AppGridContainer>
    </Box>
  );
}

export default Profile;
