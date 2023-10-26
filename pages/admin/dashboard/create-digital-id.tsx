import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import CreateDigitalId from '@/components/Admin/CreateDigitalId';
import RequireAdmin from '@/components/Admin/RequireRole';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <RequireAdmin>
            <Sidebar pageTitle="Create Digital Id">
              <CreateDigitalId />
            </Sidebar>
          </RequireAdmin>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
