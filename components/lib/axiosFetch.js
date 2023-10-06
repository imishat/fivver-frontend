import axios from "axios";


// axios.defaults.withCredentials = true
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: { "X-Custom-Header": "foobar","Access-Control-Allow-Credentials": true,'Access-Control-Allow-Origin':process.env.NEXT_PUBLIC_API },
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
