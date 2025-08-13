import React from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState } from "react";
import { Navigate } from "react-router";


const Signup = () => {

    const [form, FormData] = useState({ email: "", password: "", confirmPassword: "", orgName: "" });

    let Navigate = useNavigate()


    let handlesubmit = async (e) => {
        try {

            e.preventDefault();

            let response = await axios.post("http://localhost:3000/api/admin/signup", {
                orgName: form.orgName,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword
            });


            console.log(response.data)

            toast(response.data.message)

            if (response.data.status) {
                window.setTimeout(() => {    
                Navigate("/login")
                }, 2000)
            }




        } catch (error) {
            console.log(error.message)
        }


    }



    return (
        <>
            <ToastContainer />
            
            {/* Enhanced Background with Gradient and Floating Elements */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 relative overflow-hidden">
                
                {/* Floating Background Elements */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
                
                {/* Main Card with Glass Effect */}
                <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 relative">

                    {/* Header Section with Icon */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">Create Account</h2>
                        <p className="text-gray-500 text-sm">Join us and start your journey today</p>
                    </div>


                    <form onSubmit={handlesubmit} className="space-y-6">

                        {/* Organization Name Field */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                                Organization Name
                            </label>
                            <div className="relative">
                                <input onChange={(e) => {
                                    FormData((prev) => {
                                        return { ...prev, orgName: e.target.value }
                                    })
                                }}
                                    placeholder="Enter Organization Name"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                                Email Address
                            </label>
                            <div className="relative">
                                <input onChange={(e) => {
                                    FormData((prev) => {
                                        return { ...prev, email: e.target.value }
                                    })
                                }}
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                        </div>


                        {/* Password Field */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    onChange={(e) => {
                                        FormData((prev) => {
                                            return { ...prev, password: e.target.value }
                                        })
                                    }}
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>


                        {/* Confirm Password Field */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    onChange={(e) => {
                                        FormData((prev) => {
                                            return { ...prev, confirmPassword: e.target.value }
                                        })
                                    }}
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>


                        {/* Enhanced Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:from-blue-700 hover:to-purple-700"
                        >
                            Create Account
                        </button>
                    </form>



                    {/* Footer with Enhanced Styling */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                                Sign In
                            </Link>
                        </p>
                    </div>

                    {/* Terms and Privacy */}
                    <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
                        By creating an account, you agree to our{" "}
                        <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;