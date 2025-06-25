import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Signup = () => {
  const { backendurl, setIsLoggedin, getUserdata } = useContext(AppContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !fullname || !confirmpassword) {
      setError('Please fill in all fields');
      return;
    }
    setError('');

    if (password !== confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }

    // sending data to the backend
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${backendurl}/api/auth/register`, {
        email,
        password,
        fullname,
      }, { withCredentials: true });

      if (res.status === 200) {
        setIsLoggedin(true);
        await getUserdata();
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (err) {
      console.error("Register error:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Register failed. Please try again.";
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
          Create Account
        </h2>
        <p
          style={{ animation: 'appear 3s ease-out' }}
          className="text-center text-gray-200"
        >
          Sign up for a new account
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-6" autoComplete="off">
          <div className="relative">
            <input
              placeholder="John Doe"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              autoComplete="name"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="fullName"
            >
              Full Name
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              type="email"
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
              autoComplete="new-password"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Confirm Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              type="password"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {/* Alternative Sign-in Methods */}
        <div className="text-center text-gray-300 space-y-4">
          {/* Separator */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="px-4 text-gray-300">or sign up using</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>
          {/* <div className="flex space-x-4 justify-center">
            <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100">
              <FcGoogle className="text-2xl" />
              <span>Google</span>
            </button>
            <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100">
              <FaApple className="text-2xl" />
              <span>Apple</span>
            </button>
          </div> */}
        </div>

        <div className="text-center text-gray-300">
          Already have an account?
          <span
            className="text-purple-300 hover:underline cursor-pointer pl-2"
            onClick={() => navigate('/login')}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
