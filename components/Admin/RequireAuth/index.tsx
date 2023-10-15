import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

interface RequireAuthProps {
  children: ReactNode;
}

// TODO: JWT Expired control
// TODO: JWT Refresh Token Process
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("admin_access_token");
    if (!accessToken) {
      router.push("/admin/sign-in");
      return;
    }
  }, []);

  return <>{children}</>;
};

export default RequireAuth;
