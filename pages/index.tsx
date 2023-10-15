import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const AppPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, []);

  return <div></div>;
};

export default AppPage;
