import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log("Login succces:", response.data);

      const { access_token } = response.data;

      if (access_token) {
        localStorage.setItem("token", JSON.stringify({ access_token })); // Store token safely
        console.log("Login Success:", response.data);
        navigate("/jooba"); // Redirect after login
      } else {
        throw new Error("Invalid token received");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

export default Login;
