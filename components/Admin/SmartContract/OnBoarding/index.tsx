import React, { useEffect, useState } from 'react';
import FirstOnBoarding from './FirstOnBoarding';
import SecondOnBoarding from './SecondOnBoarding';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { getAdminAccessTokenFromLocalStorage } from '@/localstorage/adminAccessTokenStorage';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { getSmartContracts } from '@/store/slices/mySmartContractsForAdminSlice';
import SendTokenModal from '@/lib/sendTokenModal';

interface Props {}

const OnBoarding: React.FC<Props> = ({}: Props) => {
  const [stateOfOnBoarding, setStateOfOnBoarding] = useState('first');
  const [inputs, setInputs] = useState({
    name: '',
    network: '',
  });

  const [ratio, setRatio] = useState(0);
  const [openTokenModal, setOpenTokenModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const saveSmartContract = async () => {
      const smartContractData = {
        ...inputs,
      };
      const createRes = await fetch('/api/admin/smart-contract/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
        },
        body: JSON.stringify(smartContractData),
      });

      const data = await createRes.json();

      if (!createRes.ok) {
        if (data?.error?.message === 'Insufficient funds') {
          toast.error(
            'Insufficient funds. You should send some token to your wallet'
          );
          setOpenTokenModal(true);
        } else if (data?.message) toast.error(data.message);
        else if (data?.error) toast.error(data.error.message);
        else if (data[0]) toast.error(data[0].message);
        setInputs({
          name: '',
          network: '',
        });
        setRatio(0);
        setStateOfOnBoarding('first');
      } else {
        const res = await fetch('/api/admin/smart-contract/getAllWithUserID', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
        });

        const dataSms = await res.json();

        if (!res.ok) {
          if (dataSms?.message) toast.error(dataSms.message);
          else if (dataSms?.error) toast.error(dataSms.error.message);
          else if (dataSms[0]) toast.error(dataSms[0].message);
        } else {
          toast.success('Your Smart Contract successfully created');
          dispatch(
            getSmartContracts(getAdminAccessTokenFromLocalStorage() as string)
          );
        }
      }
    };

    if (stateOfOnBoarding === 'second') {
      saveSmartContract();
    }
  }, [stateOfOnBoarding]);

  useEffect(() => {
    if (stateOfOnBoarding === 'second') {
      const intervalId = setInterval(() => {
        if (ratio < 100) {
          setRatio((prev: number) => prev + 1);
        } else {
          clearInterval(intervalId);
        }
      }, 200);

      if (ratio > 100) {
        setRatio(100);
      }

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [ratio, stateOfOnBoarding]);

  return (
    <Box
      sx={{
        transition: 'ease-in-out 0.15s',
        height: '100%',
      }}
    >
      {stateOfOnBoarding == 'first' && (
        <FirstOnBoarding
          {...{
            setStateOfOnBoarding,
            inputs,
            setInputs,
          }}
        />
      )}
      {stateOfOnBoarding == 'second' && (
        <SecondOnBoarding
          {...{
            ratio,
          }}
        />
      )}
      <SendTokenModal
        {...{ openTokenModal, setOpenTokenModal }}
        whichState="admin"
      />
    </Box>
  );
};

export default OnBoarding;
