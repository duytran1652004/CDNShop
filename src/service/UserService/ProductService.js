import { pythonApi } from "../../utils/axiosClient";

class ProductService {


    async getProducts(name_category) {
        const response = await pythonApi.get("/product/get_all", {
            params: {
                name_category: name_category,
            }
        });
        return response.data;
    }

    async getProductById(product_id) {
        const response = await pythonApi.get("/product/get_detail_product", {
            params: {
                product_id: product_id,
            }
        });
        return response.data;
    }

    async getLaptopByFilter(params) {
        const response = await pythonApi.get("/product/get_laptop_by_filter", {
            params,
        });
        return response.data;
    }

    async getScreenByFilter(params) {
        const response = await pythonApi.get("/product/get_screen_by_filter", {
            params,
        });
        return response.data;
    }

    async getMouseByFilter(params) {
        const response = await pythonApi.get("/product/get_mice_by_filter", { params });
        return response.data;
    }

    async getMousepadByFilter(params) {
        const response = await pythonApi.get("/product/get_mouse_pab_by_filter", { params });
        return response.data;
    }

    async getHeadphoneByFilter(params) {
        const response = await pythonApi.get("/product/get_headphone_by_filter", { params });
        return response.data;
    }
    async getCpuByFilter(params) {
        const response = await pythonApi.get("/product/get_cpu_by_filter", { params });
        return response.data;
    }
    async getRamByFilter(params) {
        const response = await pythonApi.get("/product/get_ram_by_filter", { params });
        return response.data;
    }
    async getVgaByFilter(params) {
        const response = await pythonApi.get("/product/get_vga_by_filter", { params });
        return response.data;
    }
    async getSsdByFilter(params) {
        const response = await pythonApi.get("/product/get_ssd_by_filter", { params });
        return response.data;
    }
    async getMainByFilter(params) {
        const response = await pythonApi.get("/product/get_main_by_filter", { params });
        return response.data;
    }
}

export default new ProductService();
