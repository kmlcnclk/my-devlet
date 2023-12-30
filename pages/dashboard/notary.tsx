import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Sidebar';
import RequireAuth from '@/components/RequireAuth';
import FetchUser from '@/components/FetchUser';
import Notary from '@/components/Notary';
import FetchSmartContracts from '@/components/FetchSmartContracts';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <FetchSmartContracts>
            <Sidebar pageTitle="Notary">
              <Notary />
            </Sidebar>
          </FetchSmartContracts>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
