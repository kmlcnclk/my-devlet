import SignIn from '@/components/Admin/SignIn';
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

  return <SignIn />;
}

export default AppPage;
