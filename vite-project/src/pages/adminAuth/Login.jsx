import axios from 'axios'
import { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from '../../Context/adminContext.jsx'
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {

    const { admin, setadmin } = useContext(AdminContext)

    let navigate = useNavigate();

    const [form, setFormData] = useState({ email: "", password: "" });


    let handleSubmit = async (e) => {
        try {

            e.preventDefault()

            let response = await axios.post('https://whistlespace-backend.vercel.app/api/admin/login', {
                email: form.email,
                password: form.password
            })

            toast(response.data.message);



            console.log(response.data)

            if (response.data.status) {
                setadmin(response.data)
                navigate("/adminDashboard")
            }


            toast(response.data.messages);
        } catch (error) {
            toast(error.message);
        }
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* Background with gradient */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-8">

                {/* Login Card */}
                <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 backdrop-blur-sm">

                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-600 text-sm">Sign in to your admin account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Dummy Credentials Note */}
                        <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
                            <p><strong>Use these to login:</strong></p>
                            <p>Email: <code>zajampratik@gmail.com</code></p>
                            <p>Password: <code>PratikZajam@99</code></p>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-200"
                        >
                            Login
                        </button>
                    </form>


                    {/* Divider */}
                    <div className="mt-8 mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">Need Help?</span>
                            </div>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-all duration-200">
                                Contact Administrator
                            </a>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-xs text-center text-gray-500">
                            Protected by enterprise-grade security
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-200 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute top-1/2 -left-6 w-16 h-16 bg-purple-200 rounded-full opacity-15 blur-lg"></div>
                </div>
            </div>
        </>
    );
}