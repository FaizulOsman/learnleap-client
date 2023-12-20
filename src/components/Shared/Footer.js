import React from "react";
import { TfiTwitter } from "react-icons/tfi";
import { FaFacebookF } from "react-icons/fa";
import { BiLogoLinkedin } from "react-icons/bi";
import Link from "next/link";
import Heading from "../UI/Heading";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
      <div className="w-11/12 max-w-[1200px] mx-auto">
        <footer className="main-container relative pt-8 pb-6">
          <div className="container mx-auto">
            <div className="flex flex-wrap text-left lg:text-left">
              <div className="w-full lg:w-6/12">
                <Heading text="Learn Leap" styles="text-white pb-2" />
                <h5 className="text-lg mt-0 mb-2 ">
                  Providing reliable tech since 2023.
                </h5>
                <div className="mt-6 lg:mb-0 mb-6 flex">
                  <button
                    className="border-none bg-white text-[#1d9bf0] text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <BiLogoLinkedin className="w-full h-full p-[6px]" />
                  </button>
                  <button
                    className="border-none bg-white text-blue-700 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <FaFacebookF className="w-full h-full p-2" />
                  </button>
                  <button
                    className="border-none bg-white text-[#1d9bf0] text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <TfiTwitter className="w-full h-full p-2" />
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-6/12">
                <div className="flex flex-wrap items-top mb-6">
                  <div className="w-full lg:w-4/12 px-4 ml-auto">
                    <span className="block uppercase  text-sm font-bold mb-2">
                      Useful Links
                    </span>
                    <ul className="list-unstyled">
                      <li>
                        <Link
                          className="font-semibold block pb-2 text-sm"
                          href="/exam"
                        >
                          Exam
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="font-semibold block pb-2 text-sm"
                          href="/test"
                        >
                          Test
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="font-semibold block pb-2 text-sm"
                          href="/bookmarks"
                        >
                          Bookmarks
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 pt-3 lg:pt-0">
                    <span className="block uppercase  text-sm font-bold mb-2">
                      Other Resources
                    </span>
                    <ul className="list-unstyled">
                      <li>
                        <Link
                          className="font-semibold block pb-2 text-sm"
                          href="/random-question"
                        >
                          Random Questions
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="font-semibold block pb-2 text-sm"
                          href="discussion"
                        >
                          Discuss
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="font-semibold block pb-2 text-sm"
                          href="/be-a-premium-user"
                        >
                          Be a premium user
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-6 border-blueGray-300" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                <div className="text-sm font-semibold py-1">
                  Copyright © <span id="get-current-year">2023 </span>
                  <Link href="/" className="hover:" target="_blank">
                    Learn Leap
                  </Link>{" "}
                  <Link href="/" className="hover:text-blueGray-800">
                    Online Service
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
