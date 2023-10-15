import React from "react";
import type { NextPage } from "next";

import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";
import FetchUser from "@/components/FetchUser";
import RequireAuth from "@/components/RequireAuth";

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <Sidebar pageTitle="Profile">
            <Profile />
          </Sidebar>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
