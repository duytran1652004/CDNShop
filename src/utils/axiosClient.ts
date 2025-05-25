import axios, { AxiosInstance } from "axios";

const BASE_URLS = {
  python: import.meta.env.VITE_BASE_URL_API_DEV_PY,
  java: import.meta.env.VITE_BASE_URL_API_DEV_JAVA,
};

type ApiType = "python" | "java";

const createAxiosClient = (
  apiType: ApiType,
  isFormData = false
): AxiosInstance => {
  const client = axios.create({
    baseURL: BASE_URLS[apiType],
    headers: isFormData
      ? {} // Để axios tự động set multipart/form-data khi có FormData
      : { "Content-Type": "application/json" },
  });

  // Gắn interceptor để tự động thêm Authorization nếu có token
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
};

export const pythonApi = createAxiosClient("python");
export const javaApi = createAxiosClient("java");
export const javaFormApi = createAxiosClient("java", true);
