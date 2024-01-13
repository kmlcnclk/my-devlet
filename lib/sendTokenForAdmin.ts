import { getAdminAccessTokenFromLocalStorage } from '@/localstorage/adminAccessTokenStorage';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import Web3 from 'web3';

export const getAddress = async () => {
  const res = await fetch('/api/admin/getAddress', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAdminAccessTokenFromLocalStorage()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (data?.message) toast.error(data.message);
    else if (data?.error) toast.error(data.error.message);
    else if (data[0]) toast.error(data[0].message);
  } else {
    return data.address;
  }
};

export const sendToken = async (value: number) => {
  const address = await getAddress();

  if (address) {
    if (get(window, 'ethereum')) {
      const ethereum = get(window, 'ethereum') as any;
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const amount = Web3.utils.toWei(value.toString(), 'ether');

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: address,
            value: Number(amount).toString(16),
            gas: Number(21000).toString(16),
            gasPrice: Number(21000).toString(16),
          },
        ],
      });
    }
  }
};
