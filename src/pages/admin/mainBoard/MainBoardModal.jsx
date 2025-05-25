import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const MainModal = ({
  visible,
  onCancel,
  onOk,
  mainConfig,
  setMainConfig,
  mainImages,
  setMainImages,
}) => {
  const handleChange = (field, value) => {
    setMainConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = ({ fileList }) => {
    const files = fileList.map((file, i) =>
      file.originFileObj ? file.originFileObj : file
    );
    setMainImages(files);
  };

  return (
    <Modal
      title="Cấu hình Bo mạch chủ"
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } }}
    >
      <Form layout="vertical">
      <Form.Item label="Chipset">
  <Input
    value={mainConfig.chipset}
    onChange={(e) => handleChange("chipset", e.target.value)}
    placeholder="Nhập Chipset"
  />
</Form.Item>
<Form.Item label="Bộ nhớ hỗ trợ">
  <Input
    value={mainConfig.memory}
    onChange={(e) => handleChange("memory", e.target.value)}
    placeholder="Nhập bộ nhớ hỗ trợ"
  />
</Form.Item>
<Form.Item label="Đồ họa tích hợp">
  <Input
    value={mainConfig.integratedGraphics}
    onChange={(e) => handleChange("integratedGraphics", e.target.value)}
    placeholder="Nhập thông tin đồ họa"
  />
</Form.Item>
<Form.Item label="Audio">
  <Input
    value={mainConfig.audio}
    onChange={(e) => handleChange("audio", e.target.value)}
    placeholder="Nhập thông tin audio"
  />
</Form.Item>
<Form.Item label="LAN">
  <Input
    value={mainConfig.lan}
    onChange={(e) => handleChange("lan", e.target.value)}
    placeholder="Nhập thông tin LAN"
  />
</Form.Item>


        <Form.Item label="Ảnh Mainboard">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={mainImages.map((file, index) => ({
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

export default MainModal;
