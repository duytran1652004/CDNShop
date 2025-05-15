import { javaApi } from "../../utils/axiosClient";

class CategoryService {
    async getAllCategories() {
        const response = await javaApi.get("/categories");
        return response.data;
    }

    async getCategoryById(id) {
        const response = await javaApi.get(`/categories/${id}`);
        return response.data;
    }

    async createCategory(data) {
        const response = await javaApi.post("/categories", data);
        return response.data;
    }

    async updateCategory(id, data) {
        const response = await javaApi.put(`/categories/${id}`, data);
        return response.data;
    }

    async deleteCategory(id) {
        const response = await javaApi.delete(`/categories/${id}`);
        return response.data;
    }
}

export default new CategoryService();