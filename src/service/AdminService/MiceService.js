import { javaApi } from "../../utils/axiosClient";
import { javaFormApi } from "../../utils/axiosClient";

class MiceService {
    async getAllMice() {
        const response = await javaApi.get("/mice");
        return response.data;
    }

    async getMiceById(id) {
        const response = await javaApi.get(`/mice/${id}`);
        return response.data;
    }

    async createMice({ data, file }) {
        const formData = new FormData();
        formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

        if (file) {
            (Array.isArray(file) ? file : [file]).forEach((f) => {
                if (f instanceof File && f.size > 0 && f.type.startsWith("image/")) {
                    formData.append("file", f);
                }
            });
        }

        const response = await javaFormApi.post("/mice", formData);
        return response.data;
    }

    async updateMice(id, data) {
        try {
            const response = await javaApi.put(`/mice/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating mice:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }
    async deleteMice(id) {
        const response = await javaApi.delete(`/mice/${id}`);
        return response.data;
    }
}

export default new MiceService();
