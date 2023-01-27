import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login, Main } from "./containers";

export default function App() {
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/auth/login");
  }, []);
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}
