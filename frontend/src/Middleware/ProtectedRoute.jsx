
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isTokenValid } from "../utils/tokenUtils";
import { useModal } from "../context/ModalContext";


const ProtectedRoute = ({ children, role }) => {
  const { user, loading, logout } = useAuth();
  const { openSuccess, openAlert, openWarning } = useModal();

  console.log("ProtectedRoute user:", user);
  console.log("Required role:", role);

  // Wait until loading completes
  if (loading) {
    return <p>Loading...</p>; // You can customize this loading UI
  }

  // If no user or token is found, redirect to login
  const token = localStorage.getItem("authToken");
  if (!user || !token) {
    console.warn("User not logged in or token missing, redirecting to login.");
    // openAlert("User not logged in or token missing, redirecting to login.");
    logout(); // Clear session
    return <Navigate to="/login" replace />;
  }

  // Validate token expiration
  if (!isTokenValid(token)) {
    console.warn("Token expired, redirecting to login.");
    // openAlert("Your session has expired. Please log in again.");
    logout(); // Clear session
    return <Navigate to="/login" replace />;
  }

  // If user role does not match the required role, redirect to login
  if (role && user.role !== role) {
    console.warn(`User role (${user.role}) does not match required role (${role}), redirecting.`);
    return <Navigate to="/login" replace />;
  }

  // If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute;
