import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/Signup.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Function from "../components/Stats/Function.jsx";
import ForgotPassword from "../components/auth/ForgotPassword.jsx";
import Application from "../components/Application.jsx";
import Landing from "../components/Landing.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";


const Router = () => {
    const { currentUser } = useAuth();

    const PrivateRoute = ({children} ) => {
        return currentUser ? children : <Navigate to="/login" />;
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
                <Route path="/application" element={<PrivateRoute><Application/></PrivateRoute>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
        </>
    );
};

export default Router;
