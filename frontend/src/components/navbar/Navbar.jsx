import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import { CiMenuFries } from 'react-icons/ci'; 
import { ImCancelCircle } from 'react-icons/im';

const Navbar = () => {
 
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavLinkClick = () => {
    setMenuOpen(false); 
  };

  return (
    <nav className="bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-gray-800" onClick={handleNavLinkClick}>
              EventFinder
            </NavLink>
          </div>

          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-bold" : "text-gray-800 hover:text-gray-600"
              }
              onClick={handleNavLinkClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-bold" : "text-gray-800 hover:text-gray-600"
              }
              onClick={handleNavLinkClick}
            >
              About Us
            </NavLink>
            <NavLink
              to="/frequently-asked-questions"
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-bold" : "text-gray-800 hover:text-gray-600"
              }
              onClick={handleNavLinkClick}
            >
              FAQ's
            </NavLink>
          </div>

          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive
                  ? "border border-orange-500 text-orange-500 px-4 py-2 rounded font-bold"
                  : "border border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
              }
              onClick={handleNavLinkClick}
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "border border-orange-500 text-orange-500 px-4 py-2 rounded font-bold"
                  : "border border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
              }
              onClick={handleNavLinkClick}
            >
              Sign Up
            </NavLink>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {menuOpen ? (
                <ImCancelCircle className="h-6 w-6" /> 
              ) : (
                <CiMenuFries className="h-6 w-6" /> 
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "block text-blue-500 px-4 py-2" : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
            }
            onClick={handleNavLinkClick} 
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "block text-blue-500 px-4 py-2" : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
            }
            onClick={handleNavLinkClick} 
          >
            About Us
          </NavLink>
          <NavLink
            to="/contactUs"
            className={({ isActive }) =>
              isActive ? "block text-blue-500 px-4 py-2" : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
            }
            onClick={handleNavLinkClick} 
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "block text-blue-500 px-4 py-2" : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
            }
            onClick={handleNavLinkClick} 
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "block text-blue-500 px-4 py-2" : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
            }
            onClick={handleNavLinkClick} 
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;