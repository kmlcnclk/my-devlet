import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import Normal from './Normal';
import Uploading from './Uploading';
import {
  readXLSXFileForAsset,
  readXLSXFileForBank,
  readXLSXFileForCriminalRecord,
  readXLSXFileForEducation,
  readXLSXFileForHospital,
  readXLSXFileForNotary,
  readXLSXFileForTaxDebt,
} from '@/lib/xlsxFileReaders';
import { File } from 'buffer';
import { toast } from 'react-toastify';
import {
  readCSVFileForAsset,
  readCSVFileForBank,
  readCSVFileForCriminalRecord,
  readCSVFileForEducation,
  readCSVFileForHospital,
  readCSVFileForNotary,
  readCSVFileForTaxDebt,
} from '@/lib/csvFileReaders';
import {
  readJSONFileForAsset,
  readJSONFileForBank,
  readJSONFileForCriminalRecord,
  readJSONFileForEducation,
  readJSONFileForHospital,
  readJSONFileForNotary,
  readJSONFileForTaxDebt,
} from '@/lib/jsonFileReaders';

interface Props {
  setFile: Function;
  setFileData: Function;
  file: File | null;
  ratio: number;
  setRatio: Function;
  whichProperty: string;
}

const Upload: React.FC<Props> = ({
  setFile,
  setFileData,
  file,
  ratio,
  setRatio,
  whichProperty,
}: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const intervalId = setInterval(() => {
        if (ratio < 100) {
          setRatio((prev: number) => prev + 1);
        } else {
          clearInterval(intervalId);
        }
      }, file?.size / 10000);

      if (ratio > 100) {
        setRatio(100);
      }

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [ratio]);

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].size / 1000000 <= 200
    ) {
      const acceptableTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/json',
      ];
      let res = '';

      for (let acceptableType of acceptableTypes) {
        if (acceptableType == e.dataTransfer.files[0].type) {
          res = acceptableType;
          break;
        }
      }

      if (res) {
        setRatio(0);
        if (
          res ==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          if (whichProperty === 'education') {
            readXLSXFileForEducation(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'bank') {
            readXLSXFileForBank(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'notary') {
            readXLSXFileForNotary(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'taxDebt') {
            readXLSXFileForTaxDebt(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'criminalRecord') {
            readXLSXFileForCriminalRecord(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'hospital') {
            readXLSXFileForHospital(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'asset') {
            readXLSXFileForAsset(e.dataTransfer.files[0], setFileData);
          }
        } else if (res == 'text/csv') {
          if (whichProperty === 'education') {
            readCSVFileForEducation(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'bank') {
            readCSVFileForBank(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'notary') {
            readCSVFileForNotary(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'taxDebt') {
            readCSVFileForTaxDebt(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'criminalRecord') {
            readCSVFileForCriminalRecord(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'hospital') {
            readCSVFileForHospital(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'asset') {
            readCSVFileForAsset(e.dataTransfer.files[0], setFileData);
          }
        } else if (res == 'application/json') {
          if (whichProperty === 'education') {
            readJSONFileForEducation(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'bank') {
            readJSONFileForBank(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'notary') {
            readJSONFileForNotary(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'taxDebt') {
            readJSONFileForTaxDebt(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'criminalRecord') {
            readJSONFileForCriminalRecord(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'hospital') {
            readJSONFileForHospital(e.dataTransfer.files[0], setFileData);
          } else if (whichProperty === 'asset') {
            readJSONFileForAsset(e.dataTransfer.files[0], setFileData);
          }
        }
        setFile(e.dataTransfer.files[0]);
        setRatio(1);
      } else {
        toast.error('This file type is not acceptable');
      }
    } else {
      toast.error('File size is greater than 200MB');
    }
  };

  const onChangeInputFunc = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    if (
      inputRef.current &&
      e.target.files[0] &&
      e.target.files[0].size / 1000000 <= 200
    ) {
      const acceptableTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/json',
      ];
      let res = '';

      for (let acceptableType of acceptableTypes) {
        if (acceptableType == e.target.files[0].type) {
          res = acceptableType;
          break;
        }
      }

      if (res) {
        setRatio(0);
        if (
          res ==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          if (whichProperty === 'education') {
            readXLSXFileForEducation(e.target.files[0], setFileData);
          } else if (whichProperty === 'bank') {
            readXLSXFileForBank(e.target.files[0], setFileData);
          } else if (whichProperty === 'notary') {
            readXLSXFileForNotary(e.target.files[0], setFileData);
          } else if (whichProperty === 'taxDebt') {
            readXLSXFileForTaxDebt(e.target.files[0], setFileData);
          } else if (whichProperty === 'criminalRecord') {
            readXLSXFileForCriminalRecord(e.target.files[0], setFileData);
          } else if (whichProperty === 'hospital') {
            readXLSXFileForHospital(e.target.files[0], setFileData);
          } else if (whichProperty === 'asset') {
            readXLSXFileForAsset(e.target.files[0], setFileData);
          }
        } else if (res == 'text/csv') {
          if (whichProperty === 'education') {
            readCSVFileForEducation(e.target.files[0], setFileData);
          } else if (whichProperty === 'bank') {
            readCSVFileForBank(e.target.files[0], setFileData);
          } else if (whichProperty === 'notary') {
            readCSVFileForNotary(e.target.files[0], setFileData);
          } else if (whichProperty === 'taxDebt') {
            readCSVFileForTaxDebt(e.target.files[0], setFileData);
          } else if (whichProperty === 'criminalRecord') {
            readCSVFileForCriminalRecord(e.target.files[0], setFileData);
          } else if (whichProperty === 'hospital') {
            readCSVFileForHospital(e.target.files[0], setFileData);
          } else if (whichProperty === 'asset') {
            readCSVFileForAsset(e.target.files[0], setFileData);
          }
        } else if (res == 'application/json') {
          if (whichProperty === 'education') {
            readJSONFileForEducation(e.target.files[0], setFileData);
          } else if (whichProperty === 'bank') {
            readJSONFileForBank(e.target.files[0], setFileData);
          } else if (whichProperty === 'notary') {
            readJSONFileForNotary(e.target.files[0], setFileData);
          } else if (whichProperty === 'taxDebt') {
            readJSONFileForTaxDebt(e.target.files[0], setFileData);
          } else if (whichProperty === 'criminalRecord') {
            readJSONFileForCriminalRecord(e.target.files[0], setFileData);
          } else if (whichProperty === 'hospital') {
            readJSONFileForHospital(e.target.files[0], setFileData);
          } else if (whichProperty === 'asset') {
            readJSONFileForAsset(e.target.files[0], setFileData);
          }
        }
        setFile(e.target.files[0]);
        setRatio(1);
      } else {
        toast.error('This file type is not acceptable');
      }
    } else {
      toast.error('File size is greater than 200MB');
    }
  };

  return (
    <Box
      id="drag-and-drop"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        minWidth: { xs: '100%' },
        height: '290px',
        bgcolor: '#F8F9F8',
        border: '2px dashed #2F80ED',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mb: { xs: '20px', md: '0px' },
        mt: '29px',
      }}
    >
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={onChangeInputFunc}
        accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv, text/csv, .json, application/json"
      />

      {ratio == 0 ? (
        <Normal {...{ inputRef }} />
      ) : (
        file && <Uploading {...{ ratio, file }} />
      )}
    </Box>
  );
};

export default Upload;
