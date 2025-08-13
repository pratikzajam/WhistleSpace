import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { SecretKeyContext } from '../../Context/userContext';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

export default function SecretKeyPage() {
    const [orgCode, setOrgCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { data, userData } = useContext(SecretKeyContext);

    // Clear errors when user starts typing
    const handleInputChange = (e) => {
        const value = e.target.value;
        setOrgCode(value);
        
        if (errors.orgCode && value.trim()) {
            setErrors(prev => ({ ...prev, orgCode: null }));
        }
    };

    // Validate input
    const validateInput = () => {
        const newErrors = {};
        
        if (!orgCode.trim()) {
            newErrors.orgCode = "Secret key is required";
        } else if (orgCode.trim().length < 6) {
            newErrors.orgCode = "Secret key must be at least 6 characters";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateInput()) {
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await axios.post(
                `${ 'https://whistlespace-backend.vercel.app'}/api/user/verifycode`,
                { orgCode: orgCode.trim() },
                {
                    timeout: 10000, // 10 second timeout
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const { data: responseData } = response;
            
            if (responseData.status) {
                toast.success(responseData.messages || "Secret key verified successfully!");
                userData(responseData);
                
                // Navigate after a shorter delay
                setTimeout(() => {
                    navigate("/dashboard", { replace: true });
                }, 2000);
            } else {
                toast.error(responseData.messages || "Invalid secret key. Please try again.");
            }

        } catch (error) {
            console.error("Secret key verification error:", error);
            
            let errorMessage = "An error occurred. Please try again.";
            
            if (error.code === 'ECONNABORTED') {
                errorMessage = "Request timed out. Please check your connection and try again.";
            } else if (error.response) {
                const status = error.response.status;
                const data = error.response.data;
                
                switch (status) {
                    case 400:
                        errorMessage = data.messages || "Invalid secret key format.";
                        break;
                    case 401:
                        errorMessage = "Invalid secret key. Please check and try again.";
                        break;
                    case 404:
                        errorMessage = "Secret key not found.";
                        break;
                    case 500:
                        errorMessage = "Server error. Please try again later.";
                        break;
                    default:
                        errorMessage = data.messages || `Error: ${status}`;
                }
            } else if (error.request) {
                errorMessage = "Unable to connect to server. Please check your internet connection.";
            }
            
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSubmit(e);
        }
    };

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
            />
            
            <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Enter Secret Key</h2>
                        <p className="text-gray-600 mt-2 text-sm">
                            Please enter your organization's secret key to continue
                            dummy 
                        </p>
                        <p>secret key:TPkdZLaf3amFyU5uM6cr</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label htmlFor="orgCode" className="sr-only">
                                Secret Key
                            </label>
                            <input
                                id="orgCode"
                                type="text"
                                value={orgCode}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter your secret key"
                                disabled={isLoading}
                                autoComplete="off"
                                autoFocus
                                className={`w-full p-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${
                                    errors.orgCode 
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                } ${isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                aria-describedby={errors.orgCode ? "orgCode-error" : undefined}
                                aria-invalid={errors.orgCode ? "true" : "false"}
                            />
                            {errors.orgCode && (
                                <p id="orgCode-error" className="mt-1 text-sm text-red-600" role="alert">
                                    {errors.orgCode}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !orgCode.trim()}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                                isLoading || !orgCode.trim()
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-800'
                            }`}
                            aria-label={isLoading ? "Verifying secret key..." : "Submit secret key"}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg 
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle 
                                            className="opacity-25" 
                                            cx="12" 
                                            cy="12" 
                                            r="10" 
                                            stroke="currentColor" 
                                            strokeWidth="4"
                                        />
                                        <path 
                                            className="opacity-75" 
                                            fill="currentColor" 
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Verifying...
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            Need help? Contact your administrator for the secret key.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}