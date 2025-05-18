import { javaApi } from "../../utils/axiosClient";
import { javaFormApi } from "../../utils/axiosClient";

class LaptopService {
    async getAllLaptops() {
        const response = await javaApi.get("/laptops");
        return response.data;
    }

    async getLaptopById(id) {
        const response = await javaApi.get(`/laptops/${id}`);
        return response.data;
    }
    async createLaptop({ data, file }) {
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

        console.log("FormData entries for createLaptop:", [...formData.entries()]);

        try {
            const response = await javaFormApi.post("/laptops", formData);
            return response.data;
        } catch (error) {
            console.error("Error creating laptop:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    async updateLaptop(id, data) {
        try {
            const response = await javaApi.put(`/laptops/${id}`, data); // JSON thường
            return response.data;
        } catch (error) {
            console.error("Error updating laptop:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }



    async deleteLaptop(id) {
        const response = await javaApi.delete(`/laptops/${id}`);
        return response.data;
    }
}

export default new LaptopService();