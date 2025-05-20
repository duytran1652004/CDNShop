import { javaApi } from "../../utils/axiosClient";

class ListOrderService {
    async getOrders() {
        const response = await javaApi.get("/api/dashboard/order");
        return response.data;
    }
    async updateOrderStatus(orderId, statusString) {
        const response = await javaApi.patch(
            `/api/dashboard/order/${orderId}`,
            `"${statusString}"`, // <-- wrap bằng dấu nháy kép
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
