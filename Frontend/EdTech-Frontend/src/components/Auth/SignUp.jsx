import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from "../../services/auth.js"
import {login} from "../../store/authSlice.js"
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import { GraduationCap } from 'lucide-react'


function SignUp() {

  const [loading, setLoading] = useState(false)
  
  const {
    register, 
    handleSubmit, 
    watch,
    formState: { errors } } = useForm();

  const password = watch("password")
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();


  const create = async (data) => {

    setError("");
    console.log("signUp data",data);

    try {
      setLoading(true);
      const userData = await authService.createAccount(data);
      console.log("SignUp:", userData)

      if(userData){
        // dispatch(login(userData)); 
        navigate("/auth/signin");
      }
    } catch (error) {
        setError(error) 
        console.log("error:::",error)
    }finally{
      setLoading(false);
    }
  }

  return (
  
      <div className="flex items-center w-full max-w-3xl p-8 mx-auto  lg:px-6 lg:w-1/2 ">
        <div className="w-full max-lg:mt-16 ">

            <div className="flex  mx-auto">
            <GraduationCap className="h-10 w-10 text-indigo-600 mr-3" />
            </div>
            <h1 className=' mt-3 mb-10 text-2xl md:text-4xl text-gray-600 font-bold'>Sign up and start learning</h1>

            {/* Google login */}
            <Link
            to="#"
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
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

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </Link>

          <div className='flex mt-3 gap-6 justify-between'>
          <span className="w-1/5 m-2 border-b dark:border-gray-600 lg:w-1/3"></span>
              <Link
                to="#"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or 
              </Link>
              <span className="w-1/5 m-2 border-b dark:border-gray-600 lg:w-1/3"></span>
            </div>
          
           
            <form
              onSubmit={handleSubmit(create)}
              className="grid grid-cols-1 gap-6 mt-5 md:grid-cols-2">

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  {...register("firstName", {
                      required:true})}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
    
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Snow"
                  {...register("lastName", {
                    required:true})}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
    
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Phone number
                </label>
                <input
                  type="text"
                  placeholder="XXXXX-XXXXX"
                  {...register("phoneNumber", {
                    required: true,
                    validate: {
                      pattern: (value) => /^\d{10}$/
                      .test(value) ||
                      "Phone number must be 10 digit number",
                  },
                    min:10,
                    maxLength: 10,
                    valueAsNumber: true,
                  })}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
    
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="johnsnow@example.com"
                  {...register("email", {
                    required: true,
                    validate: {
                        pattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                  })}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
    
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required:true,
                    maxLength:12
                  })}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
    
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Confirm password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required:true,
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                
              </div>
    
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
                  : "Sign Up"}
                </button>
            </form>
            {errors.confirmPassword && <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword.message}</p>}
            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
            {errors.number && <p className="text-red-500 mt-1 text-sm">{errors.number.message}</p>}
        </div>
      </div>

  )
}

export default SignUp
