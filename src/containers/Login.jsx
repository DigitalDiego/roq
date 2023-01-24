import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { AiFillGoogleCircle } from "react-icons/ai";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.config";

export default function Login() {
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (isAuth) navigate("/");
  }, []);
  return (
    <div className="w-full h-screen relative">
      <img
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
        alt="digital art"
      />
      <div className="w-full h-full absolute top-0 right-0 bg-black/80 flex justify-center items-center flex-col gap-[.5em]">
        <p className="text-center text-4xl font-display text-white">Ambient</p>
        <button
          className="px-4 h-[35px] flex items-center gap-2 rounded-lg bg-white"
          onClick={login}
        >
          <span>Login</span>
          <AiFillGoogleCircle className="text-base" />
        </button>
      </div>
    </div>
  );
}
