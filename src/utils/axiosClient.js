import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ledger_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("ledger_token");
      localStorage.removeItem("ledger_user");
    }
    return Promise.reject(err);
  },
);

export default apiClient;



//baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",