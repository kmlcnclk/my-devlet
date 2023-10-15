import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import EducationalBackground from '@/components/Admin/EducationalBackground';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <Sidebar pageTitle="Educational Background">
            <EducationalBackground />
          </Sidebar>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
