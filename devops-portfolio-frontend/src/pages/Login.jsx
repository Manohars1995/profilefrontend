import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaTerminal, FaUserSecret, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(credentials);
    setLoading(false);
    if (success) {
      navigate('/admin');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-devops-darker via-devops-dark to-devops-darker">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <FaTerminal className="text-5xl text-devops-accent mx-auto mb-4" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-devops-accent to-devops-secondary bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-gray-400 mt-2">Secure access only</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center space-x-2">
                <FaUserSecret className="text-devops-accent" />
                <span>Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-devops-darker border border-white/10 rounded-lg focus:border-devops-accent focus:outline-none transition-colors"
                placeholder="Enter admin username"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center space-x-2">
                <FaLock className="text-devops-accent" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-devops-darker border border-white/10 rounded-lg focus:border-devops-accent focus:outline-none transition-colors pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-devops-accent"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-devops-accent to-devops-secondary rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <FaLock />
                  <span>Login to Dashboard</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-xs text-yellow-400 text-center">
              🔒 This is a secure area. Unauthorized access is prohibited and will be logged.
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Demo: admin / admin123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;