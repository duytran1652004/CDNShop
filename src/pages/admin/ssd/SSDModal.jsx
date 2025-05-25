import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const SSDModal = ({
  visible,
  onCancel,
  onOk,
  ssdConfig,
  setSsdConfig,
  ssdImages,
  setSsdImages
}) => {
  const handleChange = (field, value) => {
    setSsdConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = ({ fileList }) => {
    const files = fileList.map(file => file.originFileObj || file);
    setSsdImages(files);
  };

  return (
    <Modal
      title="Cấu hình SSD"
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical">
        <Form.Item label="Dung lượng (Capacity)">
          <Input
            value={ssdConfig.capacity}
            onChange={(e) => handleChange("capacity", e.target.value)}
            placeholder="VD: 512GB"
          />
        </Form.Item>
        <Form.Item label="Tốc độ đọc (Read Speed)">
          <Input
            value={ssdConfig.readSpeed}
            onChange={(e) => handleChange("readSpeed", e.target.value)}
            placeholder="VD: 3500MB/s"
          />
        </Form.Item>
        <Form.Item label="Tốc độ ghi (Write Speed)">
          <Input
            value={ssdConfig.writeSpeed}
            onChange={(e) => handleChange("writeSpeed", e.target.value)}
            placeholder="VD: 3000MB/s"
          />
        </Form.Item>
        <Form.Item label="Ảnh SSD">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={ssdImages.map((file, index) => ({
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

export default SSDModal;
