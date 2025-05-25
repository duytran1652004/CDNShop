import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CPUModal = ({
  visible,
  onCancel,
  onOk,
  cpuConfig,
  setCpuConfig,
  cpuImages,
  setCpuImages,
}) => {
  const handleChange = (field, value) => {
    setCpuConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = ({ fileList }) => {
    const files = fileList.map((file, index) =>
      file.originFileObj ? file.originFileObj : file
    );
    setCpuImages(files);
  };

  return (
    <Modal
      title="Cấu hình CPU"
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } }}
    >
      <Form layout="vertical">
      <Form.Item label="Dòng CPU">
  <Input
    value={cpuConfig.cpuType}
    onChange={(e) => handleChange("cpuType", e.target.value)}
    placeholder="Nhập dòng CPU (VD: Core i9)"
  />
</Form.Item>

<Form.Item label="Socket">
  <Input
    value={cpuConfig.socket}
    onChange={(e) => handleChange("socket", e.target.value)}
    placeholder="Nhập socket (VD: FCLGA1700)"
  />
</Form.Item>

<Form.Item label="Số luồng (Threads)">
  <Input
    value={cpuConfig.threads}
    onChange={(e) => handleChange("threads", e.target.value)}
    placeholder="Nhập số luồng (VD: 32)"
  />
</Form.Item>

<Form.Item label="Hệ số nhân (Multiplier)">
  <Input
    value={cpuConfig.multiplier}
    onChange={(e) => handleChange("multiplier", e.target.value)}
    placeholder="Nhập hệ số nhân (VD: 55)"
  />
</Form.Item>
        <Form.Item label="Ảnh CPU">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={cpuImages.map((file, index) => ({
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

export default CPUModal;
