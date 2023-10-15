import { getAccessTokenFromLocalStorage } from "@/localstorage/accessTokenStorage";
import { AppDispatch, RootState } from "@/store";
import { UserState, getUser } from "@/store/slices/userSlice";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface FetchUserProps {
  children: ReactNode;
}

const FetchUser: React.FC<FetchUserProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const user: UserState = useSelector(
    (state: RootState) => state.user
  ) as UserState;

  useEffect(() => {
    if (typeof window !== "undefined")
      if (!user.value._id)
        dispatch(getUser(getAccessTokenFromLocalStorage() as string));
  }, [dispatch]);

  useEffect(() => {
    if (user.error) toast.error(user.error);
  }, [user.error]);

  return <>{children}</>;
};

export default FetchUser;
