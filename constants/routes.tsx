// import SettingsIcon from '@mui/icons-material/Settings';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SchoolIcon from '@mui/icons-material/School';
import { FaFileContract } from 'react-icons/fa';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { IoDocumentsSharp } from 'react-icons/io5';
import { FaMoneyBills } from 'react-icons/fa6';
import GavelIcon from '@mui/icons-material/Gavel';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

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
    id: 'smart-contract',
    title: 'Smart Contract',
    type: 'item',
    icon: <DescriptionIcon />,
    url: '/dashboard/smart-contract',
    children: [],
    ml: '50px',
  },
];

export const businessConfig: RouterConfigData[] = [
  {
    id: 'my-analytics',
    title: 'My Analytics',
    type: 'item',
    icon: <AnalyticsIcon />,
    url: '/dashboard/my-analytics',
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
    url: '/dashboard',
    children: [],
  },
  {
    id: 'educational-background',
    title: 'Education',
    type: 'item',
    icon: <SchoolIcon />,
    url: '/dashboard/educational-background',
    children: [],
  },
  {
    id: 'bank-background',
    title: 'Bank',
    type: 'item',
    icon: <AccountBalanceIcon />,
    url: '/dashboard/bank-background',
    children: [],
  },
  {
    id: 'hospital-background',
    title: 'Hospital',
    type: 'item',
    icon: <LocalHospitalIcon />,
    url: '/dashboard/hospital-background',
    children: [],
  },
  {
    id: 'notary-background',
    title: 'Notary',
    type: 'item',
    icon: <IoDocumentsSharp />,
    url: '/dashboard/notary',
    children: [],
  },
  {
    id: 'tax-debt-background',
    title: 'Tax Debt',
    type: 'item',
    icon: <FaMoneyBills />,
    url: '/dashboard/tax-debt',
    children: [],
  },
  {
    id: 'criminal-record-background',
    title: 'Criminal Record',
    type: 'item',
    icon: <GavelIcon />,
    url: '/dashboard/criminal-record',
    children: [],
  },
  {
    id: 'asset-background',
    title: 'Asset',
    type: 'item',
    icon: <WebAssetIcon />,
    url: '/dashboard/asset',
    children: [],
  },
  {
    id: 'military-background',
    title: 'Military',
    type: 'item',
    icon: <MilitaryTechIcon sx={{ mb: '-4px' }} />,
    url: '/dashboard/military',
    children: [],
  },
  {
    id: 'family-tree-background',
    title: 'Family Tree',
    type: 'item',
    icon: <FamilyRestroomIcon />,
    url: '/dashboard/family-tree',
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
  {
    id: 'profile',
    title: 'Profile',
    type: 'item',
    icon: <PersonIcon />,
    url: '/dashboard/profile',
    children: [],
  },
  // {
  //   id: 'settings',
  //   title: 'Settings',
  //   type: 'item',
  //   icon: <SettingsIcon />,
  //   url: '/dashboard/settings',
  //   children: [],
  // },
];

export const routesForMenu: string[] = [];
