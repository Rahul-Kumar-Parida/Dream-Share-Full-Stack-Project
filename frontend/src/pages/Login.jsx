import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../api";

export default function Login({ setUser, setToast }) {
    const navigate = useNavigate();

    const handleLogin = ({ email, password }) => {
        api.post("/login", new URLSearchParams({ username: email, password }))
            .then(res => {
                localStorage.setItem("token", res.data.access_token);
                api.get("/me")
                    .then(r => {
                        setUser(r.data);
                        setToast({ message: "Login successful!", type: "success" });
                        navigate("/dashboard"); // <-- Move inside here
                    });
            })
            .catch(() => setToast({ message: "Invalid credentials", type: "error" }));
    };

    return <AuthForm onSubmit={handleLogin} type="login" />;
}