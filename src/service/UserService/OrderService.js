import { pythonApi } from "../../utils/axiosClient";

class OrderService {
    async getOrdersByUserId(user_id) {
        const res = await pythonApi.get("/oder/get_by_id", {
            params: {
                user_id: user_id
            }
        });
        return res.data;
    }
}
export default new OrderService();