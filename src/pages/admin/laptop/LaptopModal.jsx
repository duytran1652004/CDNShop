import React from "react";
import { Modal, Form, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const LaptopModal = ({
  visible,
  onCancel,
  onOk,
  laptopConfig,
  setLaptopConfig,
  laptopImages,
  setLaptopImages,
  ramOptions,
  cpuOptions,
  storageOptions,
  screenOptions,
}) => {
  const handleChange = (field, value) => {
    setLaptopConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (info) => {
    const files = info.fileList.map(file => file.originFileObj).filter(Boolean);
    setLaptopImages(files);
  };

  return (
    <Modal
      title="Cấu hình Laptop"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } }}
    >
      <Form layout="vertical">
        <Form.Item label="RAM">
          <Select value={laptopConfig.ram} onChange={(v) => handleChange("ram", v)} placeholder="Chọn RAM">
            {ramOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="CPU">
          <Select value={laptopConfig.cpu} onChange={(v) => handleChange("cpu", v)} placeholder="Chọn CPU">
            {cpuOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Bộ nhớ">
          <Select value={laptopConfig.storage} onChange={(v) => handleChange("storage", v)} placeholder="Chọn bộ nhớ">
            {storageOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Màn hình">
          <Select value={laptopConfig.screen} onChange={(v) => handleChange("screen", v)} placeholder="Chọn màn hình">
            {screenOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Ảnh Laptop">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={laptopImages.map((file, i) => ({
                uid: file.uid || String(i),
                name: file.name,
                status: 'done',
                url: file.url,
              }))}

            multiple
          >
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LaptopModal;
