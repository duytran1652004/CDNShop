import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TableDataGrid from "../../../components/TableDataGrid";
import BrandService from "../../../service/AdminService/BrandService";
import { Button, Input, message, Popconfirm, Modal, Form } from "antd";

const Brand = () => {
  const queryClient = useQueryClient();
  const [newBrand, setNewBrand] = useState({ name: "", description: "" });
  const [editBrand, setEditBrand] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { data: brands, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: () => BrandService.getAllBrands(),
  });

  const createBrandMutation = useMutation({
    mutationFn: (data) => BrandService.createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      setNewBrand({ name: "", description: "" });
      message.success("Tạo brand thành công!");
    },
    onError: (error) => {
      message.error("Tạo brand thất bại!");
      console.error("Error creating brand:", error);
    },
  });

  const deleteBrandMutation = useMutation({
    mutationFn: (id) => BrandService.deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      message.success("Xóa brand thành công!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Không xác định";
      message.error(`Xóa brand thất bại: ${errorMessage}`);
      console.error("Error deleting brand:", error);
    },
  });

  const updateBrandMutation = useMutation({
    mutationFn: ({ id, data }) => BrandService.updateBrand(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      setIsModalVisible(false);
      message.success("Cập nhật brand thành công!");
    },
    onError: (error) => {
      message.error("Cập nhật brand thất bại!");
      console.error("Error updating brand:", error);
    },
  });

  const handleCreateBrand = () => {
    createBrandMutation.mutate(newBrand);
  };

  const handleDeleteBrand = (id) => {
    deleteBrandMutation.mutate(id);
  };

  const handleEditBrand = (brand) => {
    setEditBrand(brand);
    form.setFieldsValue({
      name: brand.name,
      description: brand.description,
    });
    setIsModalVisible(true);
  };

  const handleUpdateBrand = () => {
    form.validateFields().then((values) => {
      updateBrandMutation.mutate({
        id: editBrand.brandId,
        data: values,
      });
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "brandId",
      key: "brandId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
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
          onClick={() => handleEditBrand(record)}
          style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
        >
          Sửa
        </Button>
        <Popconfirm
              title="Bạn có chắc chắn muốn xóa brand này?"
              onConfirm={() => handleDeleteBrand(record.brandId)}
              okText="Xóa"
              cancelText="Hủy"
              >
              <Button
                  danger
                  loading={deleteBrandMutation.isLoading && deleteBrandMutation.variables === record.brandId}
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
      <h1 className="text-2xl">Quản lý Brand</h1>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Input
          placeholder="Brand Name"
          value={newBrand.name}
          onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Description"
          value={newBrand.description}
          onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          onClick={handleCreateBrand}
          loading={createBrandMutation.isLoading}
          style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
        >
          Tạo Brand
        </Button>
      </div>
      <TableDataGrid columns={columns} dataSource={brands || []} />
      <Modal
        title="Chỉnh sửa Brand"
        visible={isModalVisible}
        onOk={handleUpdateBrand}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
          style: { backgroundColor: "#1890ff", borderColor: "#1890ff" },
          loading: updateBrandMutation.isLoading,
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên brand"
            rules={[{ required: true, message: "Vui lòng nhập tên brand!" }]}
          >
            <Input placeholder="Tên brand" />
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

export default Brand;