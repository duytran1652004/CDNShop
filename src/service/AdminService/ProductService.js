// service/AdminService/ProductService.js
import { javaApi } from "../../utils/axiosClient";

class ProductService {
    async createProduct(data) {
        const response = await javaApi.post("/products", data);
        return response.data;
    }

    async getAllProducts({ page = 0, name = "", brandId = null, categoryId = null } = {}) {
        // Tạo query string với format page=0&filter=key:value
        const queryParts = [];
        queryParts.push(`page=${page}`); // page sử dụng dấu =

        // Tạo các filter với định dạng filter=key:value
        if (name) queryParts.push(`filter=name:${name}`);
        if (brandId !== null) queryParts.push(`filter=brand:${brandId}`);
        if (categoryId !== null) queryParts.push(`filter=category:${categoryId}`);

        const queryString = queryParts.join("&");
        const response = await javaApi.get(`/products?${queryString}`);
        return response.data;
    }

    async getAllBrands() {
        const response = await javaApi.get("/brands");
        return response.data;
    }

    async getAllCategories() {
        const response = await javaApi.get("/categories");
        return response.data;
    }

    async updateProduct(id, data) {
        const response = await javaApi.put(`/products/${id}`, data);
        return response.data;
    }

    async deleteProduct(id) {
        const response = await javaApi.delete(`/products/${id}`);
        return response.data;
    }
}

export default new ProductService();