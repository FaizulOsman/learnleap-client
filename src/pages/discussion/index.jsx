import MetaData from "@/components/SEO/MetaData";
import Heading from "@/components/UI/Heading";
import RootLayout from "@/layouts/RootLayout";
import {
  useCreateDiscussMutation,
  useDeleteDiscussMutation,
  useGetAllDiscussQuery,
  useUpdateDiscussMutation,
} from "@/redux/discuss/discussApi";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

const Discussion = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [replyFormIndex, setReplyFormIndex] = useState(null);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });
  const [
    createDiscuss,
    { data: createDiscussData, isSuccess: createDiscussIsSuccess },
  ] = useCreateDiscussMutation();
  const [updateDiscuss] = useUpdateDiscussMutation();
  const [deleteDiscuss, { isSuccess: deleteDiscussIsSuccess }] =
    useDeleteDiscussMutation();
  const { data: getAllDiscuss } = useGetAllDiscussQuery({
    page,
    limit,
    sortOrder,
  });

  const handleAddQuesInDiscuss = (e) => {
    e.preventDefault();
    if (accessToken) {
      const data = {
        userName: getMyProfile?.data?.name,
        userEmail: getMyProfile?.data?.email,
        question: e.target.discuss.value,
      };
      createDiscuss(data);
    } else {
      toast.error("You must be logged in first!");
    }
    e.target.discuss.value = "";
  };

  const handleDeleteDiscuss = (data) => {
    deleteDiscuss({ id: data?.id, headers });
  };

  const handleLike = (d) => {
    if (accessToken) {
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
    } else {
      toast.error("You must be logged in first!");
    }
  };

  const handleAddReply = ({ e, data: d }) => {
    e.preventDefault();
    if (accessToken) {
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
    } else {
      toast.error("You must be logged in first!");
    }
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

  const totalPage = Math.ceil(parseInt(meta?.total) / parseInt(meta?.limit));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (createDiscussData && createDiscussIsSuccess) {
      toast.success("Question added in discussion!");
    }
  }, [createDiscussData, createDiscussIsSuccess]);

  useEffect(() => {
    if (deleteDiscussIsSuccess) {
      toast.success("Question deleted successfully!");
    }
  }, [deleteDiscussIsSuccess]);

  useEffect(() => {
    setMeta(getAllDiscuss?.meta);
  }, [getAllDiscuss?.meta]);

  return (
    <div>
      <MetaData title="Learn Leap" />
      <Heading text="Discussion" styles="text-green-600 text-center" />
      <div>
        <div className="flex justify-between border-b-2 pb-4">
          <select
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSortOrder(selectedValue);
            }}
            className="select select-bordered select-sm max-w-xs"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
          <div className="sm:ml-auto mr-5 flex items-center gap-4"></div>
          <div className="text-xs items-center inline-flex">
            <button
              onClick={() => setLimit(limit - 1)}
              className={`mr-2 inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
                limit === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "border-gray-800"
              } leading-none`}
              disabled={limit === 1}
            >
              <svg
                className="w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <span className="mr-2 font-semibold">Limit {limit}</span>
            <button
              onClick={() => setLimit(limit + 1)}
              className={`inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
                page === totalPage
                  ? "opacity-50 cursor-not-allowed"
                  : "border-gray-800"
              } leading-none`}
              disabled={limit === parseInt(meta?.total)}
            >
              <svg
                className="w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
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
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              <h4 className="font-semibold">
                {data?.userName === getMyProfile?.data.name
                  ? `${data?.userName} (You)`
                  : data?.userName}
              </h4>
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

                {data?.userEmail === getMyProfile?.data?.email && (
                  <>
                    <p className="">.</p>
                    <p
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleDeleteDiscuss(data)}
                    >
                      Delete
                    </p>
                  </>
                )}
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
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                        {reply?.name === getMyProfile?.data?.name
                          ? `${reply?.name} (You)`
                          : reply?.name}
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
      <div className="flex w-full mt-10 space-x-2 justify-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          className={`inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "border-gray-500"
          } leading-none`}
          disabled={page === 1}
        >
          <svg
            className="w-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
              page === index + 1
                ? "bg-blue-500 border-blue-600 text-white"
                : "border-gray-500"
            } leading-none`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          className={`inline-flex items-center h-6 w-6 justify-center rounded-md shadow border ${
            page === totalPage
              ? "opacity-50 cursor-not-allowed"
              : "border-gray-500"
          } leading-none`}
          disabled={page === totalPage}
        >
          <svg
            className="w-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Discussion;

Discussion.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
