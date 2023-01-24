import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../components";
import { client, fetchPosts } from "../../utils";

export default function Main() {
  const [posts, setPosts] = useState(null);
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      await client.fetch(fetchPosts).then((data) => {
        setPosts(data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!isAuth) navigate("/auth/login");
  }, []);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="w-[95%] mx-auto py-2 flex flex-col">
      {posts && posts?.map((post) => <Post {...post} key={post?._id} />)}
    </div>
  );
}
