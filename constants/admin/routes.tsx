import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { FaFileContract } from "react-icons/fa";
import DescriptionIcon from "@mui/icons-material/Description";
import CreateIcon from "@mui/icons-material/Create";
import BusinessIcon from "@mui/icons-material/Business";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaMoneyBills } from "react-icons/fa6";
import GavelIcon from "@mui/icons-material/Gavel";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import TrafficIcon from "@mui/icons-material/Traffic";
import PlaceIcon from "@mui/icons-material/Place";

export interface RouterConfigData {
  id: string;
  title: string;
  icon?: any;
  type: "item" | "group" | "collapse" | "divider";
  children?: RouterConfigData[];
  url?: string;
  ml?: string;
}

export const educationConfig: RouterConfigData[] = [
  {
    id: "school-background",
    title: "School",
    type: "item",
    icon: <SchoolIcon />,
    url: "/admin/dashboard/school-background",
    children: [],
    ml: "50px",
  },
  {
    id: "bank-background",
    title: "Bank",
    type: "item",
    icon: <AccountBalanceIcon />,
    url: "/admin/dashboard/bank-background",
    children: [],
    ml: "50px",
  },
  {
    id: "hospital-background",
    title: "Hospital",
    type: "item",
    icon: <LocalHospitalIcon />,
    url: "/admin/dashboard/hospital-background",
    children: [],
    ml: "50px",
  },
  {
    id: "notary-background",
    title: "Notary",
    type: "item",
    icon: <IoDocumentsSharp />,
    url: "/admin/dashboard/notary",
    children: [],
    ml: "50px",
  },
  {
    id: "tax-debt-background",
    title: "Tax Debt",
    type: "item",
    icon: <FaMoneyBills />,
    url: "/admin/dashboard/tax-debt",
    children: [],
    ml: "50px",
  },
  {
    id: "criminal-record-background",
    title: "Criminal Record",
    type: "item",
    icon: <GavelIcon />,
    url: "/admin/dashboard/criminal-record",
    children: [],
    ml: "50px",
  },
  {
    id: "asset-background",
    title: "Asset",
    type: "item",
    icon: <WebAssetIcon />,
    url: "/admin/dashboard/asset",
    children: [],
    ml: "50px",
  },
  {
    id: "military-background",
    title: "Military",
    type: "item",
    icon: <MilitaryTechIcon sx={{ mb: "-4px" }} />,
    url: "/admin/dashboard/military",
    children: [],
    ml: "50px",
  },
  {
    id: "family-tree-background",
    title: "Family Tree",
    type: "item",
    icon: <FamilyRestroomIcon sx={{ mb: "-4px" }} />,
    url: "/admin/dashboard/family-tree",
    children: [],
    ml: "50px",
  },
  {
    id: "subscription-transaction",
    title: "Subscription Transaction",
    type: "item",
    icon: <SubscriptionsIcon sx={{ mb: "-4px" }} />,
    url: "/admin/dashboard/subscription-transaction",
    children: [],
    ml: "50px",
  },
  {
    id: "traffic-debt-background",
    title: "Traffic Debt",
    type: "item",
    icon: <TrafficIcon />,
    url: "/admin/dashboard/traffic-debt",
    children: [],
    ml: "50px",
  },
  {
    id: "place-of-residence",
    title: "Place of Residence",
    type: "item",
    icon: <PlaceIcon />,
    url: "/admin/dashboard/place-of-residence",
    children: [],
    ml: "50px",
  },
  {
    id: "smart-contract",
    title: "Smart Contract",
    type: "item",
    icon: <DescriptionIcon />,
    url: "/admin/dashboard/smart-contract",
    children: [],
    ml: "50px",
  },
];

export const businessConfig: RouterConfigData[] = [
  {
    id: "school-background",
    title: "School",
    type: "item",
    icon: <SchoolIcon />,
    url: "/admin/dashboard/add-blockchain/school-background",
    children: [],
    ml: "50px",
  },
  {
    id: "bank-background",
    title: "Bank",
    type: "item",
    icon: <AccountBalanceIcon />,
    url: "/admin/dashboard/add-blockchain/bank-background",
    children: [],
    ml: "50px",
  },
  {
    id: "hospital-background",
    title: "Hospital",
    type: "item",
    icon: <LocalHospitalIcon />,
    url: "/admin/dashboard/add-blockchain/hospital-background",
    children: [],
    ml: "50px",
  },
  {
    id: "notary-background",
    title: "Notary",
    type: "item",
    icon: <IoDocumentsSharp />,
    url: "/admin/dashboard/add-blockchain/notary",
    children: [],
    ml: "50px",
  },
  {
    id: "tax-debt-background",
    title: "Tax Debt",
    type: "item",
    icon: <FaMoneyBills />,
    url: "/admin/dashboard/add-blockchain/tax-debt",
    children: [],
    ml: "50px",
  },
  {
    id: "criminal-record-background",
    title: "Criminal Record",
    type: "item",
    icon: <GavelIcon />,
    url: "/admin/dashboard/add-blockchain/criminal-record",
    children: [],
    ml: "50px",
  },
  {
    id: "asset-background",
    title: "Asset",
    type: "item",
    icon: <WebAssetIcon />,
    url: "/admin/dashboard/add-blockchain/asset",
    children: [],
    ml: "50px",
  },
  {
    id: "military-background",
    title: "Military",
    type: "item",
    icon: <MilitaryTechIcon sx={{ mb: "-4px" }} />,
    url: "/admin/dashboard/add-blockchain/military",
    children: [],
    ml: "50px",
  },
  {
    id: "family-tree-background",
    title: "Family Tree",
    type: "item",
    icon: <FamilyRestroomIcon />,
    url: "/admin/dashboard/add-blockchain/family-tree",
    children: [],
    ml: "50px",
  },
  {
    id: "subscription-transaction",
    title: "Subscription Transaction",
    type: "item",
    icon: <SubscriptionsIcon />,
    url: "/admin/dashboard/add-blockchain/subscription-transaction",
    children: [],
    ml: "50px",
  },
  {
    id: "traffic-debt-background",
    title: "Traffic Debt",
    type: "item",
    icon: <TrafficIcon />,
    url: "/admin/dashboard/add-blockchain/traffic-debt",
    children: [],
    ml: "50px",
  },
  {
    id: "place-of-residence",
    title: "Place of Residence",
    type: "item",
    icon: <PlaceIcon />,
    url: "/admin/dashboard/add-blockchain/place-of-residence",
    children: [],
    ml: "50px",
  },
  {
    id: "create-digital-id",
    title: "Create Digital Id",
    type: "item",
    icon: <PermIdentityIcon />,
    url: "/admin/dashboard/create-digital-id",
    children: [],
    ml: "50px",
  },
  {
    id: "my-analytics",
    title: "My Analytics",
    type: "item",
    icon: <AnalyticsIcon />,
    url: "/admin/dashboard/my-analytics",
    children: [],
    ml: "50px",
  },
];

export const routesConfig: RouterConfigData[] = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <HomeRoundedIcon />,
    url: "/admin/dashboard",
    children: [],
  },
  {
    id: "create",
    title: "Create",
    type: "item",
    icon: <CreateIcon />,
    children: educationConfig,
  },

  {
    id: "operations",
    title: "Operations",
    type: "item",
    icon: <BusinessIcon />,
    children: businessConfig,
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    type: "item",
    icon: <FaFileContract />,
    children: [],
  },
];

export const routesForMenu: string[] = [];
