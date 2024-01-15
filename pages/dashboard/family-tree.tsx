import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Sidebar';
import RequireAuth from '@/components/RequireAuth';
import FetchUser from '@/components/FetchUser';
import FamilyTreeBackground from '@/components/FamilyTreeBackground';
import FetchSmartContracts from '@/components/FetchSmartContracts';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <FetchSmartContracts>
            <Sidebar pageTitle="Family Tree">
              <FamilyTreeBackground />
            </Sidebar>
          </FetchSmartContracts>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
