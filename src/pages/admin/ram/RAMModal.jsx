import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const RAMModal = ({
  visible,
  onCancel,
  onOk,
  ramConfig,
  setRamConfig,
  ramImages,
  setRamImages,
}) => {
  const handleChange = (field, value) => {
    setRamConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = ({ fileList }) => {
    const files = fileList.map(file => file.originFileObj || file);
    setRamImages(files);
  };

  return (
    <Modal
      title="Cấu hình RAM"
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } }}
    >
      <Form layout="vertical">
        <Form.Item label="Dung lượng (Capacity)">
          <Input
            value={ramConfig.capacity}
            onChange={(e) => handleChange("capacity", e.target.value)}
            placeholder="VD: 16GB"
          />
        </Form.Item>
        <Form.Item label="Loại RAM (Type)">
          <Input
            value={ramConfig.type}
            onChange={(e) => handleChange("type", e.target.value)}
            placeholder="VD: DDR5"
          />
        </Form.Item>
        <Form.Item label="Tốc độ (Speed)">
          <Input
            value={ramConfig.speed}
            onChange={(e) => handleChange("speed", e.target.value)}
            placeholder="VD: 5600MHz"
          />
        </Form.Item>
        <Form.Item label="Ảnh RAM">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={ramImages.map((file, index) => ({
              uid: file.uid || `${index}`,
              name: file.name,
              status: "done",
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

export default RAMModal;
