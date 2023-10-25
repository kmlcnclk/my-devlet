import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import SmartContract from '@/components/Admin/SmartContract';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import FetchSmartContracts from '@/components/Admin/FetchSmartContracts';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <FetchSmartContracts>
            <Sidebar pageTitle="Smart Contract">
              <SmartContract />
            </Sidebar>
          </FetchSmartContracts>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
