import SignUp from '@/components/Admin/SignUp';
import { getAccessTokenFromLocalStorage } from '@/localstorage/accessTokenStorage';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function AppPage() {
  const router = useRouter();

  // useEffect(() => {
  //   if (getAccessTokenFromLocalStorage()) {
  //     router.push("/dashboard");
  //   }
  // }, []);

  return <SignUp />;
}

export default AppPage;
