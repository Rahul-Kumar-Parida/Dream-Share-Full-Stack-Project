import React from "react";

export default function PostCard({ post, onEdit, onDelete, onLike, canEdit, canLike }) {
  return (
    <div className="post-card fade-in">
      <div className="post-content">{post.content}</div>
      <div className="post-meta">
        <span>By: {post.username}</span>
        <span>{new Date(post.created_at).toLocaleString()}</span>
      </div>
      <div className="post-actions">
        <span className="like-btn" onClick={canLike ? () => onLike(post.id) : undefined}>
          ❤️ {post.like_count}
        </span>
        {canEdit && (
          <>
            <button onClick={() => onEdit(post)}>Edit</button>
            <button onClick={() => onDelete(post.id)} className="delete-btn">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}