import React from "react";
import { Leftbar, Feed, Rightbar } from "../components";

export default function Main() {
  return (
    <div className="w-full h-screen bg-[#222]">
      <div className="w-4/5 h-full mx-auto flex">
        <Leftbar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
}
