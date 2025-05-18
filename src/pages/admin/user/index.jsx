import React, { useState } from 'react';
import { Button, Space, Table, message, Popconfirm, Form } from 'antd';
import UserModal from './UserModal';
import UserService from '../../../service/AdminService/UserService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const UserAdminPage = () => {
  const queryClient = useQueryClient();
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userForm] = Form.useForm();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getAllUser(),
  });

  const createUserMutation = useMutation({
    mutationFn: (data) => UserService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setIsUserModalVisible(false);
      message.success('Tạo user thành công!');
    },
    onError: (error) => message.error(`Tạo user thất bại: ${error.message}`),
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }) => UserService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setIsUserModalVisible(false);
      message.success('Cập nhật user thành công!');
    },
    onError: (error) => message.error(`Cập nhật user thất bại: ${error.message}`),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => UserService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      message.success('Xóa user thành công!');
    },
    onError: (error) => message.error(`Xóa user thất bại: ${error.message}`),
  });

  const handleCreateUser = () => {
    setEditUser(null);
    userForm.resetFields();
    setIsUserModalVisible(true);
  };

  const handleEditUser = async (user) => {
    try {
      const fullUser = await UserService.getUserById(user.userId);
      setEditUser(fullUser);
      setIsUserModalVisible(true);
    } catch (err) {
      message.error('Không thể tải thông tin người dùng');
    }
  };

  const handleSaveUser = (values) => {
    if (editUser) {
      updateUserMutation.mutate({ id: editUser.userId, data: values });
    } else {
      createUserMutation.mutate(values);
    }
  };

  const columns = [
    { title: 'Tên đăng nhập', dataIndex: 'username', key: 'username' },
    { title: 'Vai trò', dataIndex: 'role', key: 'role' },
    { title: 'Họ tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEditUser(record)}>Sửa</Button>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => deleteUserMutation.mutate(record.userId)}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Quản lý người dùng</h1>
      <Button type="primary" onClick={handleCreateUser} style={{ marginBottom: 16 }}>Tạo User</Button>
      <Table columns={columns} dataSource={users} rowKey="userId" loading={isLoading} />
      <UserModal
        visible={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        onOk={(values) => handleSaveUser(values)}
        form={userForm}
        editUser={editUser}
      />
    </div>
  );
};

export default UserAdminPage;