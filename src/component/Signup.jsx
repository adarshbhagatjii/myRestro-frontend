import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Signup and OTP Sending
  const handleSignup = async () => {
    try {
      await axios.post(
        BASE_URL+ "/signup",
        { name, emailId: email, password },
        { withCredentials: true }
      );
      alert("OTP sent to your email. Please verify.");
      setShowOtpInput(true);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/verify",
        { emailId: email, otp },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data)); 
      navigate("/"); 
    } catch (err) {
      setError(err?.response?.data || "Invalid OTP");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-18">
      <div className="w-96 p-8 bg-orange-100 rounded-xl shadow-xl">
        <h2 className="text-center text-2xl font-bold text-orange-600">
          {showOtpInput ? "Verify OTP" : "Create an Account"}
        </h2>

        <div className="mt-6">
          {!showOtpInput ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-orange-500">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 rounded-md bg-orange-200 px-3 py-1.5 text-gray-900 focus:outline-orange-600"
                />
              </div>

             

              <div>
                <label className="block text-sm font-medium text-orange-500">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-2 rounded-md bg-orange-200 px-3 py-1.5 text-gray-900 focus:outline-orange-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-orange-500">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-2 rounded-md bg-orange-200 px-3 py-1.5 text-gray-900 focus:outline-orange-600"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={handleSignup}
                className="w-full mt-4 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-500"
              >
                Sign Up
              </button>

              <p className="mt-4 text-center text-sm text-orange-500">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-700 font-bold hover:text-orange-500">
                  Log in
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-orange-500">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full mt-2 rounded-md bg-orange-100 px-3 py-1.5 text-gray-900 focus:outline-indigo-600"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={handleVerifyOtp}
                className="w-full mt-4 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-500"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
