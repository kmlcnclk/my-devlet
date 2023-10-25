import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@/components/Admin/Sidebar';
import RequireAuth from '@/components/Admin/RequireAuth';
import FetchUser from '@/components/Admin/FetchUser';
import BankBackground from '@/components/Admin/BankBackground';
import RequireAdmin from '@/components/Admin/RequireRole';

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <RequireAdmin>
            <Sidebar pageTitle="Bank Background">
              <BankBackground />
            </Sidebar>
          </RequireAdmin>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
