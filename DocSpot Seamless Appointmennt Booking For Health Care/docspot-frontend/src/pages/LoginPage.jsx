import React, { useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful ✅");

      if (user.type === "admin") {
        navigate("/admin-dashboard");
      } else if (user.type === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      toast.error("Login Failed ❌");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>🔐 Login</h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
