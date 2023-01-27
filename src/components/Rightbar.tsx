import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client, fetchUsers, fetchImgs } from "../utils";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";

interface IImg {
  _id: string;
  image: string;
}

interface IUser {
  username: string;
  password: string;
}

export default function Rightbar() {
  const [imgs, setImgs] = useState<Array<IImg>>([]);
  const [users, setUsers] = useState<Array<IUser>>([]);

  const getImgs = async () => {
    await client.fetch(fetchImgs).then((data) => {
      setImgs(data);
    });
  };
  const getUsers = async () => {
    await client.fetch(fetchUsers).then((data) => {
      setUsers(data);
    });
  };

  useEffect(() => {
    getImgs();
  }, []);
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="w-[30%] h-screen border-l-solid border-l-[1px] border-l-[#434242] p-4">
      <div className="w-full h-1/2 grid grid-cols-3 gap-2 place-items-start">
        {imgs?.map((item: IImg) => (
          <Link
            className="w-full h-1/2 border-solid border-[#434242] border-[1px] rounded-lg"
            to={`/posts/${item?._id}`}
            key={item?._id}
          >
            <img
              className="w-full h-full object-contain rounded-lg"
              src={item?.image}
              alt="uploaded img"
            />
          </Link>
        ))}
      </div>

      <div className="w-full h-1/2 flex justify-start items-start flex-col pt-4">
        <p className="text-gray-200 font-poppinsBold">People to follow</p>
        {users?.slice(0, 5)?.map((user: IUser) => (
          <Link
            className="w-full py-4 flex justify-between items-center text-gray-200 group"
            to={`/users/${user?.username}`}
            key={user?.username}
          >
            <div className="flex items-center gap-1">
              <AiOutlineUser />
              <span>{user?.username}</span>
            </div>
            <IoIosArrowForward className="mr-[1em] duration-[.8s] group-hover:mr-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
