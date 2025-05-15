import React, { useState } from "react";
import ErrorPopup from "../ErrorPopup";
import authService from "../../services/auth";

const ForgetPasswordEmailForm = ({isOpen, onClose}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const res = await authService.forgetPassword(email);
        setPopUp(true);
        console.log("res", res);
        if(res?.success){
          onClose();
        }
        console.log(res)
      } catch (error) {
        setError(error.message)
      }finally{
        setLoading(false);
      }
    }
  };

  if (!isOpen) return (
    <>
      {(popUp)?<ErrorPopup type="success" duration={5000} message={"Check you email"}/>:null}
    </>
  );

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
            {(loading) ?
                    <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                  : "Submit"}
          </button>
        </form>
      </div>
    </div>
    </>

  );
};

export default ForgetPasswordEmailForm;
