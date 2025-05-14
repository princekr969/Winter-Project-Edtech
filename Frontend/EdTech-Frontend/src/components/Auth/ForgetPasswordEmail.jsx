import React, { useState } from "react";
import ErrorPopup from "../ErrorPopup";
import authService from "../../services/auth";

const ForgetPasswordEmailForm = ({isOpen, onClose}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [popUp, setPopUp] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email is required.");
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
    } else {
      try {
        const res = await authService.forgetPassword(email);
        setPopUp(true);
        console.log("res", res);
        if(res?.success){
          onClose();
        }
        console.log(res)
      } catch (error) {
        setError(error.message)
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Enter Your Email</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    {(popUp)?<ErrorPopup type="success" duration={10000} message={"Check you email"}/>:null}
    </>

  );
};

export default ForgetPasswordEmailForm;
