import React, { useState } from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { auth } from "../firebase.config";
import { baseUrl, fetchApi } from "../../utils";
import { client } from "../../utils";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const doc = {
        _type: "post",
        user: auth.currentUser.displayName,
        avatar: auth.currentUser.photoURL,
        imageUrl: props.image,
        caption,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen fixed top-0 right-0 bg-black/80 backdrop-blur-md p-2">
      <div className="w-[95%] mx-auto h-[10vh] flex justify-end items-center">
        <button className="bg-white rounded-full p-2" onClick={props.function}>
          <AiOutlinePlus className="rotate-45" />
        </button>
      </div>
      <div className="w-[95%] mx-auto h-[35vh] grid place-items-center">
        <img
          className="w-full h-[34vh] rounded-lg object-contain"
          src={props.image}
          alt="selected img"
        />
      </div>
      <div className="w-[95%] mx-auto h-[35vh] flex flex-col justify-between">
        <textarea
          className="py-1 w-full h-[32vh] bg-transparent border-none outline-none text-white placeholder:text-white resize-none"
          placeholder="Caption"
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        ></textarea>
        <button
          className="w-full py-2 bg-white border-none outline-none rounded-lg"
          onClick={createPost}
          disabled={caption.replace(/\s/g, "").length === 0}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default function Create() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [modal, setModal] = useState(false);

  const getImages = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchApi(`${baseUrl}/images/search?q=${search}`);
      setImages(data?.value);
    } catch (error) {
      console.error(error);
    }
  };

  const setImageUrl = (url) => {
    setSelectedUrl(url);
    setModal(true);
  };

  const handleModal = () => {
    setModal(false);
    setSelectedUrl("");
  };
  return (
    <div className="w-[95%] mx-auto py-2 flex flex-col gap-2 relative">
      <div className="w-full h-[15vh] grid place-items-center">
        <form
          className="w-4/5 px-4 py-2 rounded-full bg-gray-200 flex items-center gap-1"
          onSubmit={getImages}
        >
          <input
            className="w-full bg-transparent border-none outline-none"
            type="text"
            placeholder="Search image"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            className="p-2 bg-gray-400 text-white rounded-full"
            type="submit"
            disabled={search.replace(/\s/g, "").length === 0}
          >
            <AiOutlineSearch />
          </button>
        </form>
      </div>
      <div className="w-full min-h-[85vh] grid place-items-start gap-2">
        {images &&
          images?.map((image) => (
            <img
              onClick={() => setImageUrl(image?.thumbnailUrl)}
              className="w-full rounded-lg object-cover"
              src={image?.thumbnailUrl}
              alt={image?.name}
            />
          ))}
      </div>
      {modal && <Modal image={selectedUrl} function={handleModal} />}
    </div>
  );
}
