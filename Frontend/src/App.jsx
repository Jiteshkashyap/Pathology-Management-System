import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState,useRef } from "react";

import DashboardLayout from "./layout/DashboardLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctor";
import Tests from "./pages/Test";
import Packages from "./pages/Package";
import Reports from "./pages/Report";

import { refreshToken } from "./services/apiServices";
import { setUser } from "./redux/authSlice";
import { Toaster } from "react-hot-toast";

/* ================= PROTECTED ROUTE ================= */

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/* ================= PUBLIC ROUTE ================= */

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const hasCalled = useRef(false)

  useEffect(() => {
    if (hasCalled.current) return; // ✅ STOP multiple calls
    hasCalled.current = true;

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if(!isLoggedIn){
      setLoading(false);
      return
    }
    const bootstrapAuth = async () => {
      try {
        const data = await refreshToken();
        dispatch(setUser(data.user));
      } catch (err) {
        localStorage.removeItem('isLoggedIn')
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  return (
    <BrowserRouter>
    {/* Toast Container */}
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#1f2937",
          color: "#fff",
        },
      }}
    />

      <Routes>

        {/* Public Routes */}
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

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="tests" element={<Tests />} />
          <Route path="packages" element={<Packages />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;