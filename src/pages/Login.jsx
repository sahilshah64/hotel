import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // TODO: connect API (login/register)
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-4"
      >
        {/* Title */}
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800">
            {currentState === "Login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-gray-500">
            Hotel Booking Platform
          </p>
        </div>

        {/* Name (only for Sign Up) */}
        {currentState === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        {/* Forgot Password */}
        {currentState === "Login" && (
          <p className="text-sm text-right text-blue-600 cursor-pointer hover:underline">
            Forgot password?
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-600">
          {currentState === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
            }
            className="text-black font-medium cursor-pointer hover:underline"
          >
            {currentState === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;