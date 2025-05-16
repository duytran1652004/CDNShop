import React, { useState, useEffect, useContext } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";
import AuthContext from "../../context/AuthContext";
import "./AuthModal.css";

const AuthModal = ({ visible, onCancel, initialMode = "login", onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { login, isLoginedIn } = useContext(AuthContext);


  useEffect(() => {
    if (visible) {
      setIsLogin(initialMode === "login");
      form.resetFields();
    }
  }, [visible, initialMode, form]);

  const registerMutation = useMutation({
    mutationFn: (data) => AuthService.register(data),
    onSuccess: (data) => {
      messageApi.success("Đăng ký thành công!");
      form.resetFields();
      setIsLogin(true);
    },
    onError: (error) => {
      messageApi.error("Đăng ký thất bại. Vui lòng thử lại!");
      console.error("Register error:", error);
    },
  });

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (isLogin) {
      const loginData = {
        username: values.username,
        password: values.password,
        website: "user",
      };
      login(loginData);
      onCancel();
    } else {
      const registerData = {
        username: values.username,
        name: values.name,
        email: values.email,
        phone: values.phone || "",
        address: values.address || "",
        password: values.password,
        role: "user",
      };
      registerMutation.mutate(registerData);
    }
  };


  return (
    <>
      {contextHolder}
      <Modal
        title={isLogin ? "ĐĂNG NHẬP HOẶC TẠO TÀI KHOẢN" : "ĐĂNG KÝ TÀI KHOẢN CDNTECH"}
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={400}
        centered
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          {isLogin ? (
            <>
              <Form.Item
                name="username"
                label="Tên tài khoản"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tài khoản!" },
                ]}
              >
                <Input className="input" placeholder="Đăng nhập bằng tên tài khoản" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  className="input"
                  placeholder="Mật khẩu"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <div style={{ marginBottom: 16 }}>
                <a href="#" style={{ color: "#1890ff" }}>
                  Quên mật khẩu email?
                </a>
              </div>
            </>
          ) : (
            <>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input className="input" placeholder="Đăng ký bằng email" />
              </Form.Item>
              <Form.Item
                name="username"
                label="Tên tài khoản"
                rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
              >
                <Input className="input" placeholder="Tên tài khoản" />
              </Form.Item>
              <Form.Item
                name="name"
                label="Tên"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input className="input" placeholder="Tên" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
              >
                <Input className="input" placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input className="input" placeholder="Địa chỉ" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  className="input"
                  placeholder="Mật khẩu"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", height: 40, marginTop: 10 }}
            >
              {isLogin ? "ĐĂNG NHẬP" : "TẠO TÀI KHOẢN"}
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <a onClick={handleSwitchForm} style={{ color: "#000", fontWeight: 500 }}>
            {isLogin ? "TẠO TÀI KHOẢN" : "ĐĂNG NHẬP"}
          </a>
        </div>
      </Modal>
    </>
  );
};

export default AuthModal;