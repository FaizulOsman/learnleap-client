// import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localstorage";

const routes = [
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
    path: "/dashboard/profile",
    name: "Profile",
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
      {
        path: "/dashboard/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
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
      {
        path: "/dashboard/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
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
        path: "/dashboard/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/dashboard/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/dashboard/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
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

const SideBar = ({ children }) => {
  const { router } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "0 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLogOut = () => {
    removeFromLocalStorage("user-info");
    removeFromLocalStorage("access-token");
  };

  const [myProfile, setMyProfile] = useState({});
  const fetchMyProfile = async () => {
    const accessToken = getFromLocalStorage("access-token");
    if (accessToken) {
      try {
        const url =
          "https://test-yourself-server.vercel.app/api/v1/users/my-profile";
        const options = {
          headers: {
            authorization: accessToken,
          },
        };
        const res = await fetch(url, options);
        const data = await res.json();
        setMyProfile(data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchMyProfile();
  }, []);

  console.log(myProfile);

  return (
    <>
      <div className="flex">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`bg-[#00073d] text-white min-h-[100vh] overflow-y-auto`}
        >
          <div className="flex items-center justify-between py-2">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="text-lg leading-[0px] pl-2"
                >
                  QuizWizPro
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="cursor-pointer">
              <Image
                alt="Logo"
                className="w-12"
                src="https://i.ibb.co/5MHLgQW/images-removebg-preview.png"
                decoding="async"
                loading="lazy"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className="flex items-center my-[10px] mx-0 h-4 p-2">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  className="border-none ml-2 rounded-md bg-white text-black p-0"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="mt-4 flex flex-col gap-[5px]">
            {routes.map((route, index) => (
              <div key={index}>
                {(route?.permission1 === myProfile?.role ||
                  route?.permission2 === myProfile?.role) && (
                  <>
                    {route.subRoutes ? (
                      <SidebarMenu
                        setIsOpen={setIsOpen}
                        route={route}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                      />
                    ) : (
                      <Link href={route.path} passHref>
                        <div
                          className={`flex items-center text-white gap-[10px] p-2 border-r-4 border-transparent border-solid transition duration-200 ease-in-out cubic-bezier(0.6, -0.28, 0.735, 0.045) hover:bg-[#2d3359] hover:border-r-4 hover:border-white hover:transition-[0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)] ${
                            route.path === router?.asPath
                              ? "border-r-4 border-white bg-[#2d3359]"
                              : ""
                          }`}
                        >
                          <div className="icon">{route.icon}</div>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                variants={showAnimation}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="whitespace-nowrap text-[15px]"
                              >
                                {route.name}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </Link>
                    )}
                  </>
                )}
              </div>
            ))}
          </section>
        </motion.div>

        <main className="flex-1">
          <div className="flex items-center justify-between px-6 bg-[#00073d] text-white h-12 border-l">
            <div className="w-[30px] cursor-pointer">
              <FaBars onClick={toggle} />
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/"
                className="hover:underline hover:text-blue-500 px-3 flex items-center gap-1"
              >
                <HiOutlineHome /> Home
              </Link>

              <Link
                onClick={() => handleLogOut()}
                href="/login"
                className="hover:underline hover:text-blue-500 flex items-center gap-1 border-l pl-3"
              >
                <HiOutlineLogout /> Logout
              </Link>
            </div>
          </div>
          {children}
        </main>
      </div>
      <footer className="footer footer-center p-4 bg-[#00073d] text-white">
        <div>
          <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
        </div>
      </footer>
    </>
  );
};

export default SideBar;
