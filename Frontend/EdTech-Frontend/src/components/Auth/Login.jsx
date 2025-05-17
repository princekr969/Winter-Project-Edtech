import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import authService from "../../services/auth.js"
import {login as authLogin} from "../../store/authSlice.js"
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import { GraduationCap, KeySquare } from 'lucide-react'
import ErrorPopup from '../ErrorPopup.jsx'
import ForgetPasswordEmailForm from './ForgetPasswordEmail.jsx'

let email = ""

function OtpModal({ isOpen, onClose }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  
  const inputRefs = Array(4).fill(null).map(() => React.useRef(null));

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    setError("")
    if (otpValue.length === 4) {
      try {
        const userData = await authService.otpVerify({otpValue, email})
        if(userData){
          dispatch(authLogin(userData));
          navigate("/")
        } 

      } catch (error) {
        console.log("error", error)
        setError(error)
      }
      setOtp(['', '', '', '']);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <div className="flex items-center justify-center mb-8">
          <KeySquare className="w-12 h-12 text-indigo-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Enter Verification Code
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please enter the 4-digit code sent to your device
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-4 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-semibold border-2 rounded-lg 
                          focus:border-indigo-500 focus:outline-none transition-colors
                          bg-gray-50 text-gray-800"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otp.some(digit => !digit)}
            className="w-full py-3 px-6 text-white bg-indigo-600 rounded-lg
                     hover:bg-indigo-700 focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:ring-offset-2 transition-colors
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
}


function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const {register, handleSubmit} = useForm();  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const navigate = useNavigate();

  

  const login = async (data) => {
    setError("");
    setLoading(true)
    try {
      const userData = await authService.login(data);
      console.log("userData", userData)
  
      if(userData.success){
        email = data.email;
        setIsModalOpen(true);
      }else{
        setError(userData.message);
      }
    }catch (error) {
        setError(error.message) 
    }finally{
          setLoading(false) 
      }
    }

    const handleForgetPassword = () => {
      setForgetPassword(true);
    }

    const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8012/api/v1/users/google/login"
    console.log("google login",res);
  }

    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("error");
    if(token==="oautha7X9vB2qLmTZ0kPf"){
      setError("Already login with email and password")
      navigate("/auth/signin")
    }
    console.log("error msg", error);
    console.log("Token from query:", token);
  }, [])

    
    return (   <>
      
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-6 lg:w-1/2">
          <div className='w-full'>
          <div className="flex justify-center mx-auto">
          <GraduationCap className="h-10 w-10 text-indigo-600 mr-3" />
          </div>

          <p className="mt-3 mb-10 text-2xl md:text-4xl font-bold text-center text-gray-600 dark:text-gray-200">
            Welcome back
          </p>


          {/* Google Login */}
          <div
            onClick={handleGoogleLogin}
            className="flex items-center cursor-pointer justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold  text-center">
              Sign in with Google
            </span>
          </div>
          
          <div className="grid grid-cols-1 mt-4">
            
            <div className='flex justify-between'>
            <span className="w-1/5 m-2 border-b dark:border-gray-600 lg:w-1/3"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or 
              </a>
              <span className="w-1/5 m-2 border-b dark:border-gray-600 lg:w-1/3"></span>
            </div>
          {/* Email login */}

          {/* Email field */}
          <form onSubmit={handleSubmit(login)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>

              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              
                {...register("email", {
                  required: true,
                  validate: {
                      pattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  }
                })}
              />
            </div>  
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>

                {/* Forget password link */}
                <a
                
                  onClick={handleForgetPassword}
                  className="text-xs cursor-pointer text-blue-500 hover:underline"
                >
                  Forget Password?
                </a>
              </div>

              {/* Password field */}
              <input
                id="loggingPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                {...register("password", {
                  required:true,
                  maxLength:12
                })}
              />
            </div>
            <div className="mt-6">
              
                <button 
                  type='submit'
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
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
                  : "Sign In"}
                </button>
              
            </div>
          </form>

          {/* SignUp link */}
          <div className="flex items-center gap-3 mt-4">
            <p className='text-gray-500'>Don't have an account?</p>
           
            <Link
              to="/auth/signup"
              className="text-md text-blue-500 dark:text-gray-400 hover:underline"
            >
               Sign up
            </Link>
          </div>
        </div>


          </div>

        </div>

        <OtpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}/>

        {(error !== "")?
        <>
        <ErrorPopup
          message={error}
          duration={5000}
        /></>
        :null}

        <ForgetPasswordEmailForm
          onClose={() => {setForgetPassword(false)}}
          isOpen={forgetPassword}
        />
        
        </> 


  )
}

export default Login
