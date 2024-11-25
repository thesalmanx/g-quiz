import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:6005/users/register",
        formData
      );
      setSuccess(response.data.msg || "🎉 Registration successful!");
      setFormData({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      setTimeout(() => navigate("/login"), 2000); // Redirect after a short delay
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
      } else {
        setError("⚠️ Server error. Please try again later.");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(135deg, #C552BC, #7A3E93, #3F275D)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          ✨ Sign Up
        </h1>
        {error && (
          <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
        )}
        {success && (
          <p className="mb-4 text-green-600 font-semibold text-center">
            {success}
          </p>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="👤 Enter your username"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400 shadow-inner"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstname" className="block mb-2 font-semibold">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            placeholder="📛 Enter your first name"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400 shadow-inner"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block mb-2 font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            placeholder="📛 Enter your last name"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400 shadow-inner"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="📧 Enter your email"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400 shadow-inner"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="🔒 Enter your password"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400 shadow-inner"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-lg bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-200"
        >
          🚀 Register
        </button>
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-500 hover:underline font-semibold"
          >
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
