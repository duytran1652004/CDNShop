import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const VGAModal = ({
  visible,
  onCancel,
  onOk,
  vgaConfig,
  setVgaConfig,
  vgaImages,
  setVgaImages,
}) => {
  const handleChange = (field, value) => {
    setVgaConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = ({ fileList }) => {
    const files = fileList.map((file, index) =>
      file.originFileObj ? file.originFileObj : file
    );
    setVgaImages(files);
  };

  return (
    <Modal
      title="Cấu hình VGA (Card đồ họa)"
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } }}
    >
      <Form layout="vertical">
        <Form.Item label="Kiến trúc GPU (architecture)">
          <Input
            value={vgaConfig.architecture}
            onChange={(e) => handleChange("architecture", e.target.value)}
            placeholder="Nhập kiến trúc (VD: Ada Lovelace)"
          />
        </Form.Item>
        <Form.Item label="CUDA Cores">
          <Input
            value={vgaConfig.cudaCores}
            onChange={(e) => handleChange("cudaCores", e.target.value)}
            placeholder="Nhập số CUDA cores"
          />
        </Form.Item>
        <Form.Item label="RT Cores">
          <Input
            value={vgaConfig.rtCores}
            onChange={(e) => handleChange("rtCores", e.target.value)}
            placeholder="Nhập số RT cores"
          />
        </Form.Item>
        <Form.Item label="Tensor Cores">
          <Input
            value={vgaConfig.tensorCores}
            onChange={(e) => handleChange("tensorCores", e.target.value)}
            placeholder="Nhập số Tensor cores"
          />
        </Form.Item>
        <Form.Item label="Ảnh VGA">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={vgaImages.map((file, index) => ({
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

export default VGAModal;
