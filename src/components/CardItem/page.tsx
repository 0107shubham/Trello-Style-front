"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import UpdateCard from "../UpdateCard/page";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDataContext } from "../../context/DataContext";

interface CardItemProps {
  component: {
    id: string;
    categoryId: string;
    title: string;
    deadline: Date | null;
    description: string;
    priority: string;
    status: string;
  };
}

const CardItem: React.FC<CardItemProps> = ({ component }) => {
  const { title, description, priority, deadline, status, id } = component;
  const { setData, setError } = useDataContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const formattedDate = deadline ? format(deadline, "yyyy-MM-dd") : "N/A";
  const formattedTime = deadline ? format(deadline, "HH:mm") : "N/A";
  const handleDelete = async (postId: string) => {
    try {
      const response = await axios.post(
        "https://trello-style-back.vercel.app/deletePost",
        { id: postId }
      );
      console.log("Post deleted successfully:", response.data);
      setData((prevData) =>
        prevData.map((category) =>
          category.id === response.data.data.categoryId
            ? {
                ...category,
                posts: category.posts.filter(
                  (post: any) => post.id !== response.data.data.id
                ),
              }
            : category
        )
      );
      setError(null);
    } catch (error: any) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="box-border z-10 flex flex-col items-start mx-1 px-4 py-3 my-3 h-fit w-[256.75px] bg-[#F9F9F9] border-[1px] border-[#DEDEDE] rounded-lg relative">
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        {/* Title */}
        <div className="flex flex-col items-start gap-4">
          <div className="text-gray-600 text-xl font-medium leading-5">
            {title}
          </div>
          <div className="text-gray-500 text-sm font-normal leading-5">
            {description}
          </div>
        </div>
        {/* Priority Badge */}
        <div
          className={`flex flex-row justify-center items-center p-2 gap-2.5 rounded-lg ${
            priority === "Urgent"
              ? "bg-red-500"
              : priority === "Low"
              ? "bg-green-500"
              : priority === "Medium"
              ? "bg-yellow-500"
              : "bg-gray-500"
          }`}
        >
          <span className="text-white text-xs font-normal leading-4">
            {priority}
          </span>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-row items-center gap-2.5 my-4">
        <div className="w-6 h-6 z-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6V12H18"
              stroke="#606060"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#606060"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-gray-600 text-sm font-semibold leading-5">
          {formattedDate}
        </div>
      </div>
      <div className="text-gray-500 w-full items-center text-sm flex justify-between font-medium leading-5">
        {formattedTime} ago
        <div className="flex items-center gap-3 cursor-pointer">
          <span onClick={toggleDrawer}>
            <MdEdit className="text-gray-500 hover:text-gray-700 text-2xl" />
          </span>
          <span onClick={() => handleDelete(id)}>
            <MdDelete className="text-gray-500 hover:text-gray-800 text-2xl" />
          </span>
        </div>
      </div>

      {isOpen && (
        <div>
          <div
            onClick={toggleDrawer}
            className="absolute inset-0 bg-black z-20 opacity-50"
          ></div>
          <UpdateCard toggleDrawer={toggleDrawer} component={component} />
        </div>
      )}
    </div>
  );
};

export default CardItem;
