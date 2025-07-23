import React from "react";

export default function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`toast ${type} fade-in`} onClick={onClose}>
      {message}
    </div>
  );
}