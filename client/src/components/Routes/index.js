import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import UserProfile from "../UserProfile";
import { useSelector } from "react-redux";

const Index = () => {
  const { username } = useSelector((state) => state.userReducer);

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar username={username} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Profil />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/:username" element={<UserProfile />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
