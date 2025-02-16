
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Custom hook for authentication context
import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useLoader } from "../context/LoaderContext";

const Navbar = () => {
  const { user, logout } = useAuth(); // Extract user and logout function from AuthContext
  const navigate = useNavigate(); // Navigation hook for redirection
  const [menuExpanded, setMenuExpanded] = useState(false); // State for mobile menu toggle
  const { openSuccess, openAlert, openWarning, openConfirm } = useModal();
  const { startLoading, stopLoading } = useLoader();
  const handleLogout = () => {
    openConfirm(
      "Are you sure you want to log out?", // Confirmation message
      () => {
        // Callback to perform logout
        startLoading();
        logout(); // Clear user data from context
        stopLoading();
        navigate("/"); // Redirect to home or login page
      },
      "Confirm Logout" // Optional title for the confirmation modal
    );
  };

  return (
    <header className="py-4 md:py-6 shadow-sm bg-gray-50 relative z-50" >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" title="Home" className="flex rounded focus:ring-2 focus:ring-gray-900">
              <img
                className="w-32 -mt-12 md:ml-20 absolute md:-mt-16 md:w-44"
                src="/logo.png "
                alt="Bus Reservation Logo"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-900"
              onClick={() => setMenuExpanded(!menuExpanded)}
              aria-expanded={menuExpanded}
            >
              {!menuExpanded ? (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-600">
              Home
            </Link>
            {/*<Link to="/pricing" className="text-base font-medium text-gray-900 hover:text-gray-600">*/}
            {/*  Pricing*/}
            {/*</Link>*/}
            <Link to="/buses" className="text-base font-medium text-gray-900 hover:text-gray-600">
              Book a Bus
            </Link>
            <Link to="/contact_Us" className="text-base font-medium text-gray-900 hover:text-gray-600">
              Contact Us
            </Link>

            {user ? (
              <>
                <span className="text-gray-700 font-medium">Hello, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className=" inline-flex items-center px-6 py-3 text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700 "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* <Link to="/login" className="text-base font-medium text-gray-900 hover:text-gray-600">
                  Customer Login
                </Link> */}
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuExpanded && (
          <nav className="lg:hidden mt-6">
            <div className="grid gap-y-4">
              <Link to="/" className="block text-base font-medium text-gray-900 hover:bg-gray-100 p-3 rounded">
                Home
              </Link>
              {/*<Link to="/pricing" className="block text-base font-medium text-gray-900 hover:bg-gray-100 p-3 rounded">*/}
              {/*  Pricing*/}
              {/*</Link>*/}
              <Link to="/buses" className="block text-base font-medium text-gray-900 hover:bg-gray-100 p-3 rounded">
                Book a Bus
              </Link>
              <Link to="/contact_Us" className="text-base font-medium text-gray-900 hover:text-gray-600">
                Contact Us
              </Link>

              {user ? (
                <>
                  <span className="block text-base font-medium text-gray-900 p-3">Hello, {user.email}</span>
                  <button
                    onClick={handleLogout}
                    className=" px-4 py-2 rounded text-white bg-gray-900 rounded-xl hover:bg-gray-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block text-base font-medium text-gray-900 hover:bg-gray-100 p-3 rounded">
                    Customer Login
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
