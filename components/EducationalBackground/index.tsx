import { getAccessTokenFromLocalStorage } from '@/localstorage/accessTokenStorage';
import {
  Box,
  Button,
  CircularProgress,
  Link,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SchoolInfoTable from './SchoolInfoTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ipfsUploader } from '@/src/ipfsUploader';
import {
  AddBlockChainType,
  EducationalBackgroundReturnType,
} from '@/types/EducationalBackground';
import { Inter } from 'next/font/google';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { SmartContractReturnType } from '@/types/SmartContract';

const inter = Inter({ subsets: ['latin'] });

function EducationalBackground() {
  const [educationalBackground, setEducationalBackground] =
    useState<EducationalBackgroundReturnType | null>(null);
  const educationTableRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalForAddBlockchain, setOpenModalForAddBlockchain] =
    useState(false);
  const [ipfsURL, setIPFSURL] = useState('');
  const [isEducationInfoExists, setIsEducationInfoExists] = useState(true);
  const [smartContract, setSmartContract] = useState<string>('');

  const smartContracts: SmartContractReturnType[] = useSelector(
    (state: RootState) => state.smartContracts.values
  ) as SmartContractReturnType[];

  useEffect(() => {
    const getEducationalBackground = async () => {
      const res = await fetch('/api/user/educationalBackground/getByUserId', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.message) toast.error(data.message);
        else if (data?.error) toast.error(data.error.message);
        else if (data[0]) toast.error(data[0].message);
      } else {
        if (data.educationalBackground) {
          setEducationalBackground(data.educationalBackground);
          if (data.educationalBackground?.ipfsHash) {
            setIsButtonVisible(false);
            // setIPFSURL(
            //   `https://ipfs.io/ipfs/${data.educationalBackground.ipfsHash}`
            // );
            setIPFSURL(
              `https://neu-my-devlet.s3.eu-north-1.amazonaws.com/${data.educationalBackground.ipfsHash}`
            );
          }
        } else {
          setIsEducationInfoExists(false);
        }
      }
    };
    getEducationalBackground();
  }, []);

  const addIPFS = async () => {
    const input = educationTableRef.current;
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
    setIsLoading(true);
    const ipfsHash = await addIPFS();
    if (ipfsHash) {
      const addBlockchainData: AddBlockChainType = {
        id: educationalBackground?._id,
        smartContract: smartContract,
        ipfsHash,
      };

      const res = await fetch('/api/user/educationalBackground/addBlockchain', {
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
        setOpenModalForAddBlockchain(false);
        setIsLoading(false);
      } else {
        setOpenModalForAddBlockchain(false);
        setEducationalBackground(data.eb);
        setIsLoading(false);
        setIsButtonVisible(false);
        // setIPFSURL(`https://ipfs.io/ipfs/${data.eb.ipfsHash}`);
        setIPFSURL(
          `https://neu-my-devlet.s3.eu-north-1.amazonaws.com/${data.eb.ipfsHash}`
        );
        toast.success(data.message);
      }
    }
  };

  return (
    <Box
      sx={{
        mt: '20px',
      }}
    >
      {isEducationInfoExists ? (
        <>
          {educationalBackground?.schoolInfos ? (
            <Box
              sx={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SchoolInfoTable
                {...{ educationalBackground, educationTableRef }}
              />
              {isButtonVisible ? (
                <Button
                  onClick={() => setOpenModalForAddBlockchain(true)}
                  className={inter.className}
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
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: {
                      xs: 'column',
                      sm: 'row',
                    },
                  }}
                >
                  <Link href={ipfsURL} target="_blank">
                    <Button
                      className={inter.className}
                      type="button"
                      sx={{
                        color: '#FFFDFF',
                        fontWeight: '500',
                        fontSize: '13px',
                        height: { xs: '49px', md: '59px' },
                        width: { xs: '100%', sm: '200px' },
                        mt: '30px',
                        display: 'inline',
                        borderRadius: '15px',
                        bgcolor: '#317DED',
                        boxShadow: '0px 4px 10px 0px #00000040',
                        '&:hover': {
                          scale: '1.02',
                          transition: 'transform 0.3s ease',
                        },
                      }}
                      variant="contained"
                    >
                      <Typography
                        className={inter.className}
                        sx={{
                          color: '#FFFDFF',
                          fontWeight: 500,
                          fontSize: '13px',
                        }}
                      >
                        Go to PDF
                      </Typography>
                    </Button>
                  </Link>
                  <Button
                    className={inter.className}
                    type="button"
                    onClick={() => setOpenModal(true)}
                    sx={{
                      color: '#FFFDFF',
                      fontWeight: '500',
                      fontSize: '13px',
                      height: { xs: '49px', md: '59px' },
                      ml: { xs: '0px', sm: '13px' },
                      width: { xs: '100%', sm: '200px' },
                      mt: '30px',
                      display: 'inline',
                      borderRadius: '15px',
                      background:
                        'linear-gradient(45deg, #dc2626 2.08%, #991b1b 100%)',
                      boxShadow: '0px 4px 10px 0px #00000040',
                      '&:hover': {
                        scale: '1.02',
                        transition: 'transform 0.3s ease',
                      },
                    }}
                    variant="contained"
                  >
                    <Typography
                      className={inter.className}
                      sx={{
                        color: '#FFFDFF',
                        fontWeight: 500,
                        fontSize: '13px',
                      }}
                    >
                      Open PDF
                    </Typography>
                  </Button>
                  <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box
                      sx={{
                        border: 'none',
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', md: 900 },
                        height: { xs: '60%', md: 700 },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                      }}
                    >
                      <iframe src={ipfsURL} width="100%" height="100%" />
                    </Box>
                  </Modal>
                </Box>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress size={33} sx={{ mt: '30px', color: '#333' }} />
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            className={inter.className}
            sx={{
              color: '#555',
              fontWeight: 500,
              fontSize: '17px',
            }}
          >
            You don&apos;t have any education info
          </Typography>
        </Box>
      )}

      <Modal
        open={openModalForAddBlockchain}
        onClose={() => setOpenModalForAddBlockchain(false)}
      >
        <Box
          sx={{
            border: 'none',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', md: 400 },
            height: { xs: '60%', md: 250 },
            bgcolor: 'background.paper',
            boxShadow: 24,
          }}
        >
          {smartContracts.length > 0 ? (
            <Box
              component="form"
              onSubmit={addBlockChain}
              sx={{
                p: { xs: '15px', sm: '23px' },
              }}
            >
              <Typography
                className={inter.className}
                sx={{
                  color: '#333',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '18px',
                }}
              >
                Add to Blockchain
              </Typography>
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
                  {smartContracts?.map(
                    (smartContract: SmartContractReturnType) => (
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
                    )
                  )}
                </Select>
                <Button
                  onClick={() => setOpenModalForAddBlockchain(true)}
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
                    '&:hover': {
                      scale: '1.02',
                      transition: 'transform 0.3s ease',
                    },
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
      </Modal>
    </Box>
  );
}

export default EducationalBackground;
