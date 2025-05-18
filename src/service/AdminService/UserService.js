import { javaApi } from "../../utils/axiosClient";


class UserService {
    async getAllUser() {
        const res = await javaApi.get("/users");
        return res.data;
    }

    async getUserById(id) {
        const res = await javaApi.get(`/users/${id}`);
        return res.data;
    }

    async createUser(user) {
        const res = await javaApi.post("/users", user);
        return res.data;
    }

    async updateUser(id, user) {
        const res = await javaApi.put(`/users/${id}`, user);
        return res.data;
    }

    async deleteUser(id) {
        const res = await javaApi.delete(`/users/${id}`);
        return res.data;
    }
}

export default new UserService();
