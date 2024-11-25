import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center text-center text-white px-6">
      {/* Animated Header Section */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 animate-fadeIn tracking-tight leading-tight">
          Dive into the{" "}
          <span className="text-yellow-300">Python Quiz Adventure</span>
        </h1>
        <p className="text-lg sm:text-2xl font-light mb-12 tracking-wide animate-slideIn">
          Master Python, challenge yourself, and see if you can help our monkey
          friend reach the banana at the top!
        </p>

        {/* Play Button with Animation */}
        <a
          href="/login"
          className="inline-block bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-110 hover:bg-yellow-500 transition duration-300 ease-in-out tracking-wide animate-bounce"
        >
          Start the Challenge
        </a>
      </div>

      {/* Floating Image Illustration */}
      <div className="mt-12 animate-float">
        <img
          src="https://files.realpython.com/media/How-to-Make-a-2D-Game-with-the-Python-Arcade-Library_Watermarked.ab79cb95c9fa.jpg"
          alt="Quiz Game Illustration"
          className="w-full max-w-md rounded-lg shadow-xl transition-transform duration-500 ease-in-out transform hover:scale-105 hover:rotate-3"
        />
      </div>
    </div>
  );
};

export default Home;
