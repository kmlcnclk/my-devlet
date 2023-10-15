import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Sidebar';
import MyAnalytics from '@/components/MyAnalytics';
import FetchUser from '@/components/FetchUser';
import RequireAuth from '@/components/RequireAuth';
import FetchSmartContracts from '@/components/FetchSmartContracts';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <FetchSmartContracts>
            <Sidebar pageTitle="MY ANALYTICS">
              <MyAnalytics />
            </Sidebar>
          </FetchSmartContracts>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
