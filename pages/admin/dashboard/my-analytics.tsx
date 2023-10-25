import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import MyAnalytics from '@/components/Admin/MyAnalytics';
import FetchUser from '@/components/Admin/FetchUser';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchSmartContracts from '@/components/Admin/FetchSmartContracts';

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
