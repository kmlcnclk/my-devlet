import { getAdminAccessTokenFromLocalStorage } from '@/localstorage/adminAccessTokenStorage';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  notaryInfos: any;
  setNotaryInfos: Function;
  userId: string;
  isUserSelected: boolean;
  setFile: Function;
  setRatio: Function;
}

const NotaryInfos: React.FC<Props> = ({
  notaryInfos,
  setNotaryInfos,
  userId,
  isUserSelected,
  setFile,
  setRatio,
}: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notaryName, setNotaryName] = useState('');
  const [typeOfDocument, setTypeOfDocument] = useState('');
  const [partiesInvolved, setPartiesInvolved] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitNotaryInfos = async (e: any) => {
    e.preventDefault();

    if (isUserSelected) {
      if (notaryInfos.length > 0) {
        setIsLoading(true);
        const notaryData = {
          userId,
          notaryInfos: notaryInfos,
        };

        const res = await fetch('/api/admin/notary/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(notaryData),
        });

        const data = await res.json();
        if (res.ok) {
          setIsLoading(false);
          toast.success(data.message);
        } else {
          if (data?.error?.message === 'User has already notary infos') {
            const notaryData = {
              userId,
              notaryInfos: notaryInfos,
            };

            const res = await fetch('/api/admin/notary/update', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
              },
              body: JSON.stringify(notaryData),
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
        setNotaryName('');
        setTitle('');
        setDescription('');
        setPartiesInvolved('');
        setTypeOfDocument('');
        setFile(null);
        setNotaryInfos([]);
        setRatio(0);
      } else {
        toast.info('You have to enter at least one notary info');
      }
    } else {
      toast.info('You have to enter a user id');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitNotaryInfos}
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
            Notary Name
          </Typography>
          <Box
            component="input"
            value={notaryName}
            onChange={(e: any) => setNotaryName(e.target.value)}
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
            Title
          </Typography>
          <Box
            component="input"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
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
            width: { xs: '100%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Type of Document
          </Typography>
          <Box
            component="input"
            value={typeOfDocument}
            onChange={(e: any) => setTypeOfDocument(e.target.value)}
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
            Description
          </Typography>
          <Box
            component="textarea"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            sx={{
              width: '100%',
              height: '100px',
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
            Parties Involved
          </Typography>
          <Box
            component="textarea"
            value={partiesInvolved}
            onChange={(e: any) => setPartiesInvolved(e.target.value)}
            sx={{
              width: '100%',
              height: '100px',
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
        }}
      >
        <Button
          onClick={() => {
            setNotaryInfos((prev: any) => {
              const updatedPrev = [...prev];
              const data = {
                notaryName,
                title,
                description,
                typeOfDocument,
                partiesInvolved,
              };
              updatedPrev.push(data);
              return updatedPrev;
            });
            setNotaryName('');
            setTitle('');
            setDescription('');
            setPartiesInvolved('');
            setTypeOfDocument('');
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

export default NotaryInfos;
