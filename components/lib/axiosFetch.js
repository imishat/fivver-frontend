import axios from "axios";



const axiosInstance = axios.create({
  baseURL: "http://103.49.169.89:30912/api/v1.0",
  headers: { "X-Custom-Header": "foobar" },
});

// include bearer token and other req configurations
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosFetch = (method, endpoint, body, headers = {}) => {
  return axiosInstance({
    url: endpoint,
    method,
    data: body,
    params: method === "GET" ? body : null,
    headers,
  });
};

export default axiosFetch;
