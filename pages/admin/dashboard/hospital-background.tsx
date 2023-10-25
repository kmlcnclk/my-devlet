import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import HospitalBackground from '@/components/Admin/HospitalBackground';
import RequireAdmin from '@/components/Admin/RequireRole';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <RequireAdmin>
            <Sidebar pageTitle="Hospital Background">
              <HospitalBackground />
            </Sidebar>
          </RequireAdmin>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
