import { javaApi, javaFormApi } from "../../utils/axiosClient";

class HeadphoneService {
    async getAllHeadphones() {
        const response = await javaApi.get("/headphones");
        return response.data;
    }

    async getHeadphoneById(id) {
        const response = await javaApi.get(`/headphones/${id}`);
        return response.data;
    }

    async createHeadphone({ data, file }) {
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

        console.log("FormData entries for createHeadphone:", [...formData.entries()]);
        try {
            const response = await javaFormApi.post("/headphones", formData);
            return response.data;

        } catch (error) {
            console.error("Error creating headphone:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }
    async updateHeadphone(id, data) {
        try {
            const response = await javaApi.put(`/headphones/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating headphone:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async deleteHeadphone(id) {
        const response = await javaApi.delete(`/headphones/${id}`);
        return response.data;
    }
}

export default new HeadphoneService();