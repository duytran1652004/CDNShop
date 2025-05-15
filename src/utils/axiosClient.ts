import axios, { AxiosInstance } from "axios";

const BASE_URLS = {
  python: import.meta.env.VITE_BASE_URL_API_DEV_PY,
  java: import.meta.env.VITE_BASE_URL_API_DEV_JAVA,
};

type ApiType = "python" | "java";

const createAxiosClient = (apiType: ApiType): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URLS[apiType],
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const pythonApi = createAxiosClient("python");
export const javaApi = createAxiosClient("java");
