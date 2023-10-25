import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import EducationalBackground from '@/components/Admin/AddBlockchain/EducationalBackground';
import FetchSmartContracts from '@/components/Admin/FetchSmartContracts';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <FetchSmartContracts>
            <Sidebar pageTitle="Educational Background">
              <EducationalBackground />
            </Sidebar>
          </FetchSmartContracts>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
