import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Middleware/ProtectedRoute";
import DriverDashboard from "./components/driver/driverDashboard";
import AdminDashboard from "./components/admin/adminDashboard";
import ReservationPage from "./components/passenger/ReservationPage";
import BusList from "./components/passenger/BusList";
import PassengerInfoPage from "./components/passenger/ReservationInfoPage";
import QRCodePage from "./components/passenger/QRCodePage";
import Navbar from "./components/NavBar";
import PublicRoute from "./Middleware/PublicRoute";
import VerifyQRCode from "./components/driver/VerifyQRCode";
import { HomePage } from "./pages/homePage";
import { ModalProvider } from "./context/ModalContext";
import Modal from "./components/messages/Modal";
import TopHorizontalLoader from "./components/LoaderComponent/LoaderComponent";
import { useLoader, LoaderProvider } from "./context/LoaderContext";
import Footer from "./components/footer";
import ContactUs from "./components/contact_us/ContactUs.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

const AppContent = () => {
  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const handleBeforeUnload = () => startLoading();
    const handleLoad = () => stopLoading();

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, [startLoading, stopLoading]);

  return (
    <>
      <Navbar />
      <Modal />
      <TopHorizontalLoader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/buses"
          element={
            <ProtectedRoute role="passenger">
              <BusList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservation/:id"
          element={
            <ProtectedRoute role="passenger">
              <ReservationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute role="driver">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger-info"
          element={
            <ProtectedRoute role="passenger">
              <PassengerInfoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact_us"
          element={
            <ProtectedRoute role="passenger">
              <ContactUs />
            </ProtectedRoute>
          }
        />
        <Route path="/qr-code" element={<QRCodePage />} />
        <Route path="/verify-code" element={<VerifyQRCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        /

      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <LoaderProvider>
      <ModalProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </ModalProvider>
    </LoaderProvider>
  );
};

export default App;
