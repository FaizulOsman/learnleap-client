import { FaHome, FaUser, FaUsers, FaChartLine } from "react-icons/fa";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";

export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
    permission1: "user",
    permission2: "admin",
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: <FaUsers />,
    permission1: "",
    permission2: "admin",
  },
  {
    path: "/dashboard/my-profile",
    name: "My Profile",
    icon: <FaUser />,
    permission1: "user",
    permission2: "admin",
  },
  {
    path: "/dashboard/results",
    name: "Results",
    icon: <FaChartLine />,
    permission1: "user",
    permission2: "",
  },
  {
    path: "/dashboard/test",
    name: "Test",
    icon: <AiTwotoneFileExclamation />,
    permission1: "",
    permission2: "admin",
    subRoutes: [
      {
        path: "/dashboard/test/create-test",
        name: "Create Test",
        icon: <FaUser />,
      },
      {
        path: "/dashboard/test/all-test",
        name: "All Test",
        icon: <AiTwotoneFileExclamation />,
      },
    ],
  },
  {
    path: "/dashboard/exam",
    name: "Exam",
    icon: <AiTwotoneFileExclamation />,
    permission1: "",
    permission2: "admin",
    subRoutes: [
      {
        path: "/dashboard/exam/create-exam",
        name: "Create Exam",
        icon: <FaUser />,
      },
      {
        path: "/dashboard/exam/all-exam",
        name: "All Exam",
        icon: <AiTwotoneFileExclamation />,
      },
    ],
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    permission1: "",
    permission2: "admin",
    subRoutes: [
      {
        path: "/dashboard/my-profile",
        name: "Profile ",
        icon: <FaUser />,
      },
    ],
  },
  {
    path: "/dashboard/saved",
    name: "Saved",
    icon: <AiFillHeart />,
    permission1: "user",
    permission2: "admin",
  },
];
