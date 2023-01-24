import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Post(props) {
  return (
    <Link
      className="w-full border-b-solid border-b-gray-400 border-b-[1px] pb-4"
      to={`/posts/${props?._id}`}
    >
      <div className="w-full h-[10vh] flex justify-between items-center">
        <div className="flex items-center gap-1">
          <img
            className="w-[30px] h-[30px] rounded-full"
            src={props?.avatar}
            alt={props?.user}
          />
          <p>{props?.user}</p>
        </div>
        <p className="text-gray-400 text-xs">
          {moment(props?._createdAt).fromNow()}
        </p>
      </div>
      <div className="w-full flex justify-start items-start gap-2 flex-col">
        <p>{props?.caption}</p>
        <img className="w-full rounded-lg" src={props?.imageUrl} alt="post" />
      </div>
    </Link>
  );
}
