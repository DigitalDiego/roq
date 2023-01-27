import React from "react";
import { IPost } from "../types";
import { Link } from "react-router-dom";
import moment from "moment";
import { AiOutlineUser } from "react-icons/ai";

export default function Post(props: IPost) {
  return (
    <Link
      className="flex flex-col gap-4 p-4 border-b-solid border-b-[1px] border-b-[#434242]"
      to={`/posts/${props?._id}`}
    >
      <div className="w-full h-[8vh] flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="p-2 rounded-full bg-gray-200 text-[#222]">
            <AiOutlineUser />
          </div>
          <p className="text-gray-200">{props?.user}</p>
        </div>
        <p className="text-xs text-[#777]">
          {moment(props?._createdAt).fromNow()}
        </p>
      </div>
      {props?.content !== "null" && (
        <p className="text-gray-200">{props?.content}</p>
      )}
      {props?.image !== "null" && (
        <img
          className="w-full object-contain rounded-lg"
          src={props?.image}
          alt="post img"
        />
      )}
    </Link>
  );
}
