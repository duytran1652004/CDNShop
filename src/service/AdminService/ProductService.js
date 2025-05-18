import { javaApi } from "../../utils/axiosClient";

class ProductService {
    async createProduct(data) {
        const response = await javaApi.post("/products", data);
        return response.data;
    }

    async getAllProducts({ page = 0, name = "", brandId = null, categoryId = null } = {}) {
        const filters = [];

        if (name) filters.push(`name ~~ '${name}'`);
        if (brandId !== null) filters.push(`brand : ${brandId}`);
        if (categoryId !== null) filters.push(`category : ${categoryId}`);

        const queryString = [`page=${page}`];
        if (filters.length > 0) {
            filters.forEach((f) => queryString.push(`filter=${encodeURIComponent(f)}`));
        }

        const finalQuery = queryString.join("&");
        const response = await javaApi.get(`/products?${finalQuery}`);
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

    async getProductDetail(id) {
        try {
            const response = await javaApi.get(`/products/${id}/detail`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product detail for ID ${id}:`, error);
            throw error;
        }
    }
}

export default new ProductService();