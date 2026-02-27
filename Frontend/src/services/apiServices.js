import axios from "axios";

const api = axios.create({
  baseURL: "https://pathology-backend-mqzq.onrender.com/api", 
  withCredentials: true, // 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    //  No response (network error)
    if (!error.response) {
      return Promise.reject(error);
    }

    //  Skip refresh API (SAFE CHECK)
    if (originalRequest?.url === "/auth/refresh-token") {
      return Promise.reject(error);
    }

    //  Prevent multiple retries
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    //  ONLY handle 401
    if (error.response.status === 401) {
      originalRequest._retry = true;

      try {
        console.log("Calling refresh token...");

        const res = await refreshToken(); 
        console.log("Refresh success:", res);

        return api(originalRequest);
      } catch (err) {
        console.log("Refresh failed:", err?.response?.data);

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



export const getDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

export const createDoctor = async (data) => {
  const response = await api.post("/doctors", data);
  return response.data;
};

export const updateDoctor = async (id, data) => {
  const response = await api.put(`/doctors/${id}`, data);
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