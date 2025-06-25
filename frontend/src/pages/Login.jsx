import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate();
  const { backendurl, setIsLoggedin, getUserdata } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    // sending data to the backend
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${backendurl}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });

      if (res.status === 200) {
        setIsLoggedin(true);
        await getUserdata();
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }

  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-700/30 to-purple-700/30 backdrop-blur-md">
      <div
        style={{ animation: 'slideInFromLeft 1s ease-out' }}
        className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl p-8 space-y-8"
      >
        <h2
          style={{ animation: 'appear 2s ease-out' }}
          className="text-center text-4xl font-extrabold text-white"
        >
          Welcome
        </h2>
        <p
          style={{ animation: 'appear 3s ease-out' }}
          className="text-center text-gray-200"
        >
          Sign in to your account
        </p>
        <form onSubmit={handleLogin} className="space-y-6" autoComplete='off'>
          <div className="relative">
            <input
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              type="email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-email"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="email"
            >
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='new-password'
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-200">
              <input
                className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
                type="checkbox"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <span
              className="text-sm text-purple-200 hover:underline cursor-pointer"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot your password?
            </span>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <div className="text-center text-gray-300">
          Don't have an account?
          <span
            className="text-purple-300 hover:underline cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
