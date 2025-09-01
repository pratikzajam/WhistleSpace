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
