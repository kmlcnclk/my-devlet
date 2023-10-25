import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import SchoolBackground from '@/components/Admin/SchoolBackground';
import RequireAdmin from '@/components/Admin/RequireRole';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <RequireAdmin>
            <Sidebar pageTitle="School Background">
              <SchoolBackground />
            </Sidebar>
          </RequireAdmin>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
