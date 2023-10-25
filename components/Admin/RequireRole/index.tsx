import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'react-toastify';

interface RequireAdminProps {
  children: ReactNode;
}

const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const router = useRouter();

  const role: string = useSelector(
    (state: RootState) => state.admin.value.role
  ) as string;

  useEffect(() => {
    if (!router.pathname.includes(role) && role != 'government') {
      router.push('/admin/dashboard');
      toast.info('You do not have permission to enter here');
    }
  }, [role]);

  return <>{children}</>;
};

export default RequireAdmin;
