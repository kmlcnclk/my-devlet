import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import { deleteAccessTokenFromLocalStorage } from '@/localstorage/accessTokenStorage';
import { deleteRefreshTokenFromLocalStorage } from '@/localstorage/refreshTokenStorage';
import { useRouter } from 'next/router';
import LogoutIcon from '@/icons/LogoutIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import CloseIcon from '@mui/icons-material/Close';
import { routesForMenu } from '@/constants/routes';

interface AppHeaderProps {
  isCollapsedMobile?: boolean;
  setCollapsedMobile: (isCollapsedMobile: boolean) => void;
}

function AppHeader({ isCollapsedMobile, setCollapsedMobile }: AppHeaderProps) {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box
      sx={{
        display: {
          xs: 'block',
          lg: routesForMenu.includes(router.asPath) ? 'block' : 'none',
        },
      }}
    >
      <AppBar
        position="relative"
        color="inherit"
        sx={{
          boxShadow: 'none',
          borderBottom: (theme: any) => `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
          transition: 'width 0.5s ease',
          width: '100%',
          display: 'block',
        }}
        className="app-bar"
      >
        <Toolbar
          sx={{
            boxSizing: 'border-box',
            minHeight: { xs: 56, sm: 70 },
            paddingLeft: { xs: 5, lg: '30px' },
            paddingRight: { xs: 5, lg: '30px' },
          }}
        >
          <Box
            sx={{
              display: {
                xs: 'flex',
                lg: routesForMenu.includes(router.asPath) ? 'block' : 'none',
              },
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <IconButton
                sx={{
                  color: 'text.secondary',
                }}
                edge="start"
                className="menu-btn"
                color="inherit"
                aria-label="open drawer"
                onClick={() => {
                  setCollapsedMobile(!isCollapsedMobile);
                }}
                size="small"
              >
                <MenuIcon
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                />
              </IconButton>

              <Box
                sx={{
                  mb: '-6px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  deleteAccessTokenFromLocalStorage();
                  deleteRefreshTokenFromLocalStorage();
                  setTimeout(() => {
                    router.push('/sign-in');
                  }, 1000);
                }}
              >
                <LogoutIcon />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default AppHeader;
