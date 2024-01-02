import { getAdminAccessTokenFromLocalStorage } from '@/localstorage/adminAccessTokenStorage';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import TaxDebtInfoTable from './TaxDebtInfoTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ipfsUploader } from '@/src/ipfsUploader';
import { AddBlockChainByAdminType, TaxDebtReturnType } from '@/types/TaxDebt';
import { Inter } from 'next/font/google';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { SmartContractReturnType } from '@/types/SmartContract';

const inter = Inter({ subsets: ['latin'] });

function TaxDebt() {
  const [taxDebt, setTaxDebt] = useState<TaxDebtReturnType | null>(null);
  const taxDebtTableRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [smartContract, setSmartContract] = useState<string>('');
  const [taxDebtId, setTaxDebtId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [isTaxDebtSelected, setIsTaxDebtSelected] = useState<boolean>(false);

  const smartContracts: SmartContractReturnType[] = useSelector(
    (state: RootState) => state.smartContractForAdmin.values
  ) as SmartContractReturnType[];

  const addIPFS = async () => {
    const input = taxDebtTableRef.current;
    if (input)
      return html2canvas(input).then(async (canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        const pdfBuffer = await pdf.output('arraybuffer');

        const hash = await ipfsUploader(pdfBuffer);

        return hash;
      });
  };

  const addBlockChain = async (e: any) => {
    e.preventDefault();
    if (taxDebt) {
      setIsLoading(true);

      const ipfsHash = await addIPFS();
      if (ipfsHash) {
        const addBlockchainData: AddBlockChainByAdminType = {
          userId: userId,
          id: taxDebtId,
          smartContract: smartContract,
          ipfsHash,
        };

        const res = await fetch('/api/admin/taxDebt/addBlockchain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(addBlockchainData),
        });

        const data = await res.json();
        if (!res.ok) {
          if (data?.message) toast.error(data.message);
          else if (data?.error) toast.error(data.error.message);
          else if (data[0]) toast.error(data[0].message);
          setIsLoading(false);
        } else {
          setTaxDebt(data.eb);
          setIsLoading(false);
          toast.success(data.message);
        }
      }
    } else {
      toast.info('TaxDebt  could not found');
    }
  };

  const getTaxDebt = async () => {
    const res = await fetch(`/api/admin/taxDebt/getById?id=${taxDebtId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      if (data?.message) toast.error(data.message);
      else if (data?.error) toast.error(data.error.message);
      else if (data[0]) toast.error(data[0].message);
    } else {
      setTaxDebt(data.taxDebt);
      toast.success('TaxDebt is successfully found');
    }
  };

  return (
    <Box
      sx={{
        mt: '20px',
      }}
    >
      {taxDebt ? <TaxDebtInfoTable {...{ taxDebt, taxDebtTableRef }} /> : null}

      {smartContracts.length > 0 ? (
        <Box
          component="form"
          onSubmit={addBlockChain}
          sx={{
            p: { xs: '15px', sm: '23px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: { xs: 'flex-start' },
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Typography
              className={inter.className}
              sx={{ color: '#666666', fontWeight: '500', fontSize: '14px' }}
            >
              TaxDebt Id:
            </Typography>
            <Box
              component="input"
              required
              disabled={Boolean(taxDebtId) && isTaxDebtSelected}
              value={taxDebtId}
              onChange={(e: any) => setTaxDebtId(e.target.value)}
              sx={{
                height: '40px',
                width: '100%',
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
          <Button
            onClick={() => {
              if (taxDebtId) {
                setIsTaxDebtSelected(true);
                getTaxDebt();
              } else {
                toast.info('You have to enter an taxDebt id');
              }
            }}
            type="button"
            sx={{
              color: '#FFFDFF',
              fontWeight: '500',
              fontSize: '15px',
              height: '45px',
              width: '100%',
              mt: '27px',
              borderRadius: '10px',
              bgcolor: '#317DED',
              border: '2px solid #317DED',
              boxShadow: '0px 4px 10px 0px #00000040',
            }}
            variant="contained"
          >
            Select
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: { xs: 'flex-start' },
              flexDirection: 'column',
              width: '100%',
              mt: '30px',
            }}
          >
            <Typography
              className={inter.className}
              sx={{ color: '#666666', fontWeight: '500', fontSize: '14px' }}
            >
              User Id:
            </Typography>
            <Box
              component="input"
              required
              value={userId}
              onChange={(e: any) => setUserId(e.target.value)}
              sx={{
                height: '40px',
                width: '100%',
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
              width: '100%',
              mt: '30px',
            }}
          >
            <Typography
              className={inter.className}
              sx={{ color: '#666666', fontWeight: '500', fontSize: '14px' }}
            >
              Choose Your Wallet:
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
              {smartContracts?.map((smartContract: SmartContractReturnType) => (
                <MenuItem
                  key={smartContract?._id}
                  value={smartContract?._id}
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
                    {smartContract?.name}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
            <Button
              className={inter.className}
              disabled={isLoading}
              type="submit"
              sx={{
                color: '#FFFDFF',
                fontWeight: '500',
                fontSize: '13px',
                height: { xs: '39px', md: '49px' },
                width: '100%',
                mt: '30px',
                display: 'inline',
                borderRadius: '15px',
                bgcolor: '#317DED',
                border: '2px solid #317DED',
                boxShadow: '0px 4px 10px 0px #00000040',
              }}
              variant="contained"
            >
              {isLoading ? (
                <CircularProgress
                  size={24}
                  sx={{ color: '#317DED', mt: '4px' }}
                />
              ) : (
                <Typography
                  className={inter.className}
                  sx={{
                    color: '#f3f3f3',
                    fontWeight: '500',
                    fontSize: '14px',
                  }}
                >
                  Add to Blockchain
                </Typography>
              )}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            with: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            className={inter.className}
            sx={{
              color: '#555',
              fontWeight: 500,
              fontSize: '16px',
            }}
          >
            You don&apos;t have any smart contract
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default TaxDebt;
