import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../api";

export default function Register({ setToast }) {
  const navigate = useNavigate();

  const handleRegister = ({ email, username, password }) => {
    api.post("/register", { email, username, password })
      .then(() => {
        setToast({ message: "Registration successful! Please login.", type: "success" });
        navigate("/login");
      })
      .catch(() => setToast({ message: "Registration failed", type: "error" }));
  };

  return <AuthForm onSubmit={handleRegister} type="register" />;
}