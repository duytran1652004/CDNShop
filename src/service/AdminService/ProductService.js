import { javaApi } from "../../utils/axiosClient";

class ProductService {
    async createProduct(data) {
        const response = await javaApi.post("/products", data);
        return response.data;
    }

    async getAllProducts({ page = 0, name = "", brandId = null, categoryId = null } = {}) {
        const queryParts = [];
        queryParts.push(`page=${page}`);

        if (name) queryParts.push(`filter=name ~~ '${name}'`);
        if (brandId !== null) queryParts.push(`filter=brand:${brandId}`);
        if (categoryId !== null) queryParts.push(`filter=category:${categoryId}`);

        const queryString = queryParts.join("&");
        try {
            const response = await javaApi.get(`/products?${queryString}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
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

    // Thêm phương thức mới để lấy chi tiết sản phẩm
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