import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import HospitalBackground from '@/components/Admin/AddBlockchain/HospitalBackground';
import FetchSmartContracts from '@/components/Admin/FetchSmartContracts';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <FetchSmartContracts>
            <Sidebar pageTitle="Educational Background">
              <HospitalBackground />
            </Sidebar>
          </FetchSmartContracts>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
