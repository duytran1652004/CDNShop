import { javaApi } from "../../utils/axiosClient";

class BrandService {
    async getAllBrands() {
        const response = await javaApi.get("/brands");
        return response.data;
    }

    async getBrandById(id) {
        const response = await javaApi.get(`/brands/${id}`);
        return response.data;
    }

    async createBrand(data) {
        const response = await javaApi.post("/brands", data);
        return response.data;
    }

    async updateBrand(id, data) {
        const response = await javaApi.put(`/brands/${id}`, data);
        return response.data;
    }

    async deleteBrand(id) {
        await javaApi.delete(`/brands/${id}`);
    }
}

export default new BrandService();