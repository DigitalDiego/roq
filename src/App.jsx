import React from "react";
import { Main, Login, Create, Post } from "./containers";
import { Routes, Route } from "react-router-dom";
import { MobileNavbar } from "./components";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
      {location.pathname !== "/auth/login" && <MobileNavbar />}
    </>
  );
}
