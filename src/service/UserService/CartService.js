import { pythonApi } from "../../utils/axiosClient";

class CartService {
    async addToCart(productId, quantity, userId) {
        const res = await pythonApi.post("/cart/add_cart", {
            user_id: String(userId),
            cart: [{ product_id: productId, quantity }]
        });
        return res.data;
    }

    async getCart(userId) {
        const res = await pythonApi.get(`/cart/get_total_cart`, {
            params: {
                user_id: userId
            }
        });
        return res.data;
    }

    async getCartDetail(userId) {
        const res = await pythonApi.get(`/cart/detail_cart`, {
            params: {
                user_id: userId
            }
        });
        return res.data;
    }

    async updateCart(userId, data) {
        const res = await pythonApi.patch(`/cart/update_cart/${userId}`, data);
        return res.data;
    }

    async deleteCart(userId, productId) {
        const res = await pythonApi.delete(`/cart/delete_cart`, {
            params: {
                user_id: userId,
                product_id: productId
            }
        });
        return res.data;
    }

    async createOrder(data) {
        return pythonApi.post("/oder/create", data);
    }
}

export default new CartService();
