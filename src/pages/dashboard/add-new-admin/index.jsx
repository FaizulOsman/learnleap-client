import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSignUpMutation } from "../../../redux/user/userApi";
import DashboardLayout from "../../../layouts/DashboardLayout";
import useProtectedRoute from "../../../hooks/useProtectedRoute";

const jwt = require("jsonwebtoken");

const AddNewAdmin = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const [signUp, { isSuccess, isError, error }] = useSignUpMutation();

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: "admin",
      phone: e.target.phone.value,
    };
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(data?.email)) {
      toast.error("Please enter a valid email");
    }
    if (emailPattern.test(data?.email)) {
      signUp(data);

      e.target.name.value = "";
      e.target.email.value = "";
      e.target.password.value = "";
      e.target.phone.value = "";
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Admin created successfully!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isError, error]);

  return (
    <div>
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Create An Admin
        </h3>

        <form
          onSubmit={(e) => handleCreateAdmin(e)}
          className="grid grid-cols-1 justify-between gap-6 mt-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewAdmin;

AddNewAdmin.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
