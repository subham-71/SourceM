import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/Signup.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Exception from "../components/Exception.jsx";
import Function from "../components/Function.jsx";


const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exception" element={<Exception />} />
                <Route path="/function" element={<Function />} />
            </Routes>
        </>
    );
};

export default Router;
