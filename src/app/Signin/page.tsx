"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://trello-style-back.vercel.app/signin",
        {
          email,
          password,
        }
      );

      console.log(response);

      Cookies.set("token", response.data.token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("userId", response.data.user.id, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("userName", response.data.user.name, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      setMessage("Signed in successfully");
      router.push("/");

      console.log("res", response);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Sign in failed");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token"); // Get the token from cookies

    // Example: Check if token exists and is not expired
    if (token) {
      router.push("/"); // Redirect to signin if no token
    }

    // Check token validity here if needed
  }, [router]); // Empty dependency array ensures this effect runs only once on mount

  const handleSignUp = () => {
    router.push("/components/Signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              required
              value={email}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              value={password}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign In
          </button>

          <button
            onClick={handleSignUp}
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
          {message && (
            <p className="mt-2 text-sm text-center text-red-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signin;
