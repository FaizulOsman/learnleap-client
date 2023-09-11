import {
  useCreateDiscussMutation,
  useGetAllDiscussQuery,
  useUpdateDiscussMutation,
} from "@/redux/discuss/discussApi";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

const Discuss = () => {
  const [replyFormIndex, setReplyFormIndex] = useState(null);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });
  const [createDiscuss, { isSuccess: createDiscussIsSuccess, error }] =
    useCreateDiscussMutation();
  const [updateDiscuss, { isSuccess: updateDiscussIsSuccess }] =
    useUpdateDiscussMutation();
  const { data: getAllDiscuss } = useGetAllDiscussQuery();

  const handleAddQuesInDiscuss = (e) => {
    e.preventDefault();
    const data = {
      userName: getMyProfile?.data?.name,
      userEmail: getMyProfile?.data?.email,
      question: e.target.discuss.value,
    };
    createDiscuss(data);
    e.target.discuss.value = "";
  };

  const handleLike = (d) => {
    const isAlreadyLiked = d?.likes?.find(
      (like) =>
        like.email === getMyProfile?.data?.email && like?.isLiked === true
    );

    const removeLikeAndFilterOthers = d?.likes?.filter(
      (data) => data?.email !== isAlreadyLiked?.email
    );

    if (!isAlreadyLiked) {
      const data = {
        likes: [
          ...d?.likes,
          {
            email: getMyProfile?.data?.email,
            isLiked: true,
          },
        ],
      };
      updateDiscuss({ id: d?.id, data });
    } else {
      const data = {
        likes: removeLikeAndFilterOthers,
      };
      updateDiscuss({ id: d?.id, data });
    }
  };

  const handleAddReply = ({ e, data: d }) => {
    e.preventDefault();
    const data = {
      replies: [
        ...d?.replies,
        {
          email: getMyProfile?.data?.email,
          name: getMyProfile?.data?.name,
          reply: e.target.reply.value,
        },
      ],
    };
    updateDiscuss({ id: d?.id, data });
    e.target.reply.value = "";
  };

  const handleRemoveReply = ({ data: d, reply }) => {
    const removeReplyAndFilterOthers = d?.replies?.filter(
      (data) => data?.id !== reply?.id
    );

    const data = {
      replies: removeReplyAndFilterOthers,
    };
    updateDiscuss({ id: d?.id, data });
  };

  useEffect(() => {
    if (createDiscussIsSuccess) {
      toast.success("Question added in discussion!");
    }
    if (updateDiscussIsSuccess) {
      toast.success("Done!");
    }
  }, [createDiscussIsSuccess, updateDiscussIsSuccess]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        Discussion
      </h1>
      <div>
        <div className="flex justify-between border-b-2 pb-4">
          <h2 className="text-xl font-bold">
            {getAllDiscuss?.meta?.total} Comments
          </h2>
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
            <form
              onSubmit={(e) => handleAddQuesInDiscuss(e)}
              className="flex gap-4"
            >
              <input
                type="text"
                name="discuss"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button
                type="submit"
                className="border-2 border-blue-500 rounded-full px-[14px] py-2 bg-blue-500 flex items-center justify-center cursor-pointer"
              >
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
              </button>
            </form>
          </div>
        </div>

        {getAllDiscuss?.data?.map((data, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <Image
              alt="Profile Image"
              className="w-10 h-10 rounded-full border-2 p-[2px] mt-3"
              src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
              decoding="async"
              loading="lazy"
              width={300}
              height={300}
            />
            <div className="">
              <h4 className="font-semibold">{data?.userName}</h4>
              <p className="text-gray-600 text-sm">{data?.question}</p>
              <div className="flex items-center gap-2 text-sm">
                <p className="text-blue-500">
                  {data?.likes?.length}{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleLike(data)}
                  >
                    {data?.likes?.find(
                      (like) => like?.email === getMyProfile?.data?.email
                    ) ? (
                      <span>Unlike</span>
                    ) : (
                      <span>Like</span>
                    )}
                  </span>
                </p>
                <p className="">.</p>
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setReplyFormIndex(index)}
                >
                  Reply
                </p>
                <p className="">.</p>
                <p className="text-gray-500">3y</p>
              </div>
              {index === replyFormIndex && (
                <form
                  onSubmit={(e) => handleAddReply({ e, data })}
                  className="flex gap-2 my-4"
                >
                  <input
                    type="text"
                    name="reply"
                    placeholder="Reply"
                    className="input input-bordered input-sm w-full"
                  />
                  <button
                    type="submit"
                    className="border-2 border-blue-500 rounded-full px-[6px] py-1 bg-blue-500 flex items-center justify-center cursor-pointer"
                  >
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
                  </button>
                </form>
              )}
              {data?.replies?.map((reply, index) => (
                <div key={index} className="mt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      alt="Profile Image"
                      className="w-10 h-10 rounded-full border-2 p-[2px]"
                      src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                      decoding="async"
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                    <div className="">
                      <h4 className="font-semibold flex gap-4">
                        {reply?.name}
                        {reply?.email === getMyProfile?.data?.email && (
                          <AiOutlineDelete
                            onClick={() => handleRemoveReply({ data, reply })}
                            className="text-red-500 cursor-pointer mt-1"
                          />
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm">{reply?.reply}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discuss;
