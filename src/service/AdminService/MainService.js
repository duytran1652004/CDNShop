import { javaApi } from "../../utils/axiosClient";
import { javaFormApi } from "../../utils/axiosClient";

class MainService {
    async getAllMains() {
        const response = await javaApi.get("/mains");
        return response.data;
    }

    async getMainById(id) {
        const response = await javaApi.get(`/mains/${id}`);
        return response.data;
    }

    async createMain({ data, file }) {
        const formData = new FormData();
        const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
        formData.append("data", jsonBlob);

        if (file) {
            if (Array.isArray(file)) {
                file.forEach((f, index) => {
                    if (f instanceof File && f.size > 0 && f.type.startsWith("image/")) {
                        formData.append("file", f);
                    } else {
                        console.warn(`Invalid file at index ${index}:`, f);
                    }
                });
            } else if (file instanceof File && file.size > 0 && file.type.startsWith("image/")) {
                formData.append("file", file);
            } else {
                console.warn("Invalid file object:", file);
            }
        }

        try {
            const response = await javaFormApi.post("/mains", formData);
            return response.data;
        } catch (error) {
            console.error("Error creating main:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async updateMain(id, data) {
        try {
            const response = await javaApi.put(`/mains/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating main:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async deleteMain(id) {
        const response = await javaApi.delete(`/mains/${id}`);
        return response.data;
    }
}

export default new MainService();
