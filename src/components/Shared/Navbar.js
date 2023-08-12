import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="w-11/12 max-w-[1200px] mx-auto">
      <div className="navbar bg-base-100 border-b-2 border-gray-500">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <a>Categories</a>
                <ul className="p-2">
                  <li>
                    <Link href="/categories/CPU-Processor">CPU-Processor</Link>
                  </li>
                  <li>
                    <Link href="/categories/Motherboard">Motherboard</Link>
                  </li>
                  <li>
                    <Link href="/categories/RAM">RAM</Link>
                  </li>
                  <li>
                    <Link href="/categories/Power Supply Unit">
                      Power Supply Unit
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/Storage Device">
                      Storage Device
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/Monitor">Monitor</Link>
                  </li>
                  <li>
                    <Link href="/categories/Others">Others</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link
            href="/"
            className="hidden sm:flex btn btn-ghost normal-case text-xl"
          >
            BuildMasterPC
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Categories</summary>
                <ul className="p-2 z-50">
                  <li>
                    <Link href="/categories/CPU-Processor">CPU-Processor</Link>
                  </li>
                  <li>
                    <Link href="/categories/Motherboard">Motherboard</Link>
                  </li>
                  <li>
                    <Link href="/categories/RAM">RAM</Link>
                  </li>
                  <li>
                    <Link href="/categories/Power Supply Unit">
                      Power Supply Unit
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/Storage Device">
                      Storage Device
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/Monitor">Monitor</Link>
                  </li>
                  <li>
                    <Link href="/categories/Others">Others</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/pc-builder" className="btn">
            PC Builder
          </Link>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              {session?.user ? (
                <>
                  <li>
                    <a>{session?.user?.name}</a>
                  </li>
                  <li>
                    <a>{session?.user?.email}</a>
                  </li>
                  <li>
                    <a onClick={() => signOut()}>Logout</a>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
