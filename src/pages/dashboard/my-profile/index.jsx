import Heading from "@/components/UI/Heading";
import ImageUpload from "@/components/UI/ImageUpload";
import Modal from "@/components/UI/Modal/Modal";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/user/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const jwt = require("jsonwebtoken");

const MyProfile = () => {
  const [MyProfile, setMyProfile] = useState([]);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  const [
    updateMyProfile,
    {
      isSuccess: updateProfileIsSuccess,
      isError: updateProfileIsError,
      error: updateProfileError,
    },
  ] = useUpdateMyProfileMutation();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;

    const data = { email, phone, address };
    updateMyProfile({ data, headers });
  };

  const handleUploadImage = async (imageUrl) => {
    const data = { imageUrl: imageUrl };
    await updateMyProfile({ data, headers });

    const modal = document.getElementById(MyProfile?.id);
    if (modal) {
      window.location.reload();
      modal.close();
    }
  };

  useEffect(() => {
    setMyProfile(getMyProfile?.data);

    if (updateProfileIsSuccess) {
      toast.success("Profile updated successfully");
    }
    if (updateProfileIsError) {
      toast.error(updateProfileError.message || "Something went wrong");
    }
  }, [
    getMyProfile?.data,
    updateProfileIsSuccess,
    updateProfileIsError,
    updateProfileError,
  ]);

  return (
    <div className="py-7">
      <div>
        <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto border rounded-lg border-blue-500 p-5">
          <Heading text="My Profile" styles="text-white text-center" />
          <div className="text-center mx-auto">
            <Modal
              Button={
                <div className="relative text-center">
                  <Image
                    src={
                      MyProfile?.imageUrl
                        ? MyProfile?.imageUrl
                        : "https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                    }
                    className="w-16 h-16 mx-auto border border-gray-800 rounded-full mb-10"
                    width="150"
                    height="150"
                    alt="Profile Image"
                  />
                  <div>
                    <p
                      className="absolute bottom-0 left-0 w-full flex justify-center items-center h-1/2 hover:bg-gray-400 hover:bg-opacity-50 hover:text-blue-700"
                      style={{ borderRadius: "0 0 30px 30px" }}
                    >
                      <FaRegEdit />
                    </p>
                  </div>
                </div>
              }
              styles="justify-center"
              data={MyProfile}
              modalBody={
                <div className="relative">
                  <RxCross2
                    onClick={() => {
                      const modal = document.getElementById(MyProfile?.id);
                      if (modal) {
                        modal.close();
                      }
                    }}
                    className="text-lg absolute -top-3 -right-2 cursor-pointer"
                  />
                  <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                    Upload you new profile image.
                  </h3>
                  <ImageUpload handleUploadImage={handleUploadImage} />
                </div>
              }
            />
          </div>
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
                    defaultValue={MyProfile?.name}
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
                    defaultValue={MyProfile?.email}
                    disabled={true}
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
                    defaultValue={MyProfile?.phone}
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
                    id="address"
                    name="address"
                    className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                    autoComplete="off"
                    defaultValue={MyProfile?.address}
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

export default MyProfile;

MyProfile.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
