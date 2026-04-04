import axios from "axios";
import store from "../redux/store"
import { setUser, logoutUserState } from "../redux/authSlice";

const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true, // 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    // skip refresh endpoint
    if (originalRequest?.url === "/auth/refresh-token") {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 ||
      error.response.status === 403
    ) {
      originalRequest._retry = true;

      try {
        // 1️ refresh token
        await refreshToken();

        // 2️ fetch user
        const res = await api.get("/users/me");

        // 3️ update redux
        store.dispatch(setUser(res.data));

        // 4️ retry original request
        return api(originalRequest);

      } catch (err) {
        store.dispatch(logoutUserState());
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);





// REGISTER
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// LOGIN
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// REFRESH TOKEN
export const refreshToken = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};

// LOGOUT
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// DOCTOR APIs


export const getDoctors = async ({ page, limit, specialization }) => {
  const response = await api.get("/doctors", {
    params: { page, limit, specialization },
  });
  return response.data;
};

export const createDoctor = async (data) => {
  const response = await api.post("/doctors", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateDoctor = async (id, data) => {
  const response = await api.put(`/doctors/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await api.delete(`/doctors/${id}`);
  return response.data;
};

//  TESTS APIs

export const getTests = async()=>{
    const response = await api.get('/tests')
    return response.data
}

export const createTests =async(data)=>{
    const response = await api.post('/tests',data)
    return response.data
}

export const updateTests = async(id,data)=>{
    const response = await api.put(`/tests/${id}`, data)
    return response.data
}

export const deleteTests =async(id)=>{
 const response = await api.delete(`/tests/${id}`)
 return response.data
}

// PACKAGES APIs

export const getPackages = async()=>{
    const response = await api.get('/packages')
    return response.data
}

export const createPackages =async(data)=>{
    const response = await api.post('/packages',data)
    return response.data
}

export const updatePackages = async(id,data)=>{
    const response = await api.put(`/packages/${id}`, data)
    return response.data
}

export const deletePackages =async(id)=>{
 const response = await api.delete(`/packages/${id}`)
 return response.data
}

// REPORTS APIs

export const getReports = async () => {
  const response = await api.get("/reports");
  return response.data;
};

export const createReport = async (data) => {
  const response = await api.post("/reports", data);
  return response.data;
};

export const updateReportResults = async (id, data) => {
  const response = await api.put(`/reports/${id}/results`, data);
  return response.data;
};

// APPOINTMENT APIs

export const getAvailableSlots = async (date) => {
  const response = await api.get("/appointments/available-slots", {
    params: { date }
  });
  return response.data;
};

export const bookAppointment = async (data) => {
  const response = await api.post("/appointments/book", data);
  return response.data;
};

export const getMyAppointments = async () => {
  const response = await api.get("/appointments/my");
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};

// ADMIN APPOINTMENTS

export const getAllAppointmentsAPI = async (params) => {
  const res = await api.get("/appointments", { params });
  return res.data;
};

export const updateAppointmentStatusAPI = async (id, data) => {
  const res = await api.patch(`/appointments/${id}/status`, data);
  return res.data;
};

//PROFILE

export const updateProfile = async (data) => {
  const response = await api.patch("/users/me", data);
  return response.data;
};


export const changePassword = async (data) => {
  const response = await api.patch("/users/me/password", data);
  return response.data;
};


// ADMIN APIs

export const getAdminAnalytics = async (date) => {
  const res = await api.get("/admin/analytics", {
    params: { date }
  });
  return res.data;
};

export const getEmailLogs = async (params) => {
  const res = await api.get("/admin/email-logs", { params });
  return res.data;
};

export const getAuditLogs = async (params) => {
  const res = await api.get("/admin/audit-logs", { params });
  return res.data;
};

export const getUsers = async (params) => {
  const res = await api.get("/admin/users", { params });
  return res.data;
};

// PATIENT REPORTS

export const getMyReportsAPI = async (params) => {
  const res = await api.get("/reports/my", { params });
  return res.data;
};

export const getReportDownloadUrlAPI = async (id) => {
  const res = await api.get(`/reports/${id}/download`);
  return res.data;
};

export const analyzeHealthReportAPI = async (formData) => {
  const response = await api.post("/health/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const createCheckoutSession = async (data) => {
  const response = await api.post(
    "/payment/create-checkout-session",
    data
  );
  return response.data;
};

export default api;