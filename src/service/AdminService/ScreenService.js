import { javaApi } from "../../utils/axiosClient";
import { javaFormApi } from "../../utils/axiosClient";

class ScreenService {
    async createScreen({ data, file }) {
        const formData = new FormData();
        const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
        formData.append("data", jsonBlob);

        if (file) {
            if (Array.isArray(file)) {
                file.forEach((f) => formData.append("file", f));
            } else {
                formData.append("file", file);
            }
        }

        return javaFormApi.post("/screens", formData).then(res => res.data);
    }

    async updateScreen(id, data) {
        try {
            const response = await javaApi.put(`/screens/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating screen:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }
    async deleteScreen(id) {
        return javaApi.delete(`/screens/${id}`).then(res => res.data);
    }

    async getAllScreens() {
        return javaApi.get("/screens").then(res => res.data);
    }

    async getScreenById(id) {
        return javaApi.get(`/screens/${id}`).then(res => res.data);
    }
}

export default new ScreenService();
