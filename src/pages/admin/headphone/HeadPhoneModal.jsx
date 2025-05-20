import React from "react";
import { Modal, Form, Select, Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const HeadphoneModal = ({
  visible,
  onCancel,
  onOk,
  headphoneConfig,
  setHeadphoneConfig,
  headphoneImages,
  setHeadphoneImages,
  colorOptions,
  connectivityOptions,
  batteryLifeOptions,
}) => {

    const handleChange = (field, value) => {
        setHeadphoneConfig((prev) => ({ ...prev, [field]: value }));
      };

      const handleImageUpload = (info) => {
        setHeadphoneImages(info.fileList);
      };

  return (
    <Modal
      title="Cấu hình Tai nghe"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } }}
    >
      <Form layout="vertical">
        <Form.Item label="Màu sắc">
          <Select
            value={headphoneConfig.color}
            onChange={(v) => handleChange("color", v)}
            placeholder="Chọn màu sắc"
          >
            {colorOptions.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Loại kết nối">
          <Select
            value={headphoneConfig.connectivityType}
            onChange={(v) => handleChange("connectivityType", v)}
            placeholder="Chọn loại kết nối"
          >
            {connectivityOptions.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Thời lượng pin (giờ)">
          <Select
            value={headphoneConfig.batteryLife}
            onChange={(v) => handleChange("batteryLife", v)}
            placeholder="Chọn thời lượng pin"
          >
            {batteryLifeOptions.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Ảnh Tai nghe">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={headphoneImages.map((file, i) => ({
              uid: file.uid || String(i),
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

export default HeadphoneModal;