import { Form, Input, Button } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";


const Login = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
    }
  return (
    <div className="login-container" style={{display: "flex"}}>
        <div className="login-img" style={{flex: "0 0 50%"}}>
            <img src="https://accounts.haravan.com/img/login_banner.svg" alt="" />
        </div>
        <div className="login-form" style={{flex: "0 0 50%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <h3>Welcome to Admin</h3>
            <Form form={form} onFinish={onFinish} layout="vertical" style={{width: "50%"}}>
                <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }, { type: "email", message: "Email không hợp lệ!" }]}
                >
                <Input className="input" placeholder="Đăng ký bằng số điện thoại" />
                </Form.Item>
                <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                <Input.Password
                    className="input"
                    placeholder="Mật khẩu"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", height: 40 }}>
                    ĐĂNG NHẬP
                </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
  )
}

export default Login