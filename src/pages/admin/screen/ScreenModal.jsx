import React from "react";
import { Modal, Form, Input, Select, Upload, Button, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const ScreenModal = ({
  visible,
  onCancel,
  onOk,
  screenConfig,
  setScreenConfig,
  screenImages,
  setScreenImages,
  screenTypeOptions,
  screenSizeOptions,
  resolutionOptions,
  refreshRateOptions,
  aspectRatioOptions,
}) => {
  const handleChange = (field, value) => {
    setScreenConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (info) => {
    const files = info.fileList.map(file => file.originFileObj).filter(Boolean);
    setScreenImages(files);
  };

  return (
    <Modal
      title="Cấu hình Màn Hình"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical">
      <Form.Item label="Loại màn hình">
            <Select value={screenConfig.screenType} onChange={(v) => handleChange("screenType", v)} placeholder="Chọn loại màn hình">
                {screenTypeOptions.map((opt) => (
                <Option key={opt} value={opt}>{opt}</Option>
                ))}
            </Select>
            </Form.Item>

            <Form.Item label="Kích thước">
            <Select value={screenConfig.screenSize} onChange={(v) => handleChange("screenSize", v)} placeholder="Chọn kích thước">
                {screenSizeOptions.map((opt) => (
                <Option key={opt} value={opt}>{opt}</Option>
                ))}
            </Select>
            </Form.Item>

            <Form.Item label="Độ phân giải">
            <Select value={screenConfig.resolution} onChange={(v) => handleChange("resolution", v)} placeholder="Chọn độ phân giải">
                {resolutionOptions.map((opt) => (
                <Option key={opt} value={opt}>{opt}</Option>
                ))}
            </Select>
            </Form.Item>

            <Form.Item label="Tốc độ làm mới">
            <Select value={screenConfig.refreshRate} onChange={(v) => handleChange("refreshRate", v)} placeholder="Chọn tốc độ làm mới">
                {refreshRateOptions.map((opt) => (
                <Option key={opt} value={opt}>{opt}</Option>
                ))}
            </Select>
            </Form.Item>

            <Form.Item label="Tỉ lệ khung hình">
            <Select value={screenConfig.aspectRatio} onChange={(v) => handleChange("aspectRatio", v)} placeholder="Chọn tỉ lệ">
                {aspectRatioOptions.map((opt) => (
                <Option key={opt} value={opt}>{opt}</Option>
                ))}
            </Select>
        </Form.Item>

        <Form.Item label="Cảm ứng">
          <Switch checked={screenConfig.touchscreen} onChange={(v) => handleChange("touchscreen", v)} />
        </Form.Item>
        <Form.Item label="Ảnh màn hình">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageUpload}
            fileList={screenImages.map((file, idx) => ({
                uid: file.uid || String(idx),
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

export default ScreenModal;
