import { javaApi } from "../../utils/axiosClient";


class ProductSearchService {
    async searchProducts(name, size = 5, page = 1) {
        try {
            const quotedName = `'${name}'`;
            const filter = `name ~~ ${quotedName}`;
            const response = await javaApi.get("/products", {
                params: {
                    page,
                    size,
                    filter
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    }
}

export default new ProductSearchService();