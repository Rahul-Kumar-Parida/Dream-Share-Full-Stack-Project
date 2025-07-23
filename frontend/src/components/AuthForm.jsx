import React, { useState } from "react";

export default function AuthForm({ onSubmit, type = "login" }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Only for register
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "register") onSubmit({ email, username, password });
    else onSubmit({ email, password });
  };

  return (
    <form className="auth-form fade-in" onSubmit={handleSubmit}>
      <h2>{type === "register" ? "Register" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
      />
      {type === "register" && (
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={e => setUsername(e.target.value)}
        />
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">{type === "register" ? "Register" : "Login"}</button>
    </form>
  );
}