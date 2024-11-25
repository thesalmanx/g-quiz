import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Function to handle login with Google OAuth
  const loginwithgoogle = () => {
    window.open("http://localhost:6005/auth/google", "_self");
  };

  // Function to handle manual login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:6005/users/login", {
        username,
        password,
      });

      if (response.data.success) {
        // Store JWT in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expires", response.data.expiresIn);
        setUser(response.data.user);
        // Redirect to the main page after login
        window.location.href = "http://localhost:3000/";
      } else {
        setError(response.data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #C552BC, #7A3E93, #3F275D)",
      }}
    >
      <div className="border border-gray-200 rounded-xl p-10 bg-white shadow-2xl w-full max-w-lg transform transition-all hover:scale-105 hover:shadow-3xl">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
          🎉 Welcome Back!
        </h1>
        <form onSubmit={handleLogin} className="w-full">
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-4 mb-6 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-500 shadow-inner"
            required
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-4 mb-6 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-500 shadow-inner"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-full font-semibold text-lg bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "✨ Logging In..." : "🚀 Login"}
          </button>
          {error && (
            <p className="mt-4 text-center text-red-600 font-semibold">
              {error}
            </p>
          )}
        </form>
        <button
          className="mt-6 w-full px-4 py-3 text-white font-semibold rounded-full bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transition duration-200"
          onClick={loginwithgoogle}
        >
          🌐 Sign In With Google
        </button>

        {/* Display user information if available */}
        {user && (
          <div className="mt-8 p-6 bg-purple-50 rounded-lg shadow-inner text-center">
            <h2 className="text-xl font-semibold text-purple-700">
              🎉 Welcome, {user.firstname}!
            </h2>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">Username: {user.username}</p>
          </div>
        )}

        <p className="mt-8 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-500 hover:underline font-semibold"
          >
            Register here!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
