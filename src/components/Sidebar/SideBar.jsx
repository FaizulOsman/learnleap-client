// import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { removeFromLocalStorage } from "@/utils/localstorage";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <FaUser />,
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />,
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },
  {
    path: "/test",
    name: "Test",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/test/create-test",
        name: "Create Test",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/order",
    name: "Order",
    icon: <BsCartCheck />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
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
          <div className="flex items-center justify-between py-[15px] px-[10px]">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="text-lg leading-[0px]"
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="w-[30px] cursor-pointer">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="flex items-center my-[10px] mx-0 h-7 p-2">
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
              </div>
            ))}
          </section>
        </motion.div>

        <main className="flex-1">
          <div className="flex items-center justify-end gap-5 px-10 bg-[#00073d] text-white h-12 border-l">
            <Link href="/" className="hover:underline hover:text-blue-500">
              Home
            </Link>
            <Link
              onClick={() => handleLogOut()}
              href="/login"
              className="hover:underline hover:text-blue-500"
            >
              Logout
            </Link>
            <Image
              src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
              alt="Avatar"
              className="rounded-full border-2 p-[2px] cursor-pointer hover:border-blue-500"
              width={35}
              height={35}
            />
          </div>
          {children}
        </main>
      </div>
    </>
  );
};

export default SideBar;
