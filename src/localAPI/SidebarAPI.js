import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReviewsIcon from '@mui/icons-material/Reviews';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TextFieldsIcon from '@mui/icons-material/TextFields';

export const sidebarAPI = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: "/",
  },
  // {
  //   name: "Add New Agency",
  //   icon: <AddBusinessIcon />,
  //   link: "/superAdmin/addNewAgency",
  // },
  {
    name: "User Manage",
    icon: <PeopleAltIcon />,
    menu: [
      { name: "Agency Admin", link: "/all-agency-admin" },
      { name: "Managers", link: "/all-agency-manager" },
      { name: "Nurse", link: "/" },
    ],
  },
  {
    name: "Jobs",
    icon: <WorkIcon />,
    menu: [
      { name: "Posted Jobs", link: "/" },
      { name: "Accepted Jobs", link: "/" },
      { name: "Completed Jobs", link: "/" },
      { name: "Unfulfilled Jobs", link: "/" },
      { name: "Pending Jobs", link: "/" },
      { name: "Bids", link: "/" },
    ],
  },
  {
    name: "Manage Fields",
    icon: <TextFieldsIcon />,
    menu: [
      { name: "Nurse App Fields", link: "/" },
      { name: "Manager App Fields", link: "/" },
    ],
  },
  {
    name: "Customer Support",
    icon: <SupportAgentIcon />,
    link: "/superAdmin/appMaintenance",
  },
  {
    name: "Mobile App Management",
    icon: <AppSettingsAltIcon />,
    link: "/superAdmin/appMaintenance",
  },
  {
    name: "Notification",
    icon: <NotificationsActiveIcon />,
    link: "/",
  },
  {
    name: "Reviews",
    icon: <ReviewsIcon />,
    link: "/",
  },
  {
    name: "Logout",
    icon: <ExitToAppIcon />,
    link: "/",
  },
];
