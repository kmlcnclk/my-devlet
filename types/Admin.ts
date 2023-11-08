export type AdminRole = 'government' | 'school' | 'bank' | 'hospital';

export type AdminStatus = 'active' | 'passive' | 'frozen' | 'suspended';

export interface IAdmin {
  name: string;
  email: string;
  phone?: string;
  password: string;
  ip: string;
  uniqueID?: string;
  address: string;
  privateKey: string;
  status?: string;
  role: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

export type RegisterType = IAdmin & { passwordConfirmation: string };

export type SignInType = {
  email: string;
  password: string;
};

export type ReturnedAdminType = Omit<IAdmin, 'password'> & {
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};
