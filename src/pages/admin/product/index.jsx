import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TableDataGrid from "../../../components/TableDataGrid";
import ProductService from "../../../service/AdminService/ProductService";
import LaptopService from "../../../service/AdminService/LaptopService";
import { Button, Input, message, Modal, Form, Select, Popconfirm, Space, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

const Product = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLaptopConfigModalVisible, setIsLaptopConfigModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [filters, setFilters] = useState({
    page: 0,
    name: "",
    brandId: null,
    categoryId: null,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [laptopConfig, setLaptopConfig] = useState({ ram: "", cpu: "", storage: "", screen: "" });
  const [laptopImages, setLaptopImages] = useState([]); // Đổi từ 1 file sang mảng file

  const ramOptions = ["4GB", "8GB", "16GB", "32GB"];
  const cpuOptions = ["Intel Core i3", "Intel Core i5", "Intel Core i7", "AMD Ryzen 5", "AMD Ryzen 7"];
  const storageOptions = ["256GB SSD", "512GB SSD", "1TB SSD", "1TB HDD"];
  const screenOptions = ['13"', '14"', '15.6"', '17"'];

  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => ProductService.getAllProducts(filters),
  });

  const { data: brands, isLoading: brandsLoading, error: brandsError } = useQuery({
    queryKey: ["brands"],
    queryFn: () => ProductService.getAllBrands(),
  });

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => ProductService.getAllCategories(),
  });

  const createProductMutation = useMutation({
    mutationFn: (data) => ProductService.createProduct(data),
    onSuccess: async (productData) => {
      if (selectedCategory?.name === "Laptop") {
        const laptopData = {
          product: { productId: productData.productId },
          ram: laptopConfig.ram,
          cpu: laptopConfig.cpu,
          storage: laptopConfig.storage,
          screen: laptopConfig.screen,
        };
        await LaptopService.createLaptop({ data: laptopData, file: laptopImages });
        setLaptopImages([]);
      }
      queryClient.invalidateQueries(["products"]);
      setIsModalVisible(false);
      message.success("Tạo product thành công!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Không xác định";
      message.error(`Tạo product thất bại: ${errorMessage}`);
      console.error("Error creating product:", error);
    },
  });



  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }) => ProductService.updateProduct(id, data),
    onSuccess: async (productData) => {
      if (selectedCategory?.name === "Laptop") {
        const laptopData = {
          laptopId: editProduct?.laptopId || 0,
          product: { productId: productData.productId },
          ram: laptopConfig.ram,
          cpu: laptopConfig.cpu,
          storage: laptopConfig.storage,
          screen: laptopConfig.screen,
          brand: { brandId: productData.brand.brandId },
        };
        if (editProduct?.laptopId) {
          await LaptopService.updateLaptop(editProduct.laptopId, { data: laptopData, files: laptopImages });
        } else {
          await LaptopService.createLaptop({ data: laptopData, files: laptopImages });
        }
        setLaptopImages([]); // Reset file ảnh sau khi cập nhật
      }
      queryClient.invalidateQueries(["products"]);
      setIsModalVisible(false);
      message.success("Cập nhật product thành công!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Không xác định";
      message.error(`Cập nhật product thất bại: ${errorMessage}`);
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
    setSelectedCategory(null);
    setLaptopConfig({ ram: "", cpu: "", storage: "", screen: "" });
    setLaptopImages([]); // Reset file ảnh
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProduct = async (product) => {
    try {
      const productDetail = await ProductService.getProductDetail(product.productId);
      setEditProduct(productDetail);

      const category = categories.find((cat) => cat.categoryId === productDetail.category?.categoryId);
      setSelectedCategory(category);

      const laptop = productDetail.laptops && productDetail.laptops.length > 0 ? productDetail.laptops[0] : null;
      setLaptopConfig({
        ram: laptop?.ram || "",
        cpu: laptop?.cpu || "",
        storage: laptop?.storage || "",
        screen: laptop?.screen || "",
      });

      form.setFieldsValue({
        name: productDetail.name,
        description: productDetail.description,
        price: productDetail.price,
        categoryId: productDetail.category?.categoryId,
        brandId: productDetail.brand?.brandId,
        urlImg: productDetail.urlImg,
        stockQuantity: productDetail.stockQuantity,
      });

      setEditProduct({ ...productDetail, laptopId: laptop?.laptopId || null });
      setLaptopImages([]); // Reset file ảnh khi chỉnh sửa

      setIsModalVisible(true);
    } catch (error) {
      message.error("Không thể load chi tiết sản phẩm!");
      console.error("Error loading product detail:", error);
    }
  };

  const handleSaveProduct = () => {
    form.validateFields().then((values) => {
      const productData = {
        ...values,
        price: String(values.price),
        stockQuantity: String(values.stockQuantity),
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
      page: paginationData.current - 1,
    });
  };

  const handleCategoryChange = (categoryId) => {
    const category = categories.find((cat) => cat.categoryId === categoryId);
    setSelectedCategory(category);
    if (category?.name === "Laptop") {
      setIsLaptopConfigModalVisible(true);
    } else {
      setIsLaptopConfigModalVisible(false);
      setLaptopConfig({ ram: "", cpu: "", storage: "", screen: "" });
      setLaptopImages([]); // Reset file ảnh khi không chọn danh mục Laptop
    }
  };

  const handleLaptopConfigChange = (field, value) => {
    setLaptopConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveLaptopConfig = () => {
    // Validate laptop configuration
    if (!laptopConfig.ram || !laptopConfig.cpu || !laptopConfig.storage || !laptopConfig.screen) {
      message.error("Vui lòng chọn đầy đủ thông tin cấu hình laptop!");
      return;
    }
    setIsLaptopConfigModalVisible(false);
  };

  const handleImageUpload = (info) => {
    // Lấy tất cả file đã chọn
    const files = info.fileList.map(file => file.originFileObj).filter(Boolean);
    setLaptopImages(files);
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
      <div style={{ marginBottom: "20px" }}>
        <Form form={filterForm} layout="inline" onFinish={handleFilterChange}>
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
            <Select
              placeholder="Chọn danh mục"
              style={{ width: 200 }}
              allowClear
              onChange={(value) => {
                const category = categories.find((cat) => cat.categoryId === value);
                setFilters((prev) => ({ ...prev, categoryId: value || null }));
              }}
            >
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
      </div>

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

      {/* Modal Tạo/Chỉnh sửa Product */}
      <Modal
        title={editProduct ? "Chỉnh sửa Product" : "Tạo Product"}
        open={isModalVisible}
        onOk={handleSaveProduct}
        onCancel={() => {
          setIsModalVisible(false);
          setIsLaptopConfigModalVisible(false);
          setLaptopConfig({ ram: "", cpu: "", storage: "", screen: "" });
          // Không reset laptopImages ở đây để giữ file đã chọn cho đến khi lưu product
        }}
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
              onChange={handleCategoryChange}
            >
              {categories?.map((category) => (
                <Option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {selectedCategory?.name === "Laptop" && (
            <div style={{ marginBottom: "16px", padding: "16px", border: "1px solid #d9d9d9", borderRadius: "4px" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Cấu hình Laptop:</Text>
                <Text>RAM: {laptopConfig.ram || "Chưa chọn"}</Text>
                <Text>CPU: {laptopConfig.cpu || "Chưa chọn"}</Text>
                <Text>Bộ nhớ: {laptopConfig.storage || "Chưa chọn"}</Text>
                <Text>Màn hình: {laptopConfig.screen || "Chưa chọn"}</Text>
                <Text>Ảnh: {laptopImages.length > 0 ? laptopImages.map(f => f.name).join(', ') : "Chưa chọn file"}</Text>
                <Button
                  type="link"
                  onClick={() => setIsLaptopConfigModalVisible(true)}
                  style={{ padding: 0 }}
                >
                  {laptopConfig.ram || laptopConfig.cpu || laptopConfig.storage || laptopConfig.screen
                    ? "Chỉnh sửa cấu hình"
                    : "Thêm cấu hình"}
                </Button>
              </Space>
            </div>
          )}

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
            name="stockQuantity"
            label="Số lượng tồn kho"
            rules={[{ required: true, message: "Vui lòng nhập số lượng tồn kho!" }]}
          >
            <Input type="number" placeholder="Số lượng tồn kho" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        style={{ marginLeft: '32.6%' }}
        title="Cấu hình Laptop"
        open={isLaptopConfigModalVisible}
        onOk={handleSaveLaptopConfig}
        onCancel={() => {
          setIsLaptopConfigModalVisible(false);
          // Không reset laptopImages ở đây để giữ file đã chọn
        }}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
          style: { backgroundColor: "#1890ff", borderColor: "#1890ff" },
        }}
      >
        <Form layout="vertical">
          <Form.Item label="RAM">
            <Select
              placeholder="Chọn RAM"
              value={laptopConfig.ram}
              onChange={(value) => handleLaptopConfigChange("ram", value)}
            >
              {ramOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="CPU">
            <Select
              placeholder="Chọn CPU"
              value={laptopConfig.cpu}
              onChange={(value) => handleLaptopConfigChange("cpu", value)}
            >
              {cpuOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Bộ nhớ">
            <Select
              placeholder="Chọn bộ nhớ"
              value={laptopConfig.storage}
              onChange={(value) => handleLaptopConfigChange("storage", value)}
            >
              {storageOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Màn hình">
            <Select
              placeholder="Chọn kích thước màn hình"
              value={laptopConfig.screen}
              onChange={(value) => handleLaptopConfigChange("screen", value)}
            >
              {screenOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Ảnh Laptop">
            <Upload
              beforeUpload={() => false}
              onChange={handleImageUpload}
              fileList={laptopImages.map((file, idx) => ({
                uid: String(idx),
                name: file.name,
                status: 'done'
              }))}
              multiple
            >
              <Button icon={<UploadOutlined />}>Tải nhiều ảnh lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;