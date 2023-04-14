import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/Signup.jsx";


const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </>
    );
};

export default Router;
