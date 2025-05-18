import React from "react";
import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const MiceModal = ({
  visible,
  onCancel,
  onOk,
  mouseConfig,
  setMouseConfig,
  mouseImages,
  setMouseImages,
  colorOptions,
  connectivityOptions,
  dpiOptions,
}) => {
  const handleChange = (field, value) => {
    setMouseConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (info) => {
    const files = info.fileList.map((file) => file.originFileObj).filter(Boolean);
    setMouseImages(files);
  };

  return (
    <Modal
      title="Cấu hình Chuột"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical">
        <Form.Item label="Màu sắc">
          <Select
            placeholder="Chọn màu"
            value={mouseConfig.color}
            onChange={(v) => handleChange("color", v)}
          >
            {colorOptions.map((opt) => (
              <Option key={opt} value={opt}>{opt}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Kết nối">
          <Select
            placeholder="Chọn kiểu kết nối"
            value={mouseConfig.connectivityType}
            onChange={(v) => handleChange("connectivityType", v)}
          >
            {connectivityOptions.map((opt) => (
              <Option key={opt} value={opt}>{opt}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="DPI">
          <Select
            placeholder="Chọn DPI"
            value={mouseConfig.dpi}
            onChange={(v) => handleChange("dpi", v)}
          >
            {dpiOptions.map((opt) => (
              <Option key={opt} value={opt}>{opt}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ảnh Chuột">
          <Upload
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={mouseImages.map((file, idx) => ({
              uid: file.uid || String(idx),
              name: file.name,
              status: 'done',
              url: file.url,
            }))}
            listType="picture"
            multiple
          >
            <Button icon={<UploadOutlined />}>Ảnh chuột</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MiceModal;