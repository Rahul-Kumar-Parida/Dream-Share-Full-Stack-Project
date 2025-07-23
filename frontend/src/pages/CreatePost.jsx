import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ setToast }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api.post("/posts", { content })
      .then(() => {
        setToast({ message: "Post created!", type: "success" });
        navigate("/dashboard");
      })
      .catch(() => setToast({ message: "Failed to create post", type: "error" }))
      .finally(() => setLoading(false));
  };

  return (
    <form className="auth-form fade-in" onSubmit={handleSubmit}>
      <h2>Create Dream Post</h2>
      <textarea
        rows={5}
        placeholder="Share your dream..."
        value={content}
        required
        onChange={e => setContent(e.target.value)}
        style={{ resize: "vertical" }}
      />
      <button type="submit" disabled={loading}>{loading ? "Posting..." : "Post"}</button>
    </form>
  );
}