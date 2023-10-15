import React, { ReactNode, useState, useEffect } from 'react';
import AppHeader from './AppHeader';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import SidebarWrapper from './SidebarWrapper';
import SidebarContainer from './SidebarContainer';
import MobileSidebar from './MobileSidebar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
// import LogoutIcon from "@/icons/LogoutIcon";

import { deleteAccessTokenFromLocalStorage } from '@/localstorage/accessTokenStorage';
import { deleteRefreshTokenFromLocalStorage } from '@/localstorage/refreshTokenStorage';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
const Tour = dynamic(() => import('../Tour'), { ssr: false });
import {
  addLeftMenuTourToLocalStorage,
  getLeftMenuTourFromLocalStorage,
} from '@/localstorage/leftMenuStorage';
import { routesForMenu } from '@/constants/routes';
import LogoutIcon from '@mui/icons-material/Logout';
import FetchSmartContracts from '../FetchSmartContracts';

const inter = Inter({ subsets: ['latin'] });
interface SidebarProps {
  children?: ReactNode;
  pageTitle: string;
}

function Sidebar({ children, pageTitle }: SidebarProps) {
  const router = useRouter();

  const [isCollapsed, setCollapsed] = useState(true);
  const [isCollapsedMobile, setCollapsedMobile] = useState(false);

  const username: string = useSelector(
    (state: RootState) => state.user.value.name
  ) as string;

  const steps: any = [
    {
      content: <h2>Begin your journey!</h2>,
      locale: { skip: <strong aria-label="skip">SKIP</strong> },
      placement: 'center',
      target: 'body',
    },
    {
      content: <h3>You can see your Education infos here</h3>,
      placement: 'right',
      spotlightPadding: 20,
      styles: {
        options: {
          width: 350,
        },
      },
      target: '#educational-background',
    },
    {
      content: <h3>You can create your Smart Contracts here</h3>,
      placement: 'right',
      spotlightPadding: 20,
      styles: {
        options: {
          width: 330,
        },
      },
      target: '#smart-contract',
    },
    {
      content: <h3>You can see your Smart Contracts here</h3>,
      placement: 'right',
      spotlightPadding: 20,
      styles: {
        options: {
          width: 330,
        },
      },
      target: '#smart-contracts',
    },
    {
      content: <h3>You can see your profile here</h3>,
      placement: 'right',
      spotlightPadding: 20,
      styles: {
        options: {
          width: 300,
        },
      },
      target: '#profile',
    },
    {
      content: <h3>You can buy Token here</h3>,
      placement: 'top',
      spotlightPadding: 20,
      styles: {
        options: {
          width: 300,
        },
      },
      target: '#buy-token',
    },
  ];

  return (
    <SidebarContainer>
      {typeof window !== 'undefined' && (
        <Tour
          run={getLeftMenuTourFromLocalStorage() !== 'true'}
          setRun={addLeftMenuTourToLocalStorage}
          steps={steps}
        />
      )}
      <FetchSmartContracts>
        <SidebarWrapper
          className={clsx('appMainFixedHeader', {
            'mini-sidebar-collapsed': !isCollapsed,
          })}
        >
          <MobileSidebar
            isCollapsedMobile={isCollapsedMobile}
            setCollapsedMobile={setCollapsedMobile}
            setCollapsed={setCollapsed}
            isCollapsed={isCollapsed}
          />
          <Box className="mainContent">
            <AppHeader
              setCollapsedMobile={setCollapsedMobile}
              isCollapsedMobile={isCollapsedMobile}
            />
            <Box
              sx={{
                mb: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Box
                sx={{
                  fontSize: '30px',
                  '&, & span': {
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              >
                {!routesForMenu.includes(router.asPath) && (
                  <>
                    {router.asPath === '/dashboard' ? (
                      <>
                        <Typography
                          sx={{
                            fontSize: { xs: '20px', md: '30px' },
                          }}
                        >
                          Hi,
                        </Typography>
                        <Box
                          component="span"
                          sx={{ fontWeight: 'bold', marginLeft: '5px' }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: '20px', md: '30px' },
                              fontWeight: 'bold',
                            }}
                          >
                            {username}!{' '}
                          </Typography>
                          <Box
                            component="img"
                            src="/images/confetti.png"
                            sx={{ marginLeft: '5px' }}
                          />
                        </Box>
                      </>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: { xs: '20px', md: '30px' },
                          '&, & span': {
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                        <Box component="span" fontWeight="bold">
                          {pageTitle}
                        </Box>
                      </Typography>
                    )}
                  </>
                )}
              </Box>
              {!routesForMenu.includes(router.asPath) && (
                <Box
                  sx={{
                    display: { xs: 'none', lg: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    mr:
                      router.asPath == '/dashboard/create-rule'
                        ? '50px'
                        : '0px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: '24px',
                    }}
                  >
                    <PersonIcon
                      sx={{
                        color: '#666666',
                        mr: '10px',
                      }}
                    />
                    <Typography
                      className={inter.className}
                      sx={{
                        fontSize: '13px',
                        fontWeight: 400,
                        color: '#666666',
                      }}
                    >
                      {username}
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      cursor: 'pointer',
                      width: '120px',
                      height: '34.29px',
                      border: '2px solid transparent',
                      borderRadius: '20px',
                      background:
                        'linear-gradient(white, white) padding-box, linear-gradient(90deg, #D31027 0%, #EA384D 100%) border-box',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      '&:hover': {
                        scale: '102%',
                        border: '2px solid transparent',
                        background:
                          'linear-gradient(white, white) padding-box, linear-gradient(90deg, #D31027 0%, #EA384D 100%) border-box',
                      },
                    }}
                    onClick={() => {
                      deleteAccessTokenFromLocalStorage();
                      deleteRefreshTokenFromLocalStorage();
                      setTimeout(() => {
                        router.push('/sign-in');
                      }, 1000);
                    }}
                    variant="outlined"
                    disableRipple
                  >
                    <Typography
                      className={inter.className}
                      sx={{
                        fontSize: '13px',
                        fontWeight: 600,
                        mb: '-2px',
                        background:
                          'linear-gradient(90deg, #D31027 0%, #EA384D 100%)',
                        WebkitTextFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        mr: '5px',
                      }}
                    >
                      Logout
                    </Typography>
                    <LogoutIcon
                      sx={{
                        width: '17px',
                        color: '#EA384D',
                      }}
                    />
                  </Button>
                </Box>
              )}
            </Box>
            {children}
          </Box>
        </SidebarWrapper>
      </FetchSmartContracts>
    </SidebarContainer>
  );
}

export default Sidebar;
