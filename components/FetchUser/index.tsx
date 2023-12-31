import {
  deleteAccessTokenFromLocalStorage,
  getAccessTokenFromLocalStorage,
} from '@/localstorage/accessTokenStorage';
import { deleteRefreshTokenFromLocalStorage } from '@/localstorage/refreshTokenStorage';
import { AppDispatch, RootState } from '@/store';
import { UserState, getUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface FetchUserProps {
  children: ReactNode;
}

const FetchUser: React.FC<FetchUserProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const user: UserState = useSelector(
    (state: RootState) => state.user
  ) as UserState;

  useMemo(() => {
    if (typeof window !== 'undefined')
      if (!user.value._id)
        dispatch(getUser(getAccessTokenFromLocalStorage() as string));
  }, [dispatch]);

  useEffect(() => {
    if (user.error) {
      if (
        user.error === 'User Not Found' ||
        user.error === 'JWT Token Not Found' ||
        user.error === 'JWT Token Expired'
      ) {
        deleteAccessTokenFromLocalStorage();
        deleteRefreshTokenFromLocalStorage();
        router.push('/signin');
      } else {
        toast.error(user.error);
      }
    }
  }, [user.error]);

  return <>{children}</>;
};

export default FetchUser;
