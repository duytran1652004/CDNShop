import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TableDataGrid from "../../../components/TableDataGrid";
import CategoryService from "../../../service/AdminService/CategoryService";
import { Button, Input, message, Modal, Form, Popconfirm } from "antd";


const Category = () => {
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editCategory, setEditCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getAllCategories(),
  });

  const createCategoryMutation = useMutation({
    mutationFn: (data) => CategoryService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setNewCategory({ name: "", description: "" });
      message.success("Tạo category thành công!");
    },
    onError: (error) => {
      message.error("Tạo category thất bại!");
      console.error("Error creating category:", error);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }) => CategoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setIsModalVisible(false);
      message.success("Cập nhật category thành công!");
    },
    onError: (error) => {
      message.error("Cập nhật category thất bại!");
      console.error("Error updating category:", error);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id) => CategoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      message.success("Xóa category thành công!");
    },
    onError: (error) => {
      // Log chi tiết lỗi để xác định nguyên nhân
      const errorMessage = error.response?.data?.message || error.message || "Không xác định";
      message.error(`Xóa category thất bại: ${errorMessage}`);
      console.error("Error deleting category:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    },
  });

  const handleCreateCategory = () => {
    createCategoryMutation.mutate(newCategory);
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
    });
    setIsModalVisible(true);
  };

  const handleUpdateCategory = () => {
    form.validateFields().then((values) => {
      updateCategoryMutation.mutate({
        id: editCategory.categoryId,
        data: values,
      });
    });
  };

  const handleDeleteCategory = (id) => {
    deleteCategoryMutation.mutate(id);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => handleEditCategory(record)}
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            Sửa
          </Button>
          <Popconfirm
                title="Bạn có chắc chắn muốn xóa category này?"
                onConfirm={() => handleDeleteCategory(record.categoryId)}
                okText="Xóa"
                cancelText="Hủy"
                >
                <Button
                    danger
                    loading={deleteCategoryMutation.isLoading && deleteCategoryMutation.variables === record.categoryId}
                >
                    Xóa
                </Button>
            </Popconfirm>
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl">Quản lý Category</h1>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Input
          placeholder="Tên category"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          style={{ width: "200px" }}
        />
        <Input
          placeholder="Mô tả"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
          style={{ width: "300px" }}
        />
        <Button
          type="primary"
          onClick={handleCreateCategory}
          loading={createCategoryMutation.isLoading}
          style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
        >
          Tạo Category
        </Button>
      </div>
      <TableDataGrid rowKey="categoryId" columns={columns} dataSource={categories || []} />

      <Modal
        title="Chỉnh sửa Category"
        visible={isModalVisible}
        onOk={handleUpdateCategory}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
          style: { backgroundColor: "#1890ff", borderColor: "#1890ff" },
          loading: updateCategoryMutation.isLoading,
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên category"
            rules={[{ required: true, message: "Vui lòng nhập tên category!" }]}
          >
            <Input placeholder="Tên category" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input placeholder="Mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;