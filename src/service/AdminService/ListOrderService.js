import { javaApi } from "../../utils/axiosClient";

class ListOrderService {
    async getOrders() {
        const response = await javaApi.get("/api/dashboard/order");
        return response.data;
    }

    async updateOrderStatus(orderId, status) {
        const response = await javaApi.patch(
            `/api/dashboard/order/${orderId}`,
            { status },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    }
}

export default new ListOrderService();
