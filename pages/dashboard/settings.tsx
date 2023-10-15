import React from "react";
import type { NextPage } from "next";

import Sidebar from "@/components/Sidebar";
import RequireAuth from "@/components/RequireAuth";
import FetchUser from "@/components/FetchUser";

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <Sidebar pageTitle="Settings">Coming Soon...</Sidebar>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
