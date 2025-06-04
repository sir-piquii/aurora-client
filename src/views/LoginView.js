import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authenticateUser } from "../api";
import loginImg from "./../assets/login.jpg";

export default function Login() {
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) ?? null;

  if (user?.user.role === "admin" || user?.user.role === "super") {
    setTimeout(() => navigate("/admin", { replace: true }), 0);
  } else if (user?.user.role === "dealer") {
    setTimeout(() => navigate("/dealer", { replace: true }), 0);
  } else if (user?.user.role === "user") {
    setTimeout(() => navigate("/", { replace: true }), 0);
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (loginData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }
      setLoading(true);
      const user = await authenticateUser(
        loginData.identifier,
        loginData.password
      );
      login(user);
      if (user.user.role === "admin" || user.user.role === "super") {
        setTimeout(() => navigate("/admin", { replace: true }), 0);
      } else if (user.user.role === "dealer") {
        setTimeout(() => navigate("/dealer", { replace: true }), 0);
      } else {
        setTimeout(() => navigate("/", { replace: true }), 0);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Login | Aurora";
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">logging in...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-24 flex items-center justify-center text-navy-900">
        <h1 className="text-5xl font-bold">Login</h1>
      </div>

      {/* Updated container: full width on mobile, 8/12 on medium and larger screens */}
      <div className="w-full md:w-8/12 mx-auto px-4 mt-6">
        <div
          className="p-8 rounded-lg shadow-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${loginImg})` }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
            Welcome Back
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-lg font-medium text-navy-900"
              >
                Email or Username
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={loginData.identifier}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-navy-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="/forgot-password"
                className="text-sm text-orange-600 hover:text-orange-500 font-medium transition-all"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-navy-900 to-orange-500 text-white px-6 py-3 rounded-full hover:text-orange-300 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
