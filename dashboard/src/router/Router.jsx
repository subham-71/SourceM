import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/Signup.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Function from "../components/Stats/Function.jsx";
import ForgotPassword from "../components/auth/ForgotPassword.jsx";
import Application from "../components/Application.jsx";
import Landing from "../components/Landing.jsx";


const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/application" element={<Application />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
        </>
    );
};

export default Router;
