import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import ManufacturerDashboard from "./pages/ManufacturerDashboard.jsx";
import ProductRegistrationPage from "./pages/ProductRegistrationPage.jsx";
import ProductVerificationPage from "./pages/ProductVerificationPage.jsx";
import OwnershipTrackingPage from "./pages/OwnershipTrackingPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { AuthProvider } from "./context/AuthContext";

import { WalletProvider } from "./utils/WalletContext.jsx";

function App() {

  return (

    <WalletProvider>
      <AuthProvider>

      <Layout>

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* MANUFACTURER DASHBOARD */}
          <Route
            path="/dashboard"
            element={<ManufacturerDashboard />}
          />

          {/* PRODUCT REGISTRATION */}
          <Route
            path="/register"
            element={<ProductRegistrationPage />}
          />

          {/* PRODUCT VERIFICATION */}
          <Route
            path="/verify"
            element={<ProductVerificationPage />}
          />

          {/* OWNERSHIP TRACKING */}
          <Route
            path="/ownership"
            element={<OwnershipTrackingPage />}
          />

          {/* TRACKING ALIAS */}
          <Route
            path="/tracking"
            element={<OwnershipTrackingPage />}
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

        </Routes>

      </Layout>

      </AuthProvider>
    </WalletProvider>
  );
}

export default App;