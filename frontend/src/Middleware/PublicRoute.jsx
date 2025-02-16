
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  // If the user is logged in, redirect to their default page
  if (user) {
    if (user.role === "passenger") return <Navigate to="/buses" replace />;
    if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (user.role === "driver") return <Navigate to="/driver-dashboard" replace />;
  }

  return children; // Render the public component if the user is not logged in
};

export default PublicRoute;
