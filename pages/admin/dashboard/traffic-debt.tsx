import React from "react";
import type { NextPage } from "next";

import Sidebar from "@/components/Admin/Sidebar";
import RequireAuth from "@/components/Admin/RequireAuth";
import FetchUser from "@/components/Admin/FetchUser";
import TrafficDebt from "@/components/Admin/TrafficDebt";
import RequireAdmin from "@/components/Admin/RequireRole";
import FetchSmartContracts from "@/components/Admin/FetchSmartContracts";

const AppPage: NextPage = () => {
  return (
    <>
      <RequireAuth>
        <FetchUser>
          <FetchSmartContracts>
            <RequireAdmin>
              <Sidebar pageTitle="Traffic Debt">
                <TrafficDebt />
              </Sidebar>
            </RequireAdmin>
          </FetchSmartContracts>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
