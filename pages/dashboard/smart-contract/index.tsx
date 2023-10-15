import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Sidebar';
import SmartContract from '@/components/SmartContract';
import RequireAuth from '@/components/RequireAuth';
import FetchUser from '@/components/FetchUser';
import FetchSmartContracts from '@/components/FetchSmartContracts';

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
