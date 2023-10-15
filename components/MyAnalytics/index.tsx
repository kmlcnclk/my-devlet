import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Typography from '@mui/material/Typography';
import { Inter } from 'next/font/google';
import TopSide from './TopSide';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { SmartContractReturnType } from '@/types/SmartContract';

const inter = Inter({ subsets: ['latin'] });

type DataType = {
  name: string;
  nfts: number;
  sm: number;
  cus: number;
};

function MyAnalytics() {
  const smartContracts: SmartContractReturnType[] = useSelector(
    (state: RootState) => state.smartContracts.values
  ) as SmartContractReturnType[];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const data = useMemo(() => {
    let data = [];
    for (let i = 0; i < 12; i++) {
      const cur_smart_contracts = smartContracts.filter((sm) => {
        if (new Date(sm.createdAt).getMonth() == i) {
          return sm;
        }
      });
      data.push({
        name: months[i],
        sm: cur_smart_contracts.length,
      });
    }
    return data;
  }, [months]);

  return (
    <Box>
      <TopSide />
      {data.length > 0 ? (
        <Box
          sx={{
            mt: '40px',
            border: '1px solid #999',
            width: '100%',
            height: '600px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 3px 20px 5px #0000001A',
            borderRadius: '20px',
            p: '20px',
          }}
        >
          <Typography
            className={inter.className}
            sx={{
              color: '#666666',
              fontWeight: 700,
              fontSize: '30px',
              mb: '30px',
              mt: '10px',
              ml: '70px',
            }}
          >
            Analytical Overview
          </Typography>
          <Box
            sx={{
              position: 'relative',
              display: { xs: 'none', lg: 'block' },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                right: { lg: '-66px', xl: '-46px' },
                mt: '20px',
                top: '0px',
              }}
            >
              <Box
                sx={{
                  width: '10%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  className={inter.className}
                  sx={{
                    color: '#f0ad4e',
                    fontWeight: 500,
                    textAlign: 'center',
                    fontSize: '18px',
                    mt: '20px',
                  }}
                >
                  Smart Contracts
                </Typography>
                <Typography
                  className={inter.className}
                  sx={{
                    color: '#666666',
                    fontWeight: 700,
                    fontSize: '25px',
                    mt: '20px',
                  }}
                >
                  {smartContracts.length}
                </Typography>
              </Box>
            </Box>
          </Box>
          <ResponsiveContainer width="85%" height="80%">
            <LineChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="nfts"
                stroke="#22bb33"
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="sm"
                stroke="#f0ad4e"
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="cus"
                stroke="#f0ad4e"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : null}
    </Box>
  );
}

export default MyAnalytics;
