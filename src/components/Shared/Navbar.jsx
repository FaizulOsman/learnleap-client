import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localstorage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [stickyNav, setStickyNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const state = router.query.state;
  const [myProfile, setMyProfile] = useState({});

  const handleSignOut = () => {
    if (state?.path) {
      router.push(state?.path);
    } else {
      router.push("/login");
    }

    removeFromLocalStorage("user-info");
    removeFromLocalStorage("access-token");
    toast.success("Successfully Signed Out!");
  };

  useEffect(() => {
    const accessToken = getFromLocalStorage("access-token");
    const headers = {
      authorization: accessToken,
    };

    if (headers.authorization) {
      // const url = "http://localhost:5000/api/v1/users/my-profile";
      const url =
        "https://test-yourself-server.vercel.app/api/v1/users/my-profile";
      const options = {
        method: "GET",
        headers: headers,
      };

      async function fetchData() {
        try {
          const res = await fetch(url, options);
          const data = await res.json();
          setMyProfile(data?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }

    const stickyNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.pageYOffset > 5) {
          setStickyNav(true);
        } else {
          setStickyNav(false);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", stickyNavbar);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", stickyNavbar);
      }
    };
  }, []);

  return (
    <div
      className={`aaa border-b-1 border-solid border-blue-200 z-999 fixed w-full top-0 ${
        stickyNav
          ? "sticky shadow-md border-b-0 sticky__body"
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
                className="w-10 h-8"
                src="https://i.ibb.co/S33Tq0K/logo-nobg-n.png"
                decoding="async"
                loading="lazy"
                width={300}
                height={300}
              />
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:w-fit">
            <li className="left-menus__menu">
              <Link href="/">
                <Image
                  alt="Logo"
                  className="w-12 h-10"
                  src="https://i.ibb.co/S33Tq0K/logo-nobg-n.png"
                  decoding="async"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </Link>
            </li>
            <li
              className={`left-menus__menu font-semibold ${
                stickyNav ? "sticky-menu" : ""
              }`}
            >
              <Link href="/exam">Exam</Link>
            </li>
            <li
              className={`left-menus__menu font-semibold ${
                stickyNav ? "sticky-menu" : ""
              }`}
            >
              <Link href="/test">Test</Link>
            </li>
          </div>
          {/* right side menu for large devices  */}
          <div className="body__right-menus hidden md:flex md:items-center">
            {myProfile?.email ? (
              <>
                <li className="">
                  <Link
                    className="btn-link"
                    href="#"
                    onClick={() => handleSignOut()}
                  >
                    <h6
                      className={`btn-text px-2 ${
                        stickyNav ? "text-black" : "text-white"
                      }`}
                    >
                      Logout
                    </h6>
                  </Link>
                </li>
                <li className="download flex items-center border-2 rounded-lg">
                  <Link className="btn-link" href="/dashboard">
                    <h6
                      className={`btn-text px-2 ${
                        stickyNav ? "text-black" : "text-white"
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
              <li className="flex items-center  rounded-lg bg-blue-700 px-3 py-[2px]">
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
            <svg
              onClick={() => setIsOpen(true)}
              className="small-device__sidebar-toggle"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="MenuIcon"
            >
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </div>

          {/* Sidebar  */}
          <div className={`sidebar-wrapper ${isOpen ? "open" : ""}`}>
            <div className={`sidebar ${isOpen ? "" : "closeAnimation"}`}>
              <div className="sidebar__header">
                <div className="header__logoArea">
                  <Link href="/">
                    <Image
                      alt="Logo"
                      className="w-10 h-8"
                      src="https://i.ibb.co/S33Tq0K/logo-nobg-n.png"
                      decoding="async"
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                  </Link>
                </div>
                <div className="header__closeButton">
                  <button onClick={() => setIsOpen(false)} className="button">
                    <AiOutlineClose className="button-icon" />
                  </button>
                </div>
              </div>
              <div className="sidebar__body">
                <li className="body__menu">
                  <Link href="/exam">Exam</Link>
                </li>
                <li className="body__menu">
                  <Link href="/test">Test</Link>
                </li>
                <li className="body__menu">
                  <Link href="/about-us">About us</Link>
                </li>
                {myProfile?.email ? (
                  <li className="body__menu">
                    <Link href="#" onClick={() => handleSignOut()}>
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li className="body__menu">
                    <Link href="/login">Login</Link>
                  </li>
                )}
              </div>
            </div>
            <div className="sidebar__backdrop"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
