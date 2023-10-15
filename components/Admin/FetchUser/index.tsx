import { getAdminAccessTokenFromLocalStorage } from '@/localstorage/adminAccessTokenStorage';
import { AppDispatch, RootState } from '@/store';
import { AdminState, getAdmin } from '@/store/slices/adminSlice';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface FetchAdminProps {
  children: ReactNode;
}

const FetchAdmin: React.FC<FetchAdminProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const admin: AdminState = useSelector(
    (state: RootState) => state.admin
  ) as AdminState;

  useEffect(() => {
    if (typeof window !== 'undefined')
      if (!admin.value._id)
        dispatch(getAdmin(getAdminAccessTokenFromLocalStorage() as string));
  }, [dispatch]);

  useEffect(() => {
    if (admin.error) toast.error(admin.error);
  }, [admin.error]);

  return <>{children}</>;
};

export default FetchAdmin;
