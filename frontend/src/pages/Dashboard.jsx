import React, { useEffect, useState } from "react";
import api from "../api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Dashboard({ user, setToast }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/posts/me")
      .then(res => setPosts(res.data))
      .catch(() => setToast({ message: "Failed to load your posts", type: "error" }));
  }, [setToast]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    api.post("/posts", { content })
      .then(res => {
        setPosts([res.data, ...posts]);
        setContent("");
        setToast({ message: "Post created!", type: "success" });
      })
      .catch(() => setToast({ message: "Failed to create post", type: "error" }))
      .finally(() => setLoading(false));
  };

  // Now navigates to the edit page
  const handleEdit = (post) => {
    navigate(`/edit/${post.id}`);
  };

  const handleDelete = (id) => {
    api.delete(`/posts/${id}`)
      .then(() => {
        setPosts(posts => posts.filter(p => p.id !== id));
        setToast({ message: "Post deleted", type: "success" });
      })
      .catch(() => setToast({ message: "Delete failed", type: "error" }));
  };

  return (
    <div className="fade-in" style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center", color: "var(--primary)" }}>Your Dashboard</h2>
      <div style={{
        background: "var(--card-bg)",
        borderRadius: 10,
        boxShadow: "var(--shadow)",
        padding: "1.5rem",
        marginBottom: "2rem",
        textAlign: "center"
      }}>
        <div><b>Username:</b> {user.username}</div>
        <div><b>Email:</b> {user.email}</div>
        <div><b>Joined:</b> {new Date(user.created_at).toLocaleDateString()}</div>
      </div>
      {/* Create Post Form */}
      <form className="auth-form fade-in" onSubmit={handleCreate} style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--primary)" }}>Create a Dream Post</h3>
        <textarea
          rows={4}
          placeholder="Share your dream..."
          value={content}
          required
          onChange={e => setContent(e.target.value)}
          style={{ resize: "vertical" }}
        />
        <button type="submit" disabled={loading}>{loading ? "Posting..." : "Post"}</button>
      </form>
      {/* User's Posts */}
      <h3 style={{ color: "var(--primary)", marginTop: "2rem" }}>Your Posts</h3>
      {posts.length === 0 && <p style={{ textAlign: "center" }}>No posts yet.</p>}
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          canEdit={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}