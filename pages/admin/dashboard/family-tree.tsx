import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import FamilyTreeBackground from '@/components/Admin/FamilyTreeBackground';
import RequireAdmin from '@/components/Admin/RequireRole';
import FetchSmartContracts from '@/components/Admin/FetchSmartContracts';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <FetchSmartContracts>
            <RequireAdmin>
              <Sidebar pageTitle="Family Tree">
                <FamilyTreeBackground />
              </Sidebar>
            </RequireAdmin>
          </FetchSmartContracts>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
