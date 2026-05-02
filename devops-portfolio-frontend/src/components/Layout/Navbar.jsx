import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTerminal, FaUserSecret, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/skills', label: 'Skills', icon: '⚡' },
    { path: '/projects', label: 'Projects', icon: '🚀' },
    { path: '/experience', label: 'Experience', icon: '💼' },
    { path: '/certifications', label: 'Certifications', icon: '🏆' },
    { path: '/resume', label: 'Resume', icon: '📄' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <nav className="glass-card fixed top-4 left-4 right-4 z-50 px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <FaTerminal className="text-devops-accent text-2xl group-hover:animate-pulse" />
          <span className="text-xl font-bold bg-gradient-to-r from-devops-accent to-devops-secondary bg-clip-text text-transparent">
            DevOpsPortfolio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-300 hover:text-devops-accent transition-colors duration-300 flex items-center space-x-1"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
          
          {isAuthenticated && (
            <>
              <Link
                to="/admin"
                className="text-devops-accent hover:text-devops-secondary transition-colors flex items-center space-x-1"
              >
                <FaUserSecret />
                <span>Admin</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition-colors flex items-center space-x-1"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block py-2 text-gray-300 hover:text-devops-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.icon} {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className="block py-2 text-devops-accent hover:text-devops-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🔒 Admin Panel
              </Link>
              <button
                onClick={handleLogout}
                className="block py-2 text-red-400 hover:text-red-300 w-full text-left"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block py-2 text-devops-accent hover:text-devops-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🔑 Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;