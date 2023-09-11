import Image from "next/image";
import React from "react";

const Discuss = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        Discussion
      </h1>
      <div>
        <div className="flex justify-between border-b-2 pb-4">
          <h2 className="text-xl font-bold">165 Comments</h2>
          <div className="flex items-center gap-4">
            <span>Sort By</span>
            <select className="select select-bordered select-sm max-w-xs">
              <option selected>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between my-8 gap-4">
          <Image
            alt="Profile Image"
            className="w-12 rounded-full border-2 p-[2px]"
            src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
            decoding="async"
            loading="lazy"
            width={300}
            height={300}
          />
          <div className="flex-1">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <div className="border-2 border-blue-500 rounded-full px-[14px] py-2 bg-blue-500 flex items-center justify-center cursor-pointer">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Image
            alt="Profile Image"
            className="w-12 h-12 rounded-full border-2 p-[2px]"
            src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
            decoding="async"
            loading="lazy"
            width={300}
            height={300}
          />
          <div className="">
            <h4 className="font-semibold">Aaliyah Walsh</h4>
            <p className="text-gray-600 text-sm">অনেক অনেক সুন্দর</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-500">5 Like</span>
              <span className="">.</span>
              <span className="text-blue-500">Reply</span>
              <span className="">.</span>
              <span className="text-gray-500">3y</span>
            </div>

            <div className="mt-4">
              <div className="flex gap-4 mb-4">
                <Image
                  alt="Profile Image"
                  className="w-12 h-12 rounded-full border-2 p-[2px]"
                  src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                  decoding="async"
                  loading="lazy"
                  width={300}
                  height={300}
                />
                <div className="">
                  <h4 className="font-semibold">Aaliyah Walsh</h4>
                  <p className="text-gray-600 text-sm">অনেক অনেক সুন্দর</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discuss;
