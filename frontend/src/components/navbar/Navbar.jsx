import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { CiMenuFries } from 'react-icons/ci'; 
import { ImCancelCircle } from 'react-icons/im';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user info
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user from localStorage if available
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleNavLinkClick = () => {
    setMenuOpen(false); 
  };

  const handleLogout = () => {
    // Clear user data from localStorage and state
    localStorage.removeItem('user');
    setUser(null);
    navigate('/signin'); // Redirect to sign-in page after logout
  };

  return (
    <nav className="bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo or title */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-gray-800" onClick={handleNavLinkClick}>
              EventFinder
            </NavLink>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            {/* Common Links */}
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
              to="/events"
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-bold" : "text-gray-800 hover:text-gray-600"
              }
              onClick={handleNavLinkClick}
            >
              Events
            </NavLink>

            {/* Conditionally render based on user role */}
            {user && !user.isAdmin && (
              <>
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
                  to="/my-events"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-bold" : "text-gray-800 hover:text-gray-600"
                  }
                  onClick={handleNavLinkClick}
                >
                  My Events
                </NavLink>
              </>
            )}

            {user && user.isAdmin && (
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  isActive ? "text-orange-500 font-bold" : "text-gray-800 hover:text-gray-600"
                }
                onClick={handleNavLinkClick}
              >
                Dashboard
              </NavLink>
            )}

            {/* Show Logout if user is logged in */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:text-gray-600"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-bold" : "text-gray-800 hover:text-gray-600"
                  }
                  onClick={handleNavLinkClick}
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-bold" : "text-gray-800 hover:text-gray-600"
                  }
                  onClick={handleNavLinkClick}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
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

      {/* Mobile menu */}
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
            to="/events"
            className={({ isActive }) =>
              isActive ? "block text-blue-500 px-4 py-2" : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
            }
            onClick={handleNavLinkClick} 
          >
            Events
          </NavLink>

          {/* Conditionally render based on user role */}
          {user && !user.isAdmin && (
            <>
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
                to="/my-events"
                className={({ isActive }) =>
                  isActive ? "block text-blue-500 px-4 py-2" : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
                }
                onClick={handleNavLinkClick} 
              >
                My Events
              </NavLink>
            </>
          )}

          {user && user.isAdmin && (
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive ? "block text-blue-500 px-4 py-2" : "block text-gray-800 px-4 py-2 hover:bg-gray-200"
              }
              onClick={handleNavLinkClick} 
            >
              Dashboard
            </NavLink>
          )}

          {/* Logout option for mobile */}
          {user ? (
            <button
              onClick={handleLogout}
              className="block text-gray-800 px-4 py-2 hover:bg-gray-200"
            >
              Logout
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
