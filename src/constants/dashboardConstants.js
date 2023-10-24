import {
  FaHome,
  FaUser,
  FaUsers,
  FaChartLine,
  FaUserPlus,
} from "react-icons/fa";
import { FcAreaChart, FcComboChart } from "react-icons/fc";
import { BiCog } from "react-icons/bi";
import { MdOutlineCreate } from "react-icons/md";
import {
  AiFillHeart,
  AiOutlineAreaChart,
  AiTwotoneFileExclamation,
} from "react-icons/ai";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome className="text-[22px]" />,
    permission1: "user",
    permission2: "admin",
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: <FaUsers className="text-[22px]" />,
    permission1: "",
    permission2: "admin",
  },
  {
    path: "/dashboard/my-profile",
    name: "My Profile",
    icon: <FaUser className="text-[22px]" />,
    permission1: "user",
    permission2: "admin",
  },
  {
    path: "/dashboard/add-new-admin",
    name: "Add New Admin",
    icon: <FaUserPlus className="text-[22px]" />,
    permission1: "",
    permission2: "admin",
  },
  {
    path: "/dashboard/results",
    name: "Results",
    icon: <FaChartLine className="text-[22px]" />,
    permission1: "user",
    permission2: "",
  },
  {
    path: "/dashboard/test",
    name: "Test",
    icon: <FcAreaChart className="text-[22px]" />,
    permission1: "",
    permission2: "admin",
    subRoutes: [
      {
        path: "/dashboard/test/create-test",
        name: "Create Test",
        icon: <MdOutlineCreate className="text-[22px]" />,
      },
      {
        path: "/dashboard/test/all-test",
        name: "All Test",
        icon: <AiOutlineAreaChart className="text-[22px]" />,
      },
    ],
  },
  {
    path: "/dashboard/exam",
    name: "Exam",
    icon: <FcComboChart className="text-[22px]" />,
    permission1: "",
    permission2: "admin",
    subRoutes: [
      {
        path: "/dashboard/exam/create-exam",
        name: "Create Exam",
        icon: <MdOutlineCreate className="text-[22px]" />,
      },
      {
        path: "/dashboard/exam/all-exam",
        name: "All Exam",
        icon: <AiOutlineAreaChart className="text-[22px]" />,
      },
    ],
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    icon: <BiCog className="text-[22px]" />,
    exact: true,
    permission1: "",
    permission2: "admin",
    subRoutes: [
      {
        path: "/dashboard/my-profile",
        name: "Profile ",
        icon: <FaUser className="text-[22px]" />,
      },
    ],
  },
  {
    path: "/dashboard/bookmarks",
    name: "Bookmarks",
    icon: <BsFillBookmarkCheckFill className="text-[22px]" />,
    permission1: "user",
    permission2: "admin",
  },
];
