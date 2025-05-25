import { javaApi, javaFormApi } from "../../utils/axiosClient";

class SSDService {
    async createSSD({ data, file }) {
        const formData = new FormData();
        formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

        if (file && file.length) {
            file.forEach((f) => {
                if (f instanceof File && f.size > 0 && f.type.startsWith("image/")) {
                    formData.append("file", f);
                }
            });
        }

        const res = await javaFormApi.post("/ssds", formData);
        return res.data;
    }

    async updateSSD(id, data) {
        return await javaApi.put(`/ssds/${id}`, data);
    }

    async deleteSSD(id) {
        return await javaApi.delete(`/ssds/${id}`);
    }

    async getSSDById(id) {
        const res = await javaApi.get(`/ssds/${id}`);
        return res.data;
    }
}

export default new SSDService();
