import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localstorage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Navbar = () => {
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

    const url = "http://localhost:5000/api/v1/users/my-profile";
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
  }, []);

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
                    <Link href="/categories/bengali">Bengali</Link>
                  </li>
                  <li>
                    <Link href="/categories/english">English</Link>
                  </li>
                  <li>
                    <Link href="/categories/gk">GK</Link>
                  </li>
                  <li>
                    <Link href="/categories/math">Math</Link>
                  </li>
                  <li>
                    <Link href="/categories/physics">Physics</Link>
                  </li>
                  <li>
                    <Link href="/categories/chemistry">Chemistry</Link>
                  </li>
                  <li>
                    <Link href="/categories/others">Others</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link
            href="/"
            className="hidden sm:flex btn btn-ghost normal-case text-xl"
          >
            TestYourself
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
                    <Link href="/categories/bengali">Bengali</Link>
                  </li>
                  <li>
                    <Link href="/categories/english">English</Link>
                  </li>
                  <li>
                    <Link href="/categories/gk">GK</Link>
                  </li>
                  <li>
                    <Link href="/categories/math">Math</Link>
                  </li>
                  <li>
                    <Link href="/categories/physics">Physics</Link>
                  </li>
                  <li>
                    <Link href="/categories/chemistry">Chemistry</Link>
                  </li>
                  <li>
                    <Link href="/categories/others">Others</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/dashboard" className="btn">
            Dashboard
          </Link>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {/* {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                ) : ( */}
                <Image
                  src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
                  alt="avatar"
                  width={20}
                  height={20}
                />
                {/* )} */}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <>
                {myProfile?.name && (
                  <li>
                    <a>{myProfile?.name}</a>
                  </li>
                )}
                {myProfile?.email && (
                  <li>
                    <a>{myProfile?.email}</a>
                  </li>
                )}
                {myProfile ? (
                  <li>
                    <a onClick={() => handleSignOut()}>Logout</a>
                  </li>
                ) : (
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                )}
              </>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
