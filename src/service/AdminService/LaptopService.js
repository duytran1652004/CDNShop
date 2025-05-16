// import { javaApi } from "../../utils/axiosClient";
// import { javaFormApi } from "../../utils/axiosClient";

// class LaptopService {

//     // Lấy danh sách tất cả laptops
//     async getAllLaptops() {
//         const response = await javaApi.get("/laptops");
//         return response.data;
//     }

//     // Lấy thông tin laptop theo ID
//     async getLaptopById(id) {
//         const response = await javaApi.get(`/laptops/${id}`);
//         return response.data;
//     }

//     async createLaptop({ data, file }) {
//         const formData = new FormData();
//         formData.append("data", JSON.stringify(data));
//         if (file) {
//             if (Array.isArray(file)) {
//                 file.forEach(f => formData.append("file", f));
//             } else {
//                 formData.append("file", file);
//             }
//         }
//         const response = await javaFormApi.post("/laptops", formData);
//         return response.data;
//     }

//     async updateLaptop(id, { data, file }) {
//         const formData = new FormData();
//         formData.append("data", JSON.stringify(data));
//         if (file) {
//             if (Array.isArray(file)) {
//                 file.forEach(f => formData.append("file", f));
//             } else {
//                 formData.append("file", file);
//             }
//         }
//         const response = await javaFormApi.put(`/laptops/${id}`, formData);
//         return response.data;
//     }


//     // Xóa laptop
//     async deleteLaptop(id) {
//         const response = await javaApi.delete(`/laptops/${id}`);
//         return response.data;
//     }
// }

// export default new LaptopService();

import { javaApi } from "../../utils/axiosClient";
import { javaFormApi } from "../../utils/axiosClient";

class LaptopService {
    // Lấy danh sách tất cả laptops
    async getAllLaptops() {
        const response = await javaApi.get("/laptops");
        return response.data;
    }

    // Lấy thông tin laptop theo ID
    async getLaptopById(id) {
        const response = await javaApi.get(`/laptops/${id}`);
        return response.data;
    }
    async createLaptop({ data, file }) {
        const formData = new FormData();
        // Convert data to a Blob with Content-Type application/json
        const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
        formData.append("data", jsonBlob);

        // Handle file(s)
        if (file) {
            if (Array.isArray(file)) {
                file.forEach((f, index) => {
                    if (f instanceof File && f.size > 0 && f.type.startsWith("image/")) {
                        formData.append("file", f);
                    } else {
                        console.warn(`Invalid file at index ${index}:`, f);
                    }
                });
            } else if (file instanceof File && file.size > 0 && file.type.startsWith("image/")) {
                formData.append("file", file);
            } else {
                console.warn("Invalid file object:", file);
            }
        }

        // Debug FormData contents
        console.log("FormData entries for createLaptop:", [...formData.entries()]);

        try {
            const response = await javaFormApi.post("/laptops", formData);
            return response.data;
        } catch (error) {
            console.error("Error creating laptop:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }
    async updateLaptop(id, { data, file }) {
        const formData = new FormData();
        // Append JSON data
        formData.append("data", JSON.stringify(data));

        // Handle file(s)
        if (file) {
            if (Array.isArray(file)) {
                file.forEach((f, index) => {
                    if (f instanceof File && f.size > 0 && f.type.startsWith("image/")) {
                        formData.append("file", f);
                    } else {
                        console.warn(`Invalid file at index ${index}:`, f);
                    }
                });
            } else if (file instanceof File && file.size > 0 && file.type.startsWith("image/")) {
                formData.append("file", file);
            } else {
                console.warn("Invalid file object:", file);
            }
        }

        // Debug FormData contents
        console.log("FormData entries for updateLaptop:", [...formData.entries()]);

        try {
            const response = await javaFormApi.put(`/laptops/${id}`, formData);
            return response.data;
        } catch (error) {
            console.error("Error updating laptop:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }

    // Xóa laptop
    async deleteLaptop(id) {
        const response = await javaApi.delete(`/laptops/${id}`);
        return response.data;
    }
}

export default new LaptopService();