import { useSignUpMutation } from "@/redux/user/userApi";
import { saveToLocalStorage } from "@/utils/localstorage";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [signUp, { data, isError, isLoading, isSuccess, error }] =
    useSignUpMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmPassword.value) {
      toast.error("Password doesn't matched!");
    } else {
      const newData = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: "user",
        phone: e.target.phone.value,
      };

      try {
        await signUp(newData);
        saveToLocalStorage("access-token", data?.data?.accessToken);
        saveToLocalStorage("user-info", JSON.stringify(data?.data?.userData));
      } catch (error) {
        toast.error(`${error?.data?.message}` || "Something went wrong");
      }
    }
  };

  const router = useRouter();
  const state = router.query.state;
  useEffect(() => {
    if (isSuccess && !isLoading) {
      if (state?.path) {
        router.push(state?.path);
      } else {
        router.push("/");
      }
    }

    if (isError) {
      toast.error(`${error?.data?.message}` || "Something went wrong");
    }

    if (isSuccess) {
      toast.success("Successfully registered, Please login now!");
    }
  }, [isLoading, router, state, isSuccess, error, isError, data]);

  return (
    <div className="py-5 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="mx-auto border rounded-md shadow-lg p-8 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <h1 className="text-3xl font-semibold text-center text-blue-500">
          Sign Up
        </h1>
        <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
          <div className="mb-2">
            <input
              type="name"
              name="name"
              placeholder="Name"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              type="phone"
              name="phone"
              placeholder="Phone"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              type="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
