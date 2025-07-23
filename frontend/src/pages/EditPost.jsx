import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost({ setToast }) {
    const { id } = useParams();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/posts/${id}`)
            .then(res => setContent(res.data.content))
            .catch(() => setToast({ message: "Failed to load post", type: "error" }));
    }, [id, setToast]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        api.put(`/posts/${id}`, { content })
            .then(() => {
                setToast({ message: "Post updated!", type: "success" });
                navigate("/dashboard");
            })
            .catch(() => setToast({ message: "Update failed", type: "error" }))
            .finally(() => setLoading(false));
    };

    return (
        <form className="auth-form fade-in" onSubmit={handleSubmit}>
            <h2>Edit Dream Post</h2>
            <textarea
                rows={5}
                placeholder="Edit your dream..."
                value={content}
                required
                onChange={e => setContent(e.target.value)}
                style={{ resize: "vertical" }}
            />
            <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
        </form>
    );
}