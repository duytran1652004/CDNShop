import { javaApi } from "../../utils/axiosClient";
import { javaFormApi } from "../../utils/axiosClient";

class CPUService {
    async getAllCPUs() {
        const response = await javaApi.get("/cpus");
        return response.data;
    }

    async getCPUById(id) {
        const response = await javaApi.get(`/cpus/${id}`);
        return response.data;
    }

    async createCPU({ data, file }) {
        const formData = new FormData();
        const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
        formData.append("data", jsonBlob);

        if (file) {
            const files = Array.isArray(file) ? file : [file];
            files.forEach((f, index) => {
                if (f instanceof File && f.size > 0 && f.type.startsWith("image/")) {
                    formData.append("file", f);
                } else {
                    console.warn(`Invalid file at index ${index}:`, f);
                }
            });
        }

        try {
            const response = await javaFormApi.post("/cpus", formData);
            return response.data;
        } catch (error) {
            console.error("Error creating CPU:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async updateCPU(id, data) {
        try {
            const response = await javaApi.put(`/cpus/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating CPU:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async deleteCPU(id) {
        const response = await javaApi.delete(`/cpus/${id}`);
        return response.data;
    }
}

export default new CPUService();
