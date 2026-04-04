import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import DashboardLayout from "./layout/dashboardLayout/DashboardLayout";
import PublicLayout from "./layout/publicLayout/Outlet";
import AuthLayout from "./layout/publicLayout/AuthLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* DASHBOARD PAGES */

import Dashboard from "./pages/dashboard/Dashboard";
import Doctors from "./pages/dashboard/Doctor";
import Tests from "./pages/dashboard/Test";
import Packages from "./pages/dashboard/Package";
import Reports from "./pages/dashboard/Report";
import AuditLogs from "./pages/dashboard/AuditLogs";
import Users from "./pages/dashboard/Users";
import EmailLogs from "./pages/dashboard/EmailLogs";
import AllAppointments from "./pages/dashboard/AllAppointments";

/* WEBSITE PAGES */

import Home from "./pages/Home";
import Departments from "./pages/Department";
import About from "./pages/About";
import Doctor from "./pages/Doctors"
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
 
/* User Routes */
import MyAppointments from "./pages/users/MyAppointments";
import ChangePassword from "./pages/users/ChangePassword"; 
import MyReports from "./pages/users/MyReports";
import Profile from "./pages/users/Profile";

import api, { refreshToken } from "./services/apiServices";
import { setUser,logoutUserState } from "./redux/authSlice";

import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";


/* ================= PROTECTED ROUTE ================= */

const ProtectedRoute = ({ children }) => {

  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PatientRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // wait for user to load (important)
  if (isAuthenticated && !user) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== "patient") {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* ================= PUBLIC ROUTE ================= */

const PublicRoute = ({ children }) => {

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated) {

    // ✅ Role-based redirect
    if (user?.role === "patient") {
      return <Navigate to="/" replace />;
    }

    if (user?.role === "admin" || user?.role === "technician") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

function App() {

  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const hasCalled = useRef(false);

  useEffect(() => {
  if (hasCalled.current) return;
  hasCalled.current = true;

const bootstrapAuth = async () => {
  try {
    await refreshToken();
  
    //  wait for cookie to be set
    await new Promise(resolve => setTimeout(resolve, 50));

    const res = await api.get("/users/me");
    dispatch(setUser(res.data));

  } catch (err) {
    console.log("ERROR:", err);
    dispatch(logoutUserState());
  } finally {
    setAuthChecked(true);
  }
};

  bootstrapAuth();
}, [dispatch]);


  if (!authChecked) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }


  return (

    <BrowserRouter>

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

        {/* ================= PUBLIC WEBSITE ================= */}
      <Route element={<PublicLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctor" element={<Doctor/>}  />
        <Route path="/department" element={<Departments/>}  />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />

      </Route>
        {/* ================= AUTH ================= */}
  <Route element={<AuthLayout/>}>
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
  </Route>

 

{/* ================= PATIENT ROUTES ================= */}

<Route element={<PublicLayout />}>
  <Route
    path="/profile"
    element={
      <PatientRoute>
        <Profile />
      </PatientRoute>
    }
  />

  <Route
    path="/my-appointments"
    element={
      <PatientRoute>
        <MyAppointments />
      </PatientRoute>
    }
  />

  <Route
    path="/my-reports"
    element={
      <PatientRoute>
        <MyReports />
      </PatientRoute>
    }
  />

  <Route
    path="/change-password"
    element={
      <PatientRoute>
        <ChangePassword />
      </PatientRoute>
    }
  />
</Route>

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
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
          <Route path="auditLogs" element={<AuditLogs />} />
          <Route path="emailLogs" element={<EmailLogs />} />
          <Route path="users" element={<Users />} />
          <Route path="all-appointments" element={<AllAppointments />} />

        </Route>


        {/* ================= FALLBACK ================= */}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;