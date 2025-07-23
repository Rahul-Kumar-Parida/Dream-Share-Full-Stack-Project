import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setUser, setToast }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setUser(null);
    setToast({ message: "Logged out!", type: "success" });
    navigate("/"); // Redirect to feed
  }, [navigate, setUser, setToast]);

  return null; // No UI needed
}