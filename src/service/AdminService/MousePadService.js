import { javaApi, javaFormApi } from "../../utils/axiosClient";

class MousepadService {
    async createMousepad({ data, file }) {
        const formData = new FormData();
        const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
        formData.append("data", jsonBlob);

        if (file) {
            if (Array.isArray(file)) {
                file.forEach((f, index) => {
                    if (f instanceof File && f.size > 0 && f.type.startsWith("image/")) {
                        formData.append("file", f);  // <-- phải là 'file' chứ không phải 'files'
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

        console.log("FormData entries for createMousepad:", [...formData.entries()]);

        try {
            const response = await javaFormApi.post("/mousepads", formData);
            return response.data;
        } catch (error) {
            console.error("Error creating mousepad:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }


    async updateMousepad(id, data) {
        const res = await javaApi.put(`/mousepads/${id}`, data);
        return res.data;
    }
}

export default new MousepadService();
