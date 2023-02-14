import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReviewsIcon from "@mui/icons-material/Reviews";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TextFieldsIcon from "@mui/icons-material/TextFields";

export const sidebarAPI = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: "/",
  },
  {
    name: "User Manage",
    icon: <PeopleAltIcon />,
    menu: [
      { name: "Agency Admin", link: "/all-agency-admin" },
      { name: "Managers", link: "/all-agency-manager" },
      { name: "Nurse", link: "/all-nurse" },
    ],
  },
  {
    name: "Jobs",
    icon: <WorkIcon />,
    menu: [
      { name: "Add New Jobs", link: "/add-new-jobs" },
      { name: "Posted Jobs", link: "/posted-jobs" },
      { name: "Accepted Jobs", link: "/accepted-jobs" },
      { name: "Completed Jobs", link: "/completed-jobs" },
      { name: "Unfulfilled Jobs", link: "/unfulfilled-jobs" },
      { name: "Pending Jobs", link: "/pending-jobs" },
      { name: "Bids", link: "/bids" },
    ],
  },
  {
    name: "Manage Fields",
    icon: <TextFieldsIcon />,
    menu: [
      { name: "Nurse App Fields", link: "/nurse-app-fields" },
      { name: "Manager App Fields", link: "/manager-app-fields" },
    ],
  },
  {
    name: "Customer Support",
    icon: <SupportAgentIcon />,
    link: "/customer-support",
  },
  {
    name: "Mobile App Management",
    icon: <AppSettingsAltIcon />,
    link: "/superAdmin/appMaintenance",
  },
  {
    name: "Notification",
    icon: <NotificationsActiveIcon />,
    link: "/notification",
  },
  {
    name: "Reviews",
    icon: <ReviewsIcon />,
    link: "/reviews",
  },
  {
    name: "Logout",
    icon: <ExitToAppIcon />,
    link: "/logout",
  },
];
