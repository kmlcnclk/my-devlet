import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { FaFileContract } from 'react-icons/fa';
import DescriptionIcon from '@mui/icons-material/Description';
import CreateIcon from '@mui/icons-material/Create';
import BusinessIcon from '@mui/icons-material/Business';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { IoDocumentsSharp } from 'react-icons/io5';
import { FaMoneyBills } from 'react-icons/fa6';
import GavelIcon from '@mui/icons-material/Gavel';

export interface RouterConfigData {
  id: string;
  title: string;
  icon?: any;
  type: 'item' | 'group' | 'collapse' | 'divider';
  children?: RouterConfigData[];
  url?: string;
  ml?: string;
}

export const educationConfig: RouterConfigData[] = [
  {
    id: 'school-background',
    title: 'School',
    type: 'item',
    icon: <SchoolIcon />,
    url: '/admin/dashboard/school-background',
    children: [],
    ml: '50px',
  },
  {
    id: 'bank-background',
    title: 'Bank',
    type: 'item',
    icon: <AccountBalanceIcon />,
    url: '/admin/dashboard/bank-background',
    children: [],
    ml: '50px',
  },
  {
    id: 'hospital-background',
    title: 'Hospital',
    type: 'item',
    icon: <LocalHospitalIcon />,
    url: '/admin/dashboard/hospital-background',
    children: [],
    ml: '50px',
  },
  {
    id: 'notary-background',
    title: 'Notary',
    type: 'item',
    icon: <IoDocumentsSharp />,
    url: '/admin/dashboard/notary',
    children: [],
    ml: '50px',
  },
  {
    id: 'tax-debt-background',
    title: 'Tax Debt',
    type: 'item',
    icon: <FaMoneyBills />,
    url: '/admin/dashboard/tax-debt',
    children: [],
    ml: '50px',
  },
  {
    id: 'criminal-record-background',
    title: 'Criminal Record',
    type: 'item',
    icon: <GavelIcon />,
    url: '/admin/dashboard/criminal-record',
    children: [],
    ml: '50px',
  },
  {
    id: 'smart-contract',
    title: 'Smart Contract',
    type: 'item',
    icon: <DescriptionIcon />,
    url: '/admin/dashboard/smart-contract',
    children: [],
    ml: '50px',
  },
];

export const businessConfig: RouterConfigData[] = [
  {
    id: 'school-background',
    title: 'School',
    type: 'item',
    icon: <SchoolIcon />,
    url: '/admin/dashboard/add-blockchain/school-background',
    children: [],
    ml: '50px',
  },
  {
    id: 'bank-background',
    title: 'Bank',
    type: 'item',
    icon: <AccountBalanceIcon />,
    url: '/admin/dashboard/add-blockchain/bank-background',
    children: [],
    ml: '50px',
  },
  {
    id: 'hospital-background',
    title: 'Hospital',
    type: 'item',
    icon: <LocalHospitalIcon />,
    url: '/admin/dashboard/add-blockchain/hospital-background',
    children: [],
    ml: '50px',
  },
  {
    id: 'notary-background',
    title: 'Notary',
    type: 'item',
    icon: <IoDocumentsSharp />,
    url: '/admin/dashboard/add-blockchain/notary',
    children: [],
    ml: '50px',
  },
  {
    id: 'tax-debt-background',
    title: 'Tax Debt',
    type: 'item',
    icon: <FaMoneyBills />,
    url: '/admin/dashboard/add-blockchain/tax-debt',
    children: [],
    ml: '50px',
  },
  {
    id: 'criminal-record-background',
    title: 'Criminal Record',
    type: 'item',
    icon: <GavelIcon />,
    url: '/admin/dashboard/add-blockchain/criminal-record',
    children: [],
    ml: '50px',
  },
  {
    id: 'create-digital-id',
    title: 'Create Digital Id',
    type: 'item',
    icon: <PermIdentityIcon />,
    url: '/admin/dashboard/create-digital-id',
    children: [],
    ml: '50px',
  },
  {
    id: 'my-analytics',
    title: 'My Analytics',
    type: 'item',
    icon: <AnalyticsIcon />,
    url: '/admin/dashboard/my-analytics',
    children: [],
    ml: '50px',
  },
];

export const routesConfig: RouterConfigData[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: <HomeRoundedIcon />,
    url: '/admin/dashboard',
    children: [],
  },
  {
    id: 'create',
    title: 'Create',
    type: 'item',
    icon: <CreateIcon />,
    children: educationConfig,
  },

  {
    id: 'operations',
    title: 'Operations',
    type: 'item',
    icon: <BusinessIcon />,
    children: businessConfig,
  },
  {
    id: 'smart-contracts',
    title: 'Smart Contracts',
    type: 'item',
    icon: <FaFileContract />,
    children: [],
  },
];

export const routesForMenu: string[] = [];
