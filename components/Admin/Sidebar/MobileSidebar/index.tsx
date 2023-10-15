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
                  height: 'calc(100vh) !important',
                }}
              >
                <VerticalNav />
              </AppScrollbar>
            </MainSidebar>
          </SidebarWrapper>
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
                height: 'calc(100vh) !important',
              }}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </SidebarWrapper>
      </Box>
    </>
  );
}
export default MobileSidebar;
