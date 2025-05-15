import { pythonApi } from "../utils/axiosClient";

class AuthService {
    async login(data) {
        const response = await pythonApi.post("/auth/login", data);
        return response.data;
    }

    async register(data) {
        const response = await pythonApi.post("/auth/register", data);
        return response.data;
    }
}

export default new AuthService();