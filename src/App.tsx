import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Registration from "./pages/RegistrationPage/Registration";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};

export default App;
