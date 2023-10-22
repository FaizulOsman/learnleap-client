import useProtectedRoute from "../../../../hooks/useProtectedRoute";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../../../redux/user/userApi";
import { useRouter } from "next/router";

const jwt = require("jsonwebtoken");

const UpdateUser = () => {
  const { query } = useRouter();

  const [user, setUser] = useState([]);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getSingleUser } = useGetSingleUserQuery({
    id: query?.userId,
    headers,
  });

  const [
    updateUser,
    {
      isSuccess: updateUserIsSuccess,
      isError: updateUserIsError,
      error: updateUserError,
    },
  ] = useUpdateUserMutation();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const data = { email, phone };
    console.log(data);
    updateUser({ id: query?.userId, data, headers });
  };

  useEffect(() => {
    setUser(getSingleUser?.data);

    if (updateUserIsSuccess) {
      toast.success("Profile updated successfully");
    }
    if (updateUserIsError) {
      toast.error(updateUserError.message || "Something went wrong");
    }
  }, [
    getSingleUser?.data,
    updateUserIsSuccess,
    updateUserIsError,
    updateUserError,
  ]);

  return (
    <div className="py-7">
      <div>
        <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto border rounded-lg border-blue-500 p-5">
          <h3 className="text-xl sm:text-2xl font-bold text-center my-5">
            Update User
          </h3>
          <div>
            <form onSubmit={(e) => handleUpdateProfile(e)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-8 mt-4">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={user?.name}
                    disabled={true}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={user?.email}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={user?.phone}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    Phone
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="image"
                    name="image"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={user?.image}
                    disabled={true}
                  />
                  <label
                    htmlFor="image"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    image
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={user?.address}
                    disabled={true}
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-sm left-6 -top-3 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
                  >
                    address
                  </label>
                </div>
                <button type="submit" className="btn btn-sm w-full btn-primary">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

UpdateUser.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
