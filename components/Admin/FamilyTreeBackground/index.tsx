import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FamilyTreeInfos from './FamilyTreeInfos';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { toast } from 'react-toastify';
import Upload from '../Upload';
import { File } from 'buffer';
import Fonts from '@/constants/fonts';
import { createXLSXFileForFamilyTree } from '@/lib/xlsxFileCreators';
import { createCSVFileForFamilyTree } from '@/lib/csvFileCreators';
import { createJSONFileForFamilyTree } from '@/lib/jsonFileCreators';

function FamilyTreeBackground() {
  const [userId, setUserId] = useState<string>('');
  const [familyTreeInfos, setFamilyTreeInfos] = useState<any>([]);
  const [isUserSelected, setIsUserSelected] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);

  const [ratio, setRatio] = useState<number>(0);

  const [xlsxFileURL, setXLSXFileURL] = useState<string>('');
  const [csvFileURL, setCSVFileURL] = useState<string>('');
  const [jsonFileURL, setJSONFileURL] = useState<string>('');

  useEffect(() => {
    if (typeof window != 'undefined') {
      const { url: xlsxURL } = createXLSXFileForFamilyTree();
      const { url: csvURL } = createCSVFileForFamilyTree();
      const { url: jsonURL } = createJSONFileForFamilyTree();

      setXLSXFileURL(xlsxURL);
      setCSVFileURL(csvURL);
      setJSONFileURL(jsonURL);
    }
  }, []);

  return (
    <Box
      id="title-inputs"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          my: '30px',
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
            className="titles-label"
            sx={{ fontWeight: '500', fontSize: { xs: '14px', sm: '18px' } }}
          >
            User Id:
          </Typography>
          <Box
            component="input"
            required
            disabled={Boolean(userId) && isUserSelected}
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

        <Button
          onClick={() => {
            if (userId) {
              setIsUserSelected(true);
            } else {
              toast.info('You have to enter an user id');
            }
          }}
          type="button"
          sx={{
            ml: { xs: '0px', sm: '20px' },
            color: '#FFFDFF',
            fontWeight: '500',
            fontSize: '15px',
            height: '40px',
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
          Select
        </Button>
      </Box>
      {familyTreeInfos.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            margin: 'auto',
            width: '100%',
            overflowX: 'scroll',
          }}
        >
          <Table
            aria-label="FamilyTree Info Table"
            sx={{
              minWidth: 650,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Sequence Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Gender</strong>
                </TableCell>
                <TableCell>
                  <strong>Degree of Relationship</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Surname</strong>
                </TableCell>
                <TableCell>
                  <strong>Father's Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Mother's Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Place of Birth</strong>
                </TableCell>
                <TableCell>
                  <strong>Date of Birth</strong>
                </TableCell>
                <TableCell>
                  <strong>City District Neighbourhood/Village</strong>
                </TableCell>
                <TableCell>
                  <strong>Marital Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {familyTreeInfos.map((familyTree: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{familyTree.sequenceNumber}</TableCell>
                  <TableCell>{familyTree.gender}</TableCell>
                  <TableCell>{familyTree.degreeOfRelationship}</TableCell>
                  <TableCell>{familyTree.name}</TableCell>
                  <TableCell>{familyTree.surname}</TableCell>
                  <TableCell>{familyTree.fathersName}</TableCell>
                  <TableCell>{familyTree.mothersName}</TableCell>
                  <TableCell>{familyTree.placeOfBirth}</TableCell>
                  <TableCell>{familyTree.dateOfBirth}</TableCell>
                  <TableCell>
                    {familyTree.cityDistrictNeighbourhoodVillage}
                  </TableCell>
                  <TableCell>{familyTree.maritalStatus}</TableCell>
                  <TableCell>
                    {familyTree.status} / {familyTree.dateOfDeath}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}

      <Box
        sx={{
          height: { xs: 'auto', md: '130px' },
          bgcolor: '#f3f3f3',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          p: '20px',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: '20px',
          mt: '20px',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: '10px', md: '0px' },
          }}
        >
          <Typography
            sx={{
              color: '#333',
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: Fonts.REGULAR,
            }}
          >
            CSV File
          </Typography>
          <a
            href={csvFileURL}
            download="my-devlet-sample.csv"
            style={{
              textDecoration: 'none',
            }}
          >
            <Button
              sx={{
                color: '#FFFDFF',
                fontWeight: '500',
                height: '40px',
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
              <Typography
                sx={{
                  color: '#f3f3f3',
                  fontSize: { xs: '11px', sm: '13px' },
                  fontWeight: Fonts.REGULAR,
                }}
              >
                Download Your Sample File
              </Typography>
            </Button>
          </a>
        </Box>

        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: '20px', md: '0px' },
          }}
        >
          <Typography
            sx={{
              color: '#333',
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: Fonts.REGULAR,
            }}
          >
            Excel File
          </Typography>
          <a
            href={xlsxFileURL}
            download="my-devlet-sample.xlsx"
            style={{
              textDecoration: 'none',
            }}
          >
            <Button
              sx={{
                color: '#FFFDFF',
                fontWeight: '500',
                height: '40px',
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
              <Typography
                sx={{
                  color: '#f3f3f3',
                  fontSize: { xs: '11px', sm: '13px' },
                  fontWeight: Fonts.REGULAR,
                }}
              >
                Download Your Sample File
              </Typography>
            </Button>
          </a>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: '20px', md: '0px' },
          }}
        >
          <Typography
            sx={{
              color: '#333',
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: Fonts.REGULAR,
            }}
          >
            JSON File
          </Typography>
          <a
            href={jsonFileURL}
            download="my-devlet-sample.json"
            style={{
              textDecoration: 'none',
            }}
          >
            <Button
              sx={{
                color: '#FFFDFF',
                fontWeight: '500',
                height: '40px',
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
              <Typography
                sx={{
                  color: '#f3f3f3',
                  fontSize: { xs: '11px', sm: '13px' },
                  fontWeight: Fonts.REGULAR,
                }}
              >
                Download Your Sample File
              </Typography>
            </Button>
          </a>
        </Box>
      </Box>
      <Upload
        {...{
          file,
          setFile,
          setRatio,
          ratio,
        }}
        whichProperty="familyTree"
        setFileData={setFamilyTreeInfos}
      />
      <Typography
        sx={{
          color: '#666',
          fontWeight: 600,
          fontSize: '18px',
          mt: { xs: '14px', md: '30px' },
        }}
      >
        or
      </Typography>
      <FamilyTreeInfos
        {...{
          familyTreeInfos,
          setFamilyTreeInfos,
          userId,
          isUserSelected,
          setFile,
          setRatio,
        }}
      />
    </Box>
  );
}

export default FamilyTreeBackground;
