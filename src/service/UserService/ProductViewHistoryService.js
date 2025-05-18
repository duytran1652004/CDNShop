import { pythonApi } from "../../utils/axiosClient";

class ProductViewHistoryService {
    async recordView(product_id, user_id) {
        return await pythonApi.post("/view/record", null, {
            params: {
                product_id,
                user_id,
            }
        });
    }

    async getHistoryViews(user_id) {
        const res = await pythonApi.get("/view/history", {
            params: { user_id }
        });
        return res.data;
    }
}

export default new ProductViewHistoryService();
