import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlinePlus, AiOutlineLogout } from "react-icons/ai";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase.config";

export default function MobileNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/auth/login");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="w-full h-[10vh] fixed grid place-items-center bottom-2 md:hidden">
      <div className="w-[95%] h-full rounded-lg bg-black flex">
        <Link
          className="w-1/3 h-full text-white text-lg grid place-items-center"
          to="/"
        >
          <AiOutlineHome />
        </Link>
        <Link
          className="w-1/3 h-full text-white text-lg grid place-items-center"
          to="/create"
        >
          <AiOutlinePlus />
        </Link>
        <button
          className="w-1/3 h-full text-white text-lg grid place-items-center"
          onClick={logout}
        >
          <AiOutlineLogout />
        </button>
      </div>
    </div>
  );
}
