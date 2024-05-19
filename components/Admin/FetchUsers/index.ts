import { getAdminAccessTokenFromLocalStorage } from "@/localstorage/adminAccessTokenStorage";
import { toast } from "react-toastify";

export const fetchUsers = async (
  name: string,
  setUsers: Function,
  handleOpen: Function
) => {
  const res = await fetch(`/api/admin/user/searchUserByName?name=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    if (data?.message) toast.error(data.message);
    else if (data?.error) toast.error(data.error.message);
    else if (data[0]) toast.error(data[0].message);
  } else {
    await setUsers(data.users);

    handleOpen();
  }
};
