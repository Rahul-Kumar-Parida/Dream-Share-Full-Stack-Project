import React, { useEffect, useState } from "react";
import api from "../api";
import PostCard from "../components/PostCard";

export default function Feed({ user, setToast }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts")
      .then(res => setPosts(res.data))
      .catch(() => setToast({ message: "Failed to load feed", type: "error" }));
  }, [setToast]);

  const handleLike = (id) => {
    api.post(`/posts/${id}/like`)
      .then(() => {
        setPosts(posts =>
          posts.map(p => p.id === id ? { ...p, like_count: p.like_count + 1 } : p)
        );
      })
      .catch(() => setToast({ message: "You can only like once!", type: "error" }));
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center", color: "var(--primary)" }}>🌙 Dream Feed</h2>
      {posts.length === 0 && <p style={{ textAlign: "center" }}>No dreams yet.</p>}
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          canLike={!!user}
          onLike={handleLike}
        />
      ))}
    </div>
  );
}