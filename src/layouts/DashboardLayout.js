import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { removeFromLocalStorage } from "@/utils/localstorage";
import SidebarMenu from "@/components/Dashboard/SidebarMenu";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { routes } from "@/constants/dashboardConstants";
import { FaBars } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const { pathname } = useRouter();
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
      width: "80%",
      padding: "0 10px",
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
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("access-token")
        : null;
    if (accessToken) {
      try {
        const url =
          "https://learnleap-server.vercel.app/api/v1/users/my-profile";
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

  return (
    <div className="">
      <div className="flex bg-[#080925] text-white h-screen overflow-hidden">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`h-screen bg-[#00073d] text-white min-h-[100vh] overflow-y-auto absolute sm:static left-0 top-0 z-50`}
        >
          <div className="flex items-center justify-between py-[6px]">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="text-lg leading-[0px] pl-2"
                >
                  LearnLeap
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="cursor-pointer">
              <Image
                alt="Logo"
                className={`w-12 h-9 ${isOpen ? "hidden sm:block" : ""}`}
                src="https://i.ibb.co/5MHLgQW/images-removebg-preview.png"
                decoding="async"
                loading="lazy"
                width={300}
                height={300}
              />
              {isOpen && (
                <div className="sm:hidden flex justify-center w-[43px] cursor-pointer hover:text-blue-500 py-1">
                  <FaBars className="w-[22px] h-[28px]" onClick={toggle} />
                </div>
              )}
            </div>
          </div>
          <section className="flex flex-col gap-[5px]">
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
                            route.path === pathname
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

        <div
          className={`${
            // isOpen ? "w-[calc(100vw-200px)]" : "w-full"
            isOpen ? "w-full sm:w-[calc(100vw-200px)]" : "w-full"
          } flex flex-col ml-[45px] sm:ml-0`}
        >
          <div className="sticky top-0">
            <DashboardHeader toggle={toggle} handleLogOut={handleLogOut} />
          </div>
          <div className="flex-grow overflow-y-auto">
            <div style={{ minHeight: "calc(100vh - 100px)" }}>{children}</div>
            <footer className="footer footer-center p-4 bg-[#00073d] text-white">
              <div>
                <p>Copyright © 2023 - All right reserved by LearnLeap Ltd.</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
