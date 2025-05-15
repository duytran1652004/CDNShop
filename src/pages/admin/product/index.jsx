// pages/admin/product.js
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TableDataGrid from "../../../components/TableDataGrid";
import ProductService from "../../../service/AdminService/ProductService";
import { Button, Input, message, Modal, Form, Select, Popconfirm } from "antd";

const { Option } = Select;

const Product = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [filters, setFilters] = useState({
    page: 0,
    name: "",
    brandId: null,
    categoryId: null,
  });

  // Fetch danh sách products với filter
  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => ProductService.getAllProducts(filters),
  });

  // Fetch danh sách brands
  const { data: brands, isLoading: brandsLoading, error: brandsError } = useQuery({
    queryKey: ["brands"],
    queryFn: () => ProductService.getAllBrands(),
  });

  // Fetch danh sách categories
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => ProductService.getAllCategories(),
  });

  const createProductMutation = useMutation({
    mutationFn: (data) => ProductService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setIsModalVisible(false);
      message.success("Tạo product thành công!");
    },
    onError: (error) => {
      message.error("Tạo product thất bại!");
      console.error("Error creating product:", error);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }) => ProductService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setIsModalVisible(false);
      message.success("Cập nhật product thành công!");
    },
    onError: (error) => {
      message.error("Cập nhật product thất bại!");
      console.error("Error updating product:", error);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id) => ProductService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      message.success("Xóa product thành công!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Không xác định";
      message.error(`Xóa product thất bại: ${errorMessage}`);
      console.error("Error deleting product:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    },
  });

  const handleCreateProduct = () => {
    setEditProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.category?.categoryId,
      brandId: product.brand?.brandId,
      urlImg: product.urlImg,
      stockQuantity: product.stockQuantity,
    });
    setIsModalVisible(true);
  };

  const handleSaveProduct = () => {
    form.validateFields().then((values) => {
      const productData = {
        ...values,
        productId: editProduct ? editProduct.productId : 0,
        category: { categoryId: values.categoryId },
        brand: { brandId: values.brandId },
      };
      if (editProduct) {
        updateProductMutation.mutate({
          id: editProduct.productId,
          data: productData,
        });
      } else {
        createProductMutation.mutate(productData);
      }
    });
  };

  const handleDeleteProduct = (id) => {
    deleteProductMutation.mutate(id);
  };

  const handleFilterChange = () => {
    const values = filterForm.getFieldsValue();
    setFilters({
      page: 0,
      name: values.name || "",
      brandId: values.brandId || null,
      categoryId: values.categoryId || null,
    });
  };

  const handleTableChange = (paginationData) => {
    setFilters({
      ...filters,
      page: paginationData.current - 1, // Ant Design Table dùng page bắt đầu từ 1, nhưng API dùng từ 0
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
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
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => handleEditProduct(record)}
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa product này?"
            onConfirm={() => handleDeleteProduct(record.productId)}
            okText="Xóa"
            okType="danger"
            cancelText="Hủy"
          >
            <Button
              danger
              disabled={deleteProductMutation.isLoading && deleteProductMutation.variables === record.productId}
            >
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (productsLoading) return <div>Loading...</div>;
  if (productsError) return <div>Error: {productsError.message}</div>;
  if (brandsLoading || categoriesLoading) return <div>Loading brands and categories...</div>;
  if (brandsError) return <div>Error loading brands: {brandsError.message}</div>;
  if (categoriesError) return <div>Error loading categories: {categoriesError.message}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl">Quản lý Product</h1>
      {/* Form filter */}
      <Form form={filterForm} layout="inline" onFinish={handleFilterChange} style={{ marginBottom: "20px" }}>
        <Form.Item name="name" label="Tên sản phẩm">
          <Input placeholder="Tìm kiếm theo tên" style={{ width: 200 }} />
        </Form.Item>
        <Form.Item name="brandId" label="Thương hiệu">
          <Select placeholder="Chọn thương hiệu" style={{ width: 200 }} allowClear>
            {brands?.map((brand) => (
              <Option key={brand.brandId} value={brand.brandId}>
                {brand.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="categoryId" label="Danh mục">
          <Select placeholder="Chọn danh mục" style={{ width: 200 }} allowClear>
            {categories?.map((category) => (
              <Option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lọc
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginBottom: "20px" }}>
        <Button
          type="primary"
          onClick={handleCreateProduct}
          style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
        >
          Tạo Product
        </Button>
      </div>
      <TableDataGrid
        columns={columns}
        dataSource={products || []}
      />

      <Modal
        title={editProduct ? "Chỉnh sửa Product" : "Tạo Product"}
        visible={isModalVisible}
        onOk={handleSaveProduct}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
          style: { backgroundColor: "#1890ff", borderColor: "#1890ff" },
          loading: createProductMutation.isLoading || updateProductMutation.isLoading,
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea placeholder="Mô tả" rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input type="number" placeholder="Giá" />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              loading={categoriesLoading}
              disabled={categoriesLoading}
            >
              {categories?.map((category) => (
                <Option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="brandId"
            label="Thương hiệu"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu!" }]}
          >
            <Select
              placeholder="Chọn thương hiệu"
              loading={brandsLoading}
              disabled={brandsLoading}
            >
              {brands?.map((brand) => (
                <Option key={brand.brandId} value={brand.brandId}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="urlImg"
            label="URL hình ảnh"
            rules={[{ required: true, message: "Vui lòng nhập URL hình ảnh!" }]}
          >
            <Input placeholder="URL hình ảnh" />
          </Form.Item>
          <Form.Item
            name="stockQuantity"
            label="Số lượng tồn kho"
            rules={[{ required: true, message: "Vui lòng nhập số lượng tồn kho!" }]}
          >
            <Input type="number" placeholder="Số lượng tồn kho" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;