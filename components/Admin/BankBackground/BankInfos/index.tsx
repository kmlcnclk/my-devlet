import { getAdminAccessTokenFromLocalStorage } from '@/localstorage/adminAccessTokenStorage';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  bankInfos: any;
  setBankInfos: Function;
  userId: string;
  isUserSelected: boolean;
}

const BankInfos: React.FC<Props> = ({
  bankInfos,
  setBankInfos,
  userId,
  isUserSelected,
}: Props) => {
  const [bankName, setBankName] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitBankInfos = async (e: any) => {
    e.preventDefault();

    if (isUserSelected) {
      if (bankInfos.length > 0) {
        setIsLoading(true);
        const bankData = {
          userId,
          bankInfos,
        };

        const res = await fetch('/api/admin/bankBackground/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(bankData),
        });

        const data = await res.json();
        if (res.ok) {
          setIsLoading(false);
          toast.success(data.message);
        } else {
          if (data?.error?.message === 'User has already bank infos') {
            const bankData = {
              userId,
              bankInfos,
            };

            const res = await fetch('/api/admin/bankBackground/update', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
              },
              body: JSON.stringify(bankData),
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
        setBankName('');
        setAccountBalance(0);
        setAccountNumber('');
        setAccountType('');
      } else {
        toast.info('You have to enter at least one school info');
      }
    } else {
      toast.info('You have to enter a user id');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitBankInfos}
      sx={{
        mt: '30px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'flex-start' },
            flexDirection: 'column',
            width: { xs: '100%', sm: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Bank Name
          </Typography>
          <Box
            component="input"
            value={bankName}
            onChange={(e: any) => setBankName(e.target.value)}
            sx={{
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'flex-start' },
            flexDirection: 'column',
            width: { xs: '100%', sm: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Account Balance
          </Typography>
          <Box
            component="input"
            value={accountBalance}
            onChange={(e: any) => setAccountBalance(Number(e.target.value))}
            sx={{
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          mt: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'flex-start' },
            flexDirection: 'column',
            width: { xs: '100%', sm: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Account Number
          </Typography>
          <Box
            component="input"
            value={accountNumber}
            onChange={(e: any) => setAccountNumber(e.target.value)}
            sx={{
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'flex-start' },
            flexDirection: 'column',
            width: { xs: '100%', sm: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Account Type
          </Typography>
          <Select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            sx={{
              bgcolor: '#F8F9F8',
              boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              p: '0px',
              color: '#666666',
              height: '40px',
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            <MenuItem
              value="Personal"
              sx={{
                color: '#666666',
                fontWeight: '400',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  color: '#666666',
                  fontWeight: 500,
                  fontSize: '12px',
                  display: 'inline-block',
                }}
              >
                Personal
              </Typography>
            </MenuItem>
            <MenuItem
              value="Business"
              sx={{
                color: '#666666',
                fontWeight: '400',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  color: '#666666',
                  fontWeight: 500,
                  fontSize: '12px',
                  display: 'inline-block',
                }}
              >
                Business
              </Typography>
            </MenuItem>
          </Select>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
        }}
      >
        <Button
          onClick={() => {
            setBankInfos((prev: any) => {
              const updatedPrev = [...prev];
              const data = {
                bankName,
                accountBalance: Number(accountBalance),
                accountNumber,
                accountType,
              };
              updatedPrev.push(data);
              return updatedPrev;
            });
            setBankName('');
            setAccountBalance(0);
            setAccountNumber('');
            setAccountType('');
          }}
          type="button"
          sx={{
            color: '#FFFDFF',
            fontWeight: '500',
            fontSize: '15px',
            height: { xs: '40px', sm: '50px' },
            width: { xs: '100%', sm: '49%' },
            mt: '27px',
            borderRadius: { xs: '10px', sm: '15px' },
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
          Add
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          sx={{
            color: '#FFFDFF',
            fontWeight: '500',
            fontSize: '15px',
            height: { xs: '40px', sm: '50px' },
            width: { xs: '100%', sm: '49%' },
            mt: '27px',
            borderRadius: { xs: '10px', sm: '15px' },
            bgcolor: '#24b307',
            border: '2px solid #24b307',
            boxShadow: '0px 4px 10px 0px #00000040',
            '&:active': {
              bgcolor: '#24b307',
            },
            '&:hover': {
              scale: '1.02',
              bgcolor: '#24b307',
              transition: 'transform 0.3s ease',
            },
          }}
          variant="contained"
        >
          {isLoading ? (
            <CircularProgress size={25} sx={{ color: '#24b307' }} />
          ) : (
            'Submit'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default BankInfos;
