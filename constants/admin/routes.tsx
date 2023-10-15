import SettingsIcon from '@mui/icons-material/Settings';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SchoolIcon from '@mui/icons-material/School';
import { FaFileContract } from 'react-icons/fa';

export interface RouterConfigData {
  id: string;
  title: string;
  icon?: any;
  type: 'item' | 'group' | 'collapse' | 'divider';
  children?: RouterConfigData[];
  url?: string;
  ml?: string;
}

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
    id: 'educational-background',
    title: 'Education',
    type: 'item',
    icon: <SchoolIcon />,
    url: '/admin/dashboard/educational-background',
    children: [],
  },
];

export const routesForMenu: string[] = [];
