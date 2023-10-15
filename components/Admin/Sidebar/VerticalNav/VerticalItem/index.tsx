import React from 'react';
import Box from '@mui/material/Box';
import VerticalNavItem from './VerticalNavItem';
import { useRouter } from 'next/router';
import { Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { SmartContractReturnType } from '@/types/SmartContract';
import { RouterConfigData } from '@/constants/routes';
interface VerticalItemProps {
  item?: any;
}

function VerticalItem({ item }: VerticalItemProps) {
  const router = useRouter();

  function isActive() {
    if (router.asPath === item?.url) return true;
    else if (
      router.pathname === '/dashboard/my-nfts/[id]' &&
      item?.url === '/dashboard/my-nfts'
    ) {
      return true;
    }
    return false;
  }

  if (item.id === 'smart-contracts') {
    const smartContracts: SmartContractReturnType[] = useSelector(
      (state: RootState) => state.smartContracts.values
    ) as SmartContractReturnType[];

    const smartContractsConfig: RouterConfigData[] = smartContracts?.map(
      (smartContract: SmartContractReturnType) => ({
        id: smartContract._id,
        title: smartContract.name,
        type: 'item',
        url: `/dashboard/smart-contract/${smartContract._id}`,
        children: [],
        ml: '55px',
      })
    );

    return (
      <>
        <Box>
          <VerticalNavItem
            sx={{
              width: '75%',
              cursor: 'pointer',
              py: '5px',

              marginLeft: item?.ml ?? '20px',
              borderRadius: '7px',
              '& svg': {
                marginRight: '8px',
                fontSize: '23px',

                color: isActive()
                  ? 'rgba(71, 118, 230, 1)'
                  : 'rgba(102, 102, 102, 1)',
                fill: isActive()
                  ? 'rgba(71, 118, 230, 1)'
                  : 'rgba(102, 102, 102, 1)',
              },

              background:
                isActive() &&
                'linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)',
              backgroundClip: isActive() && 'text',
              WebkitTextFillColor: isActive() && 'transparent',
              marginBottom: '12px',
            }}
          >
            {item.icon}
            <Box
              component="span"
              sx={{
                color: 'rgba(102, 102, 102, 1)',
                fontSize: '16px',
                fontWeight: 'bold',
                pt: '4px',
              }}
            >
              {item.title}
            </Box>
          </VerticalNavItem>
        </Box>
        {smartContracts.length > 0 ? (
          <>
            {smartContractsConfig.map((item: any) => (
              <React.Fragment key={item.id}>
                <VerticalItem item={item} />
              </React.Fragment>
            ))}
          </>
        ) : (
          <Box>
            <VerticalNavItem
              sx={{
                width: '75%',
                cursor: 'pointer',
                py: '5px',

                marginLeft: '51px',
                borderRadius: '7px',
                '& svg': {
                  marginRight: '8px',
                  fontSize: '23px',

                  color: isActive()
                    ? 'rgba(71, 118, 230, 1)'
                    : 'rgba(102, 102, 102, 1)',
                  fill: isActive()
                    ? 'rgba(71, 118, 230, 1)'
                    : 'rgba(102, 102, 102, 1)',
                },

                background:
                  isActive() &&
                  'linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)',
                backgroundClip: isActive() && 'text',
                WebkitTextFillColor: isActive() && 'transparent',
                marginBottom: '12px',
              }}
            >
              <Box
                component="span"
                sx={{
                  color: 'rgba(102, 102, 102, 1)',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  pt: '4px',
                }}
              >
                You don&apos;t have anything
              </Box>
            </VerticalNavItem>
          </Box>
        )}
      </>
    );
  }

  return (
    <Box id={item.id}>
      <>
        {item?.url ? (
          <Link
            underline="none"
            href={item?.url === '/not-active' ? '/' : item?.url!}
            target={
              item.id == 'info' || item.id == 'join-us' ? '_blank' : '_self'
            }
          >
            <VerticalNavItem
              sx={{
                // backgroundColor: isActive() ? "#54457C" : "transparent",
                width: '75%',
                cursor: 'pointer',
                marginLeft: item?.ml ?? '20px',
                borderRadius: '7px',
                py: '5px',
                '& svg': {
                  marginRight: '8px',
                  fontSize: '23px',

                  color: isActive()
                    ? 'rgba(71, 118, 230, 1)'
                    : 'rgba(102, 102, 102, 1)',
                  fill: isActive()
                    ? 'rgba(71, 118, 230, 1)'
                    : 'rgba(102, 102, 102, 1)',
                },

                background:
                  isActive() &&
                  'linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)',
                backgroundClip: isActive() && 'text',
                WebkitTextFillColor: isActive() && 'transparent',
                marginBottom: '12px',
              }}
            >
              {item.icon}
              <Box
                component="span"
                sx={{
                  color: 'rgba(102, 102, 102, 1)',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  pt: '2px',
                }}
              >
                {item.title}
              </Box>
            </VerticalNavItem>
          </Link>
        ) : (
          <Box>
            <VerticalNavItem
              sx={{
                // backgroundColor: isActive() ? "#54457C" : "transparent",
                width: '75%',
                cursor: 'pointer',
                py: '5px',

                marginLeft: item?.ml ?? '20px',
                borderRadius: '7px',
                '& svg': {
                  marginRight: '8px',
                  fontSize: '23px',

                  color: isActive()
                    ? 'rgba(71, 118, 230, 1)'
                    : 'rgba(102, 102, 102, 1)',
                  fill: isActive()
                    ? 'rgba(71, 118, 230, 1)'
                    : 'rgba(102, 102, 102, 1)',
                },

                background:
                  isActive() &&
                  'linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)',
                backgroundClip: isActive() && 'text',
                WebkitTextFillColor: isActive() && 'transparent',
                marginBottom: '12px',
              }}
            >
              {item.icon}
              <Box
                component="span"
                sx={{
                  color: 'rgba(102, 102, 102, 1)',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  pt: '4px',
                }}
              >
                {item.title}
              </Box>
            </VerticalNavItem>
          </Box>
        )}
      </>
      {item?.children?.length != 0 && (
        <>
          {item.children.map((item: any) => (
            <React.Fragment key={item.id}>
              <VerticalItem item={item} />
            </React.Fragment>
          ))}
        </>
      )}
    </Box>
  );
}

export default React.memo(VerticalItem);
