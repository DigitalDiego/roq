import React, { useState, useEffect } from "react";
import { BsImageFill } from "react-icons/bs";
import { client, fetchPosts } from "../utils";
import {
  AiOutlineUpload,
  AiOutlineLoading,
  AiOutlinePlus,
} from "react-icons/ai";
import { IPost } from "../types";
import { Post } from "./";

export default function Feed() {
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [content, setContent] = useState("");
  const [imageAsset, setImageAsset] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [imgBtn, setImgBtn] = useState(false);
  const user = localStorage.getItem("isAuth");

  const getPosts = async () => {
    await client.fetch(fetchPosts).then((data) => {
      setPosts(data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document: any) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };

  const handleImgBtn = () => {
    if (imgBtn) {
      setImgBtn(false);
      setImageAsset(null);
    } else {
      setImgBtn(true);
    }
  };

  const createPost = async (e: any) => {
    e.preventDefault();

    const doc = {
      _type: "post",
      user,
      content: content.replace(/\s/g, "").length === 0 ? "null" : content,
      image: !imageAsset ? "null" : imageAsset?.url,
    };

    client.create(doc).then(() => {
      setContent("");
      setImageAsset(null);
      setImgBtn(false);
      window.location.reload();
    });
  };
  return (
    <div className="w-3/5 h-screen overflow-y-scroll no-scrollbar">
      <div className="p-4 min-h-[20vh] border-b-solid border-b-[1px] border-b-[#434242] flex flex-col justify-between gap-4">
        <div className="w-full h-[10vh] flex justify-start items-center">
          <input
            className="w-full text-gray-200 placeholder:text-gray-200 bg-transparent border-none outline-none text-base"
            type="text"
            placeholder="What is happening?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        {imgBtn && (
          <div className="w-full h-[50vh]">
            {!imageAsset && !loading ? (
              <label className="relative w-full h-full rounded-lg border-dashed border-2 border-gray-200 flex justify-center items-center flex-col gap-1">
                <AiOutlineUpload className="text-4xl text-gray-200" />
                <input
                  className="absolute w-0 h-0"
                  type="file"
                  onChange={uploadImage}
                />
              </label>
            ) : loading ? (
              <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-lg grid place-items-center">
                <AiOutlineLoading className="text-4xl text-gray-200 animate-spin" />
              </div>
            ) : (
              imageAsset && (
                <div className="relative w-full h-full border-dashed border-2 border-gray-200 rounded-lg p-2">
                  <img
                    className="w-full h-full object-contain rounded-lg"
                    src={imageAsset?.url}
                    alt="uploaded image"
                  />
                  <button className=" rounded-full bg-rose-500 p-2 absolute top-4 right-4">
                    <AiOutlinePlus
                      className="rotate-45 text-gray-200"
                      onClick={() => setImageAsset(null)}
                    />
                  </button>
                </div>
              )
            )}
          </div>
        )}
        <div className="w-full h-[10vh] flex justify-between items-center">
          <button className="text-gray-200" onClick={handleImgBtn}>
            <BsImageFill />
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            disabled={content.replace(/\s/g, "").length === 0 && !imageAsset}
            onClick={createPost}
          >
            Post
          </button>
        </div>
      </div>
      <div className="w-full">
        {posts?.map((post: IPost) => (
          <Post {...post} key={post?._id} />
        ))}
      </div>
    </div>
  );
}
