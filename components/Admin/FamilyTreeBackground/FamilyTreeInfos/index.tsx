import { getAdminAccessTokenFromLocalStorage } from '@/localstorage/adminAccessTokenStorage';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  familyTreeInfos: any;
  setFamilyTreeInfos: Function;
  userId: string;
  isUserSelected: boolean;
  setFile: Function;
  setRatio: Function;
}

const FamilyTreeInfos: React.FC<Props> = ({
  familyTreeInfos,
  setFamilyTreeInfos,
  userId,
  isUserSelected,
  setFile,
  setRatio,
}: Props) => {
  const [sequenceNumber, setSequenceNumber] = useState('');
  const [gender, setGender] = useState('');
  const [degreeOfRelationship, setDegreeOfRelationship] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [mothersName, setMothersName] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [
    cityDistrictNeighbourhoodVillage,
    setCityDistrictNeighbourhoodVillage,
  ] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [status, setStatus] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitFamilyTreeInfos = async (e: any) => {
    e.preventDefault();

    if (isUserSelected) {
      if (familyTreeInfos.length > 0) {
        setIsLoading(true);
        const familyTreeData = {
          userId,
          familyTreeInfos,
        };

        const res = await fetch('/api/admin/familyTreeBackground/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(familyTreeData),
        });

        const data = await res.json();
        if (res.ok) {
          setIsLoading(false);
          toast.success(data.message);
        } else {
          if (data?.error?.message === 'User has already Family Tree infos') {
            const familyTreeData = {
              userId,
              familyTreeInfos,
            };

            const res = await fetch('/api/admin/familyTreeBackground/update', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
              },
              body: JSON.stringify(familyTreeData),
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
        setSequenceNumber('');
        setGender('');
        setDegreeOfRelationship('');
        setName('');
        setSurname('');
        setFathersName('');
        setMothersName('');
        setPlaceOfBirth('');
        setDateOfBirth('');
        setCityDistrictNeighbourhoodVillage('');
        setMaritalStatus('');
        setStatus('');
        setDateOfDeath('');
        setFile(null);
        setFamilyTreeInfos([]);
        setRatio(0);
      } else {
        toast.info('You have to enter at least one family info');
      }
    } else {
      toast.info('You have to enter a user id');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitFamilyTreeInfos}
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
            width: { xs: '100%', md: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Sequence Number
          </Typography>
          <Box
            component="input"
            value={sequenceNumber}
            onChange={(e: any) => setSequenceNumber(e.target.value)}
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
            width: { xs: '100%', md: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Degree of Relationship
          </Typography>
          <Box
            component="input"
            value={degreeOfRelationship}
            onChange={(e: any) => setDegreeOfRelationship(e.target.value)}
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'flex-start' },
            flexDirection: 'column',
            width: { xs: '100%', md: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Name
          </Typography>
          <Box
            component="input"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
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
            width: { xs: '100%', md: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Surname
          </Typography>
          <Box
            component="input"
            value={surname}
            onChange={(e: any) => setSurname(e.target.value)}
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'flex-start' },
            flexDirection: 'column',
            width: { xs: '100%', md: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Father's Name
          </Typography>
          <Box
            component="input"
            value={fathersName}
            onChange={(e: any) => setFathersName(e.target.value)}
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
            width: { xs: '100%', md: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Mother's Name
          </Typography>
          <Box
            component="input"
            value={mothersName}
            onChange={(e: any) => setMothersName(e.target.value)}
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'flex-start' },
            flexDirection: 'column',
            width: { xs: '100%', md: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Place of Birth
          </Typography>
          <Box
            component="input"
            value={placeOfBirth}
            onChange={(e: any) => setPlaceOfBirth(e.target.value)}
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
            width: { xs: '100%', md: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            City District Neighbourhood/Village
          </Typography>
          <Box
            component="input"
            value={cityDistrictNeighbourhoodVillage}
            onChange={(e: any) =>
              setCityDistrictNeighbourhoodVillage(e.target.value)
            }
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'flex-start' },
            flexDirection: 'column',
            width: { xs: '100%', md: '49%' },
          }}
        >
          <Typography
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            Marital Status
          </Typography>
          <Box
            component="input"
            value={maritalStatus}
            onChange={(e: any) => setMaritalStatus(e.target.value)}
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
            Status
          </Typography>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{
              bgcolor: '#F8F9F8',
              boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              p: '0px',
              color: '#666666',
              height: '40px',
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            {['Death', 'Live']?.map((defaultStateOfFamilyTree: string, i) => (
              <MenuItem
                key={i}
                value={defaultStateOfFamilyTree}
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
                  {defaultStateOfFamilyTree}
                </Typography>
              </MenuItem>
            ))}
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
            Gender
          </Typography>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            sx={{
              bgcolor: '#F8F9F8',
              boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              p: '0px',
              color: '#666666',
              height: '40px',
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            {['Male', 'Female']?.map((defaultStateOfFamilyTree: string, i) => (
              <MenuItem
                key={i}
                value={defaultStateOfFamilyTree}
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
                  {defaultStateOfFamilyTree}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
        <DatePicker
          label="Date of Birth "
          value={dateOfBirth}
          onChange={(e: any) => {
            setDateOfBirth(new Date(e).toString());
          }}
          sx={{
            width: '100%',
            ml: { xs: '0px', sm: '20px' },
            mt: { xs: '30px', sm: '0px' },
          }}
        />
        <DatePicker
          label="Date of Death"
          value={dateOfDeath}
          onChange={(e: any) => {
            setDateOfDeath(new Date(e).toString());
          }}
          sx={{
            width: '100%',
            ml: { xs: '0px', sm: '20px' },
            mt: { xs: '30px', sm: '0px' },
          }}
        />
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
            setFamilyTreeInfos((prev: any) => {
              const updatedPrev = [...prev];
              const data = {
                sequenceNumber,
                gender,
                degreeOfRelationship,
                name,
                surname,
                fathersName,
                mothersName,
                placeOfBirth,
                dateOfBirth,
                cityDistrictNeighbourhoodVillage,
                maritalStatus,
                status,
                dateOfDeath,
              };
              updatedPrev.push(data);
              return updatedPrev;
            });
            setSequenceNumber('');
            setGender('');
            setDegreeOfRelationship('');
            setName('');
            setSurname('');
            setFathersName('');
            setMothersName('');
            setPlaceOfBirth('');
            setDateOfBirth('');
            setCityDistrictNeighbourhoodVillage('');
            setMaritalStatus('');
            setStatus('');
            setDateOfDeath('');
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

export default FamilyTreeInfos;
