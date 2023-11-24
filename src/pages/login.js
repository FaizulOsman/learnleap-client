import { useLoginMutation } from "@/redux/user/userApi";
import { saveToLocalStorage } from "@/utils/localstorage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
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

  return (
    <>
      <div className="py-5 relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="mx-auto border rounded-md shadow-lg p-8 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <h1 className="text-3xl font-semibold text-center text-blue-500">
            Sign in
          </h1>
          <div className="flex justify-around mt-5">
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="border-b-2 border-blue-600">
                Admin
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-52"
              >
                <p>
                  <span className="font-bold">Email:</span> a@gmail.com
                </p>
                <p className="mt-2">
                  <span className="font-bold">Password:</span> 1234564
                </p>
              </ul>
            </div>
            <div className="dropdown dropdown-hover dropdown-end">
              <label tabIndex={0} className="border-b-2 border-blue-600">
                User
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-52"
              >
                <p>
                  <span className="font-bold">Email:</span> b@gmail.com
                </p>
                <p className="mt-2">
                  <span className="font-bold">Password:</span> 123456
                </p>
              </ul>
            </div>
          </div>
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
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
