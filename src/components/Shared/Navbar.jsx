import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localstorage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import LOGO from "../../../public/logo.png";

const Navbar = () => {
  const [stickyNav, setStickyNav] = useState(false);
  const [myProfile, setMyProfile] = useState({});
  const router = useRouter();
  const statePath = router.query.state?.path;

  const handleSignOut = () => {
    const path = statePath || "/login";
    router.push(path);

    removeFromLocalStorage("user-info");
    removeFromLocalStorage("access-token");
    toast.success("Successfully Signed Out!");
    setMyProfile({});
  };

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

  const handleScroll = () => {
    setStickyNav(window.pageYOffset > 5);
  };

  useEffect(() => {
    fetchMyProfile();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`z-50 border-b-1 border-solid border-blue-200 z-999 fixed w-full top-0 ${
        stickyNav
          ? "sticky shadow-md border-b-0 sticky__body bg-white"
          : "bg-gradient-to-r from-green-500 to-blue-500"
      }`}
    >
      <div className="w-11/12 max-w-[1200px] mx-auto">
        <div
          className={`navbar-wrapper__body  ${
            stickyNav ? "sticky__body" : ""
          } py-2 md:py-3`}
        >
          <div className="inherit md:hidden">
            <Link href="/">
              <Image
                alt="Logo"
                className="w-9 h-8"
                src={LOGO}
                decoding="async"
                loading="lazy"
                width={300}
                height={300}
              />
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:w-fit gap-4">
            <li className="">
              <Link href="/">
                <Image
                  alt="Logo"
                  className="w-11 h-10"
                  src={LOGO}
                  decoding="async"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </Link>
            </li>
            <li
              className={`left-menus__menu hidden lg:inline-block font-semibold hover:text-blue-600 ${
                stickyNav ? "sticky-menu" : ""
              }`}
            >
              <Link href="/exam">Exam</Link>
            </li>
            <li
              className={`left-menus__menu hidden lg:inline-block font-semibold hover:text-blue-600 ${
                stickyNav ? "sticky-menu" : ""
              }`}
            >
              <Link href="/test">Test</Link>
            </li>
            <li
              className={`left-menus__menu inline-block font-semibold hover:text-blue-600 ${
                stickyNav ? "sticky-menu" : ""
              }`}
            >
              <Link href="/bookmarks">Bookmarks</Link>
            </li>
            <li
              className={`left-menus__menu inline-block font-semibold hover:text-blue-600 ${
                stickyNav ? "sticky-menu" : ""
              }`}
            >
              <Link href="/random-question">Random Question</Link>
            </li>
            <li
              className={`left-menus__menu inline-block font-semibold hover:text-blue-600 ${
                stickyNav ? "sticky-menu" : ""
              }`}
            >
              <Link href="/discussion">Discuss</Link>
            </li>
          </div>

          {/* right side menu for large devices  */}
          <div className="flex items-center gap-4">
            <div className="body__right-menus hidden md:flex md:items-center gap-4">
              {myProfile?.email ? (
                <>
                  {myProfile?.isPremium || (
                    <li
                      className={`px-2 flex items-center border-2 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300  `}
                    >
                      <Link
                        className="btn-link hover:no-underline"
                        href="/be-a-premium-user"
                      >
                        <h6 className={`btn-text text-white`}>
                          Be a premium user
                        </h6>
                      </Link>
                    </li>
                  )}
                  <li
                    className={`px-2 flex items-center border-2 rounded-lg hover:bg-green-500 duration-300  `}
                  >
                    <Link
                      className="btn-link hover:no-underline"
                      href="/dashboard"
                    >
                      <h6
                        className={`btn-text ${
                          stickyNav
                            ? "text-black hover:text-white"
                            : "text-white"
                        }`}
                      >
                        Dashboard
                      </h6>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="download flex items-center  rounded-lg bg-blue-700">
                  <Link href="/login">
                    <h6 className="btn-text text-white px-2">Login/SignUp</h6>
                  </Link>
                </li>
              )}
            </div>

            {/* left side menu for large devices  */}
            <div className="md:hidden flex items-center gap-4">
              {myProfile?.email ? (
                <li className="flex items-center  rounded-lg bg-blue-700 hover:bg-green-500 duration-300 px-3 py-[2px]">
                  <Link href="/dashboard">
                    <h6 className="btn-text text-white">Dashboard</h6>
                  </Link>
                </li>
              ) : (
                <li className="flex items-center  rounded-lg bg-blue-700 px-3 py-[2px]">
                  <Link href="/login">
                    <h6 className="btn-text text-white">Login/SignUp</h6>
                  </Link>
                </li>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center">
                <div className="relative inline-block text-left dropdown">
                  <span className="rounded-md shadow-sm">
                    <button
                      className="transition duration-150 ease-in-out"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded="true"
                      aria-controls="headlessui-menu-items-117"
                    >
                      <svg
                        className="small-device__sidebar-toggle w-52 h-52 cursor-pointer"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="MenuIcon"
                      >
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                      </svg>
                    </button>
                  </span>
                  <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                    <div
                      className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none text-gray-700 text-sm"
                      aria-labelledby="headlessui-menu-button-1"
                      id="headlessui-menu-items-117"
                      role="menu"
                    >
                      <div className="px-4 py-3">
                        {myProfile?.email ? (
                          <>
                            <p className="text-sm leading-5 text-gray-700">
                              Signed in as
                            </p>
                            <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                              {myProfile?.email}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm leading-5 text-gray-700">
                            Not signed in
                          </p>
                        )}
                      </div>
                      <div className="py-1">
                        <Link
                          href="/exam"
                          className="px-4 py-2 hover:bg-gray-200 flex justify-between w-full"
                        >
                          Exam
                        </Link>
                        <Link
                          href="/test"
                          className="px-4 py-2 hover:bg-gray-200 flex justify-between w-full"
                        >
                          Test
                        </Link>
                        {myProfile?.email && (
                          <>
                            {myProfile?.isPremium || (
                              <Link
                                href="/be-a-premium-user"
                                className="px-4 py-2 hover:bg-gray-200 flex justify-between w-full"
                              >
                                Be a premium user
                              </Link>
                            )}
                          </>
                        )}
                        <Link
                          href="/random-question"
                          className="px-4 py-2 hover:bg-gray-200 flex justify-between w-full"
                        >
                          Random Question
                        </Link>
                        <Link
                          href="/discussion"
                          className="px-4 py-2 hover:bg-gray-200 flex justify-between w-full"
                        >
                          Discuss
                        </Link>
                        <Link
                          href="/bookmarks"
                          className="px-4 py-2 hover:bg-gray-200 flex justify-between w-full"
                        >
                          Bookmarks
                        </Link>
                      </div>
                      <div className="py-1">
                        {myProfile?.email ? (
                          <Link
                            href="#"
                            onClick={() => handleSignOut()}
                            className="px-4 py-2 hover:bg-gray-200 flex justify-between w-full"
                          >
                            Logout
                          </Link>
                        ) : (
                          <Link
                            href="/login"
                            className="px-4 py-2 hover:bg-gray-200 flex justify-between w-full"
                          >
                            Login
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
