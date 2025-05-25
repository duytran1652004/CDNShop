import { javaApi } from "../../utils/axiosClient";
import { javaFormApi } from "../../utils/axiosClient";

class VgaService {
    async getAllVGAs() {
        const response = await javaApi.get("/vgas");
        return response.data;
    }

    async getVGAById(id) {
        const response = await javaApi.get(`/vgas/${id}`);
        return response.data;
    }

    async createVGA({ data, file }) {
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
            const response = await javaFormApi.post("/vgas", formData);
            return response.data;
        } catch (error) {
            console.error("Error creating VGA:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async updateVGA(id, data) {
        try {
            const response = await javaApi.put(`/vgas/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating VGA:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async deleteVGA(id) {
        const response = await javaApi.delete(`/vgas/${id}`);
        return response.data;
    }
}

export default new VgaService();
