import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/Signup.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Function from "../components/Function.jsx";
import ForgotPassword from "../components/auth/ForgotPassword.jsx";


const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/function" element={<Function />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
        </>
    );
};

export default Router;
