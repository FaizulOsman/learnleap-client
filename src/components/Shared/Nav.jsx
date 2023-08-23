import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [stickyNav, setStickyNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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
      className={`border-b-1 border-solid border-blue-200 z-999 fixed w-full top-0 ${
        stickyNav ? "sticky w-full top-0 shadow-md border-b-0" : ""
      }`}
    >
      <div
        className={`navbar-wrapper__body ${
          stickyNav ? "sticky__body" : ""
        } px-4 py-2 md:px-0 md:py-3`}
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
          <li
            className="left-menus__menu" /* style={{display:`${stickyNav ? "none" : ""}`}} */
          >
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
          <li className={`left-menus__menu ${stickyNav ? "sticky-menu" : ""}`}>
            <Link href="/exam">Exam</Link>
          </li>
          <li className={`left-menus__menu ${stickyNav ? "sticky-menu" : ""}`}>
            <Link href="/test">Test</Link>
          </li>
        </div>
        {/* right side menu for large devices  */}
        <div className="body__right-menus hidden md:flex md:items-center">
          <li className="download flex items-center  rounded-lg bg-blue-700">
            <Link href="/login">
              <h6 className="btn-text text-white px-2">Login/SignUp</h6>
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
        </div>
        {/* left side menu for large devices  */}
        <div className="md:hidden flex items-center gap-4">
          <li className="flex items-center  rounded-lg bg-blue-700 px-3 py-[2px]">
            <Link href="/login">
              <h6 className="btn-text text-white">Login/SignUp</h6>
            </Link>
          </li>
          <li className="flex items-center  rounded-lg bg-blue-700 px-3 py-[2px]">
            <Link href="/dashboard">
              <h6 className="btn-text text-white">Dashboard</h6>
            </Link>
          </li>
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
                <Link href="https://pos.gromoinsure.in/">Insurance-POS</Link>
              </li>
              <li className="body__menu">
                <Link href="/careers">Careers</Link>
              </li>
              <li className="body__menu">
                <Link href="/about-us">About us</Link>
              </li>
              <li className="body__menu">
                <Link href="/blog">Blogs</Link>
              </li>
            </div>
          </div>
          <div className="sidebar__backdrop"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
