import React from 'react';
import clsx from 'clsx';
import MainSidebar from './MainSidebar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import SidebarWrapper from './SidebarWrapper';
import VerticalNav from '../VerticalNav';
import AppScrollbar from '../AppScrollbar';
import { useRouter } from 'next/router';
import { routesForMenu } from '@/constants/routes';
import { Button, Typography } from '@mui/material';
import { sendToken } from '@/lib/sendToken';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface MobileSidebarProps {
  isCollapsedMobile: boolean;
  setCollapsedMobile: (isCollapsedMobile: boolean) => void;
  isCollapsed?: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
}

function MobileSidebar({
  isCollapsedMobile,
  setCollapsedMobile,
  isCollapsed,
  setCollapsed,
}: MobileSidebarProps) {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'block',
            lg: routesForMenu.includes(router.asPath) ? 'block' : 'none',
          },
        }}
      >
        <Drawer
          anchor="left"
          open={isCollapsedMobile}
          onClose={() => setCollapsedMobile(!isCollapsedMobile)}
          classes={{
            root: clsx(''),
            paper: clsx(''),
          }}
          style={{ position: 'absolute' }}
        >
          <SidebarWrapper className="mini-sidebar">
            <MainSidebar>
              <AppScrollbar
                sx={{
                  py: 2,
                  height: 'calc(100vh - 70px) !important',
                }}
              >
                <VerticalNav />
              </AppScrollbar>
            </MainSidebar>
          </SidebarWrapper>
          <Button
            type="button"
            onClick={sendToken}
            id="buy-token"
            sx={{
              position: 'fixed',
              bottom: 10,
              left: 10,
              zIndex: 1300,
              background: 'linear-gradient(90deg, #2563eb 2.08%, #1e40af 100%)',
              width: '260px',
              height: '50px',
              textTransform: 'initial',
              borderRadius: '20px',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <Typography
              className={inter.className}
              sx={{
                color: '#f3f3f3',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Buy Token
            </Typography>
          </Button>
        </Drawer>
      </Box>
      <Box
        sx={{
          display: {
            xs: 'none',
            lg: routesForMenu.includes(router.asPath) ? 'none' : 'block',
          },
        }}
      >
        <SidebarWrapper className="mini-sidebar">
          <MainSidebar>
            <AppScrollbar
              sx={{
                py: 2,
                height: 'calc(100vh - 70px) !important',
              }}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </SidebarWrapper>
        <Button
          type="button"
          onClick={sendToken}
          id="buy-token"
          sx={{
            position: 'fixed',
            bottom: 10,
            left: 10,
            zIndex: 1300,
            background: 'linear-gradient(90deg, #2563eb 2.08%, #1e40af 100%)',
            width: '260px',
            height: '50px',
            textTransform: 'initial',
            borderRadius: '20px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <Typography
            className={inter.className}
            sx={{
              color: '#f3f3f3',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Buy Token
          </Typography>
        </Button>
      </Box>
    </>
  );
}
export default MobileSidebar;
