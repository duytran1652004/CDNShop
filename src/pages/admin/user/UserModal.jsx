import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const UserModal = ({
  visible,
  onCancel,
  onOk,
  form,
  editUser,
}) => {
  useEffect(() => {
    if (visible) {
      if (editUser) {
        setTimeout(() => {
          form.setFieldsValue({
            username: editUser.username || '',
            password: editUser.password || '',
            role: editUser.role || '',
            name: editUser.name || '',
            email: editUser.email || '',
            phone: editUser.phone || '',
            address: editUser.address || '',
          });
        }, 0);
      } else {
        form.resetFields();
      }
    }
  }, [visible, editUser]);

  return (
    <Modal
     width={800}
      title={editUser ? "Cập nhật người dùng" : "Thêm người dùng"}
      open={visible}
      onOk={() => form.validateFields().then(values => onOk(values))}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
          <Select placeholder="Chọn vai trò">
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
