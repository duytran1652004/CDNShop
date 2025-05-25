import { javaApi } from "../../utils/axiosClient";
import { javaFormApi } from "../../utils/axiosClient";

class RamService {
    async getAllRAMs() {
        const response = await javaApi.get("/rams");
        return response.data;
    }

    async getRAMById(id) {
        const response = await javaApi.get(`/rams/${id}`);
        return response.data;
    }

    async createRAM({ data, file }) {
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
            const response = await javaFormApi.post("/rams", formData);
            return response.data;
        } catch (error) {
            console.error("Error creating RAM:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async updateRAM(id, data) {
        try {
            const response = await javaApi.put(`/rams/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating RAM:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async deleteRAM(id) {
        const response = await javaApi.delete(`/rams/${id}`);
        return response.data;
    }
}

export default new RamService();
