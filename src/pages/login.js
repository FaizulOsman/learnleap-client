import Navbar from "@/components/Shared/Navbar";
import CopyToClipboard from "@/components/UI/CopyToClipboard";
import { useLoginMutation } from "@/redux/user/userApi";
import { saveToLocalStorage } from "@/utils/localstorage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const [login, { data, isError, isLoading, isSuccess, error }] =
    useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: e.target.email.value, password: e.target.password.value });
  };

  const state = router.query.state;
  useEffect(() => {
    if (isSuccess && !isLoading) {
      if (state?.path) {
        router.push(state?.path);
      } else {
        router.push("/");
      }
      toast.success("You have logged in successfully.");
      saveToLocalStorage("access-token", data?.data?.accessToken);
      saveToLocalStorage("user-info", JSON.stringify(data?.data?.userData));
    }
    if (isError === true && error) {
      if ("data" in error) {
        toast.error(`${error?.data.message}`);
      }
    }
  }, [isLoading, router, state, isSuccess, error, isError, data]);

  const copyToClipboard = (e) => {
    const email = "a@gmail.com";
    const password = "123456";
    var textField = document.createElement("textarea");
    textField.innerText = email + " " + password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <>
      <div
        className="py-20 min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: "url(https://i.ibb.co/ZHS7kPm/login-bg.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="relative bg-white mx-auto border rounded-md shadow-lg p-8 flex w-11/12 flex-col justify-center space-y-6 max-w-[350px]">
          <div className="absolute -top-16 right-[44%] md:-right-16">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="border-gray-800 rounded-full flex items-center justify-center"
                id="menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <Image
                  alt="avatar"
                  className={`w-10 h-10 rounded-full p-[2px] bg-white cursor-pointer`}
                  src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                  decoding="async"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </button>
            </div>
            {isDropdownOpen && (
              <div
                className="absolute -left-[65px] md:left-0 z-50 mt-2 w-44 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-green-500 ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="">
                  <div className="relative bg-white border border-gray-400 rounded-lg">
                    <div className="text-gray-800 text-sm">
                      <div className="text-sm text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 duration-300">
                        <h4>Admin</h4>
                        <p className="relative">
                          Email: a@gmail.com
                          <span className="absolute right-0 top-[6px]">
                            <CopyToClipboard
                              text="a@gmail.com"
                              styles="w-[10px] h-[10px] hover:text-blue-500"
                            />
                          </span>
                        </p>
                        <p className="relative">
                          Password: 1234564
                          <span className="absolute right-0 top-[6px]">
                            <CopyToClipboard
                              text="1234564"
                              styles="w-[10px] h-[10px] hover:text-blue-500"
                            />
                          </span>
                        </p>
                      </div>
                      <div className="text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 duration-300">
                        <h4>User</h4>
                        <p className="relative">
                          Email: b@gmail.com
                          <span className="absolute right-0 top-[6px]">
                            <CopyToClipboard
                              text="b@gmail.com"
                              styles="w-[10px] h-[10px] hover:text-blue-500"
                            />
                          </span>
                        </p>
                        <p className="relative">
                          Password: 123456
                          <span className="absolute right-0 top-[6px]">
                            <CopyToClipboard
                              text="123456"
                              styles="w-[10px] h-[10px] hover:text-blue-500"
                            />
                          </span>
                        </p>
                      </div>
                      <div className="absolute top-0 left-[48%] md:left-[20px] transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-gray-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-semibold text-center text-blue-500">
            Sign in
          </h1>
          <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            {/* <a href="#" className="text-xs text-blue-600 hover:underline">
              Forget Password?
            </a> */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Dont have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
