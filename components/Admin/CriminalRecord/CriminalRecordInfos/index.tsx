import { getAdminAccessTokenFromLocalStorage } from '@/localstorage/adminAccessTokenStorage';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  criminalRecordInfos: any;
  setCriminalRecordInfos: Function;
  userId: string;
  isUserSelected: boolean;
  setFile: Function;
  setRatio: Function;
}

const CriminalRecordInfos: React.FC<Props> = ({
  criminalRecordInfos,
  setCriminalRecordInfos,
  userId,
  isUserSelected,
  setFile,
  setRatio,
}: Props) => {
  const [caseNumber, setCaseNumber] = useState('');
  const [court, setCourt] = useState('');
  const [prosecutor, setProsecutor] = useState('');
  const [defendant, setDefendant] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [trialDate, setTrialDate] = useState('');
  const [trialOutcome, setTrialOutcome] = useState('');
  const [evidence, setEvidence] = useState('');
  const [lawyers, setLawyers] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitCriminalRecordInfos = async (e: any) => {
    e.preventDefault();

    if (isUserSelected) {
      if (criminalRecordInfos.length > 0) {
        setIsLoading(true);
        const criminalRecordData = {
          userId,
          criminalRecordInfos: criminalRecordInfos,
        };

        const res = await fetch('/api/admin/criminalRecord/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(criminalRecordData),
        });

        const data = await res.json();
        if (res.ok) {
          setIsLoading(false);
          toast.success(data.message);
        } else {
          if (
            data?.error?.message === 'User has already criminal record infos'
          ) {
            const criminalRecordData = {
              userId,
              criminalRecordInfos: criminalRecordInfos,
            };

            const res = await fetch('/api/admin/criminalRecord/update', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
              },
              body: JSON.stringify(criminalRecordData),
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
        setCaseNumber('');
        setCourt('');
        setProsecutor('');
        setDefendant('');
        setIncidentDate('');
        setTrialDate('');
        setTrialOutcome('');
        setEvidence('');
        setLawyers('');
        setFile(null);
        setCriminalRecordInfos([]);
        setRatio(0);
      } else {
        toast.info('You have to enter at least one criminalRecord info');
      }
    } else {
      toast.info('You have to enter a user id');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitCriminalRecordInfos}
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
            Case Number
          </Typography>
          <Box
            component="input"
            value={caseNumber}
            onChange={(e: any) => setCaseNumber(e.target.value)}
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
            Court
          </Typography>
          <Box
            component="input"
            value={court}
            onChange={(e: any) => setCourt(e.target.value)}
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
            Prosecutor
          </Typography>
          <Box
            component="input"
            value={prosecutor}
            onChange={(e: any) => setProsecutor(e.target.value)}
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
            Defendant
          </Typography>
          <Box
            component="input"
            value={defendant}
            onChange={(e: any) => setDefendant(e.target.value)}
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
            justifyContent: 'space-around',
            width: { xs: '100%', sm: '49%' },
          }}
        >
          <DatePicker
            label="Incident Date"
            value={incidentDate}
            onChange={(e: any) => {
              setIncidentDate(new Date(e).toString());
            }}
          />
          <DatePicker
            label="Trial Date"
            value={trialDate}
            onChange={(e: any) => setTrialDate(new Date(e).toString())}
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
            Trial Outcome
          </Typography>
          <Box
            component="textarea"
            value={trialOutcome}
            onChange={(e: any) => setTrialOutcome(e.target.value)}
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
          mt: '20px',
        }}
      >
        {' '}
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
            Evidence
          </Typography>
          <Box
            component="textarea"
            value={evidence}
            onChange={(e: any) => setEvidence(e.target.value)}
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
            Lawyers
          </Typography>
          <Box
            component="textarea"
            value={lawyers}
            onChange={(e: any) => setLawyers(e.target.value)}
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
            setCriminalRecordInfos((prev: any) => {
              const updatedPrev = [...prev];
              const data = {
                caseNumber,
                court,
                prosecutor,
                defendant,
                incidentDate,
                trialDate,
                trialOutcome,
                evidence,
                lawyers,
              };
              updatedPrev.push(data);
              return updatedPrev;
            });
            setCaseNumber('');
            setCourt('');
            setProsecutor('');
            setDefendant('');
            setIncidentDate('');
            setTrialDate('');
            setTrialOutcome('');
            setEvidence('');
            setLawyers('');
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

export default CriminalRecordInfos;
