import React from "react";
import { Modal, Form, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const MousepadModal = ({
  visible,
  onCancel,
  onOk,
  mousepadConfig,
  setMousepadConfig,
  mousepadImages,
  setMousepadImages,
  materialOptions,
  sizeOptions,
}) => {
  const handleChange = (field, value) => {
    setMousepadConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (info) => {
    setMousepadImages(info.fileList);
    console.log("info.fileList",info.fileList);
  };

  return (
    <Modal
      title="Cấu hình Mousepad"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } }}
    >
      <Form layout="vertical">
        <Form.Item label="Chất liệu">
          <Select
            value={mousepadConfig.material}
            onChange={(val) => handleChange("material", val)}
            placeholder="Chọn chất liệu"
          >
            {materialOptions.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Kích thước">
          <Select
            value={mousepadConfig.size}
            onChange={(val) => handleChange("size", val)}
            placeholder="Chọn kích thước"
          >
            {sizeOptions.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ảnh Mousepad">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={mousepadImages.map((file, i) => ({
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

export default MousepadModal;
