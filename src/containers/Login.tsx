import React, { useState, useEffect } from "react";
import { client, fetchUsers } from "../utils";
import { useNavigate } from "react-router-dom";
import { HiCubeTransparent } from "react-icons/hi";

interface IUser {
  username: string;
  password: string;
}

export default function Login() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(true);
  const [userOne, setUserOne] = useState("");
  const [userTwo, setUserTwo] = useState("");
  const [passOne, setPassOne] = useState("");
  const [passTwo, setPassTwo] = useState("");
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      await client.fetch(fetchUsers).then((data) => {
        setUsers(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const login = async (e: any) => {
    e.preventDefault();

    if (
      userOne.replace(/\s/g, "").length === 0 ||
      passOne.replace(/\s/g, "").length === 0
    ) {
      alert("Input value is invalid");
      return null;
    }

    const userExists = !!(users?.filter(
      (user: IUser) => user?.username === userOne && user?.password === passOne
    )).length;

    if (userExists) {
      localStorage.setItem("isAuth", userOne);
      navigate("/");
    } else {
      alert("User profile was not found");
      return null;
    }
  };
  const createAccount = async (e: any) => {
    e.preventDefault();

    if (
      userTwo.replace(/\s/g, "").length === 0 ||
      passTwo.replace(/\s/g, "").length === 0
    ) {
      alert("Input value is invalid");
      return null;
    }

    const usernameExists = !!(users?.filter(
      (user: IUser) => user?.username === userOne
    )).length;

    if (usernameExists) {
      alert("Username is already in use");
      return null;
    } else {
      const doc = {
        _type: "user",
        username: userTwo,
        password: passTwo,
      };
      client.create(doc).then(() => {
        localStorage.setItem("isAuth", userTwo);
        navigate("/");
      });
    }
  };
  return (
    <section className="w-full h-screen flex">
      <div className="w-1/2 h-full relative">
        <img
          className="w-full h-full object-cover"
          src="/images/login-image.jpg"
          alt="login image"
        />
        <div className="absolute top-0 right-0 bg-[#111]/50 w-full h-full"></div>
      </div>
      <div className="w-1/2 h-full grid place-items-center bg-[#111]">
        {form ? (
          <form
            className="w-1/2 flex justify-center items-center gap-[1em] flex-col"
            onSubmit={login}
          >
            <div className="flex justify-center items-center gap-2">
              <HiCubeTransparent className="text-gray-200 text-4xl" />
              <p className="text-gray-200 font-poppinsBold text-4xl">ROQ</p>
            </div>
            <input
              className="text-gray-200 px-4 py-2 rounded-lg borer-solid border-[1px] border-gray-200 bg-transparent w-full outline-none"
              type="text"
              placeholder="Username"
              onChange={(e) => setUserOne(e.target.value)}
              value={userOne}
            />
            <input
              className="text-gray-200 px-4 py-2 rounded-lg borer-solid border-[1px] border-gray-200 bg-transparent w-full outline-none"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassOne(e.target.value)}
              value={passOne}
            />
            <button
              className="text-gray-[#222] px-4 py-2 rounded-lg borer-solid border-[1px] border-gray-200 bg-gray-200 w-full outline-none"
              type="submit"
            >
              Login
            </button>
            <p
              className="text-gray-200 underline cursor-pointer"
              onClick={() => setForm(!form)}
            >
              Dont have an account?
            </p>
          </form>
        ) : (
          <form
            className="w-1/2 flex justify-center items-center gap-[1em] flex-col"
            onSubmit={createAccount}
          >
            <div className="flex justify-center items-center gap-2">
              <HiCubeTransparent className="text-gray-200 text-4xl" />
              <p className="text-gray-200 font-poppinsBold text-4xl">ROQ</p>
            </div>
            <input
              className="text-gray-200 px-4 py-2 rounded-lg borer-solid border-[1px] border-gray-200 bg-transparent w-full outline-none"
              type="text"
              placeholder="Create Username"
              onChange={(e) => setUserTwo(e.target.value)}
              value={userTwo}
            />
            <input
              className="text-gray-200 px-4 py-2 rounded-lg borer-solid border-[1px] border-gray-200 bg-transparent w-full outline-none"
              type="password"
              placeholder="Create Password"
              onChange={(e) => setPassTwo(e.target.value)}
              value={passTwo}
            />
            <button
              className="text-gray-[#222] px-4 py-2 rounded-lg borer-solid border-[1px] border-gray-200 bg-gray-200 w-full outline-none"
              type="submit"
            >
              Create Account
            </button>
            <p
              className="text-gray-200 underline cursor-pointer"
              onClick={() => setForm(!form)}
            >
              Already have an account?
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
