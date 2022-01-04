import React, { useState } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const { logIn } = useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await logIn(form);
      console.log(response);
      setForm({ username: "", password: "" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="ui fluid button blue">Login</button>
      </form>
    </div>
  );
}
