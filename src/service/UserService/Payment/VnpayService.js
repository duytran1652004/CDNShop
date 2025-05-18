import { pythonApi } from "../../../utils/axiosClient";

function generateOrderId() {
    let id = "";
    for (let i = 0; i < 10; i++) {
        id += Math.floor(Math.random() * 10);
    }
    return id;
}

const VnpayService = {
    payment: async ({ amount, order_desc }) => {
        const payload = {
            order_id: generateOrderId(),
            amount,
            order_desc,
            locale: "vn",
            order_type: "other"
        };
        const res = await pythonApi.post("/vnpay/payment", payload);
        return res.data;
    }
};

export default VnpayService;