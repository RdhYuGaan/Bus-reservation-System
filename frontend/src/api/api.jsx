
import axios from "axios";
import { useModal } from "../context/ModalContext"; // Import ModalContext for alerts
import { useAuth } from "../context/AuthContext"; // Import AuthContext for user management

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL from environment variable

});

// Request Interceptor: Attach Token to Requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

    }
    return config;

  },
  (error) => {
    return Promise.reject(error); // Handle errors during request setup
  }
);

// Response Interceptor: Handle Errors and Expired Tokens
api.interceptors.response.use(
  (response) => {
    return response; // Proceed if the response is successful
  },
  async (error) => {
    const { openAlert } = useModal(); // Get modal functions
    const { logout } = useAuth(); // Get logout function from AuthContext

    if (error.response?.status === 401 || error.response?.status === 403) {
      // Handle token expiry or invalid token
      console.error("Token expired or invalid. Logging out...");
      openAlert("Your session has expired. Please log in again.");

      // Logout user
      logout();

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error); // Pass error for further handling
  }
);

export default api;

