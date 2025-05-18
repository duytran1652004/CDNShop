import { javaApi } from "../../utils/axiosClient";

class DashBoardService {
    async getDashBoard(dateRange) {
        const response = await javaApi.get("/api/dashboard/stats", {
            params: {
                startDate: dateRange[0].format("YYYY-MM-DD"),
                endDate: dateRange[1].format("YYYY-MM-DD"),
            },
        });
        return response.data;
    }

    async getBestSellers(month, year) {
        const response = await javaApi.get("/api/dashboard/best-seller", {
            params: {
                month: month,
                year: year,
            }
        });
        return response.data;
    }
}

export default new DashBoardService();