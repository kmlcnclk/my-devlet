import AdminDAO from '@/server/data/AdminDAO';
import { AdminRole, AdminStatus, RegisterType } from '@/types/Admin';
import { NextApiRequestWithUser } from '@/types/next';
import { get } from 'lodash';
import { NextApiResponse, NextApiHandler, NextApiRequest } from 'next';

export const isAdminEmailExists = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      try {
        const adminData: RegisterType = req.body;

        const isAdminEmailExist = await AdminDAO.findOne({
          email: adminData.email,
        });

        if (isAdminEmailExist) {
          return res.status(400).json({
            message: 'Email is already exist',
          });
        }
      } catch (err: any) {
        return res.status(400).json({ error: err.message });
      }
    }
    return handler(req, res);
  };
};

export const isStatusAvailable = (
  handler: NextApiHandler,
  statuses: AdminStatus[]
) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const user = get(req, 'user');

      const admin = await AdminDAO.findOne({
        _id: user?._id,
      });

      if (admin) {
        if (!statuses.includes(get(admin, 'status') as AdminStatus)) {
          return res.status(403).json({
            message: `You can not enter here because your account ${admin.status} now`,
          });
        }
        return handler(req, res);
      }
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
};

export const isRoleAvailable = (
  handler: NextApiHandler,
  roles: AdminRole[]
) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const user = get(req, 'user');

      const admin = await AdminDAO.findOne({
        _id: user?._id,
      });

      if (admin) {
        if (!roles.includes(get(admin, 'role') as AdminRole)) {
          return res.status(403).json({
            message: `You can not enter here. Your permission is not enough`,
          });
        }
        return handler(req, res);
      }
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
};
