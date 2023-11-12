import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import EducationalBackground from '@/components/Admin/AddBlockchain/EducationalBackground';
import FetchSmartContracts from '@/components/Admin/FetchSmartContracts';
import RequireAdmin from '@/components/Admin/RequireRole';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <FetchSmartContracts>
            <RequireAdmin>
              <Sidebar pageTitle="Educational Background">
                <EducationalBackground />
              </Sidebar>
            </RequireAdmin>
          </FetchSmartContracts>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
