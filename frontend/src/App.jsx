import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import api from "./api";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/me")
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  // Auto-hide toast after 2.5 seconds
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "" }), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />
      <Routes>
        <Route path="/" element={<Feed user={user} setToast={setToast} />} />
        <Route path="/login" element={<Login setUser={setUser} setToast={setToast} />} />
        <Route path="/register" element={<Register setToast={setToast} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} setToast={setToast} /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreatePost setToast={setToast} /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={user ? <EditPost setToast={setToast} /> : <Navigate to="/login" />} />
        <Route path="/logout" element={<Logout setUser={setUser} setToast={setToast} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;