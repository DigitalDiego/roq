import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiFillBell,
  AiOutlinePlus,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaHashtag, FaEnvelope, FaUserAlt, FaBookmark } from "react-icons/fa";
import {
  HiOutlineDotsCircleHorizontal,
  HiCubeTransparent,
} from "react-icons/hi";

export default function LeftBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div className="w-[10%] h-full border-r-solid border-r-[1px] border-r-[#434242] p-4 flex flex-col justify-start items-center gap-[2em] text-gray-200">
      <Link to="/">
        <HiCubeTransparent className="text-2xl" />
        <span className="hidden">ROQ</span>
      </Link>
      <Link to="/">
        <AiFillHome className="text-2xl" />
        <span className="hidden">Home</span>
      </Link>
      <Link to="/">
        <FaHashtag className="text-2xl" />
        <span className="hidden">Explore</span>
      </Link>
      <Link to="/">
        <AiFillBell className="text-2xl" />
        <span className="hidden">Notifications</span>
      </Link>
      <Link to="/">
        <FaEnvelope className="text-2xl" />
        <span className="hidden">Messages</span>
      </Link>
      <Link to="/">
        <FaBookmark className="text-2xl" />
        <span className="hidden">Bookmarks</span>
      </Link>
      <Link to="/">
        <FaUserAlt className="text-2xl" />
        <span className="hidden">Profile</span>
      </Link>
      <Link to="/">
        <HiOutlineDotsCircleHorizontal className="text-2xl" />
        <span className="hidden">More</span>
      </Link>
      <button onClick={logout}>
        <AiOutlineLogout className="text-2xl" />
        <span className="hidden">Logout</span>
      </button>
      <button className="p-2 bg-gray-200 rounded-full text-[#222]">
        <AiOutlinePlus className="text-2xl" />
      </button>
    </div>
  );
}
