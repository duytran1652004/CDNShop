import React from "react";
import { Row, Col, Divider } from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "./MainFooter.css";

const Footer = () => {
  return (
    <>
    <Divider/>
    <footer className="main-footer">
      <div className="container-fluid">
        <Row gutter={[16, 16]}>
          {/* Contact Information */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <h4>Thông Tin Liên Hệ</h4>
            <p>
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              123 Đường Điện Biên Phủ, Quận 3, TP. Hồ Chí Minh
            </p>
            <p>
              <PhoneOutlined style={{ marginRight: 8 }} />
              Hotline: 1900.5301
            </p>
            <p>
              <MailOutlined style={{ marginRight: 8 }} />
              Email: cskh@gearvn.com
            </p>
          </Col>

          {/* Customer Support */}
          <Col style={{color: '#fff'}} xs={24} sm={12} md={6} lg={4}>
            <h4>Hỗ Trợ Khách Hàng</h4>
            <p>
              <a href="#">Chính sách bảo hành</a>
            </p>
            <p>
              <a href="#">Hướng dẫn mua hàng</a>
            </p>
            <p>
              <a href="#">Hướng dẫn thanh toán</a>
            </p>
            <p>
              <a href="#">Câu hỏi thường gặp</a>
            </p>
            <p>
              <a href="#">Tra cứu địa chỉ chi nhánh</a>
            </p>
          </Col>

          {/* About Us */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <h4>Về Chúng Tôi</h4>
            <p>
              <a href="#">Giới thiệu công ty</a>
            </p>
            <p>
              <a href="#">Tuyển dụng</a>
            </p>
            <p>
              <a href="#">Liên hệ hợp tác</a>
            </p>
            <p>
              <a href="#">Build PC</a>
            </p>
          </Col>

          {/* Social Media */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <h4>Kết Nối Với Chúng Tôi</h4>
            <p>
              <a href="#">Facebook</a>
            </p>
            <p>
              <a href="#">Instagram</a>
            </p>
            <p>
              <a href="#">YouTube</a>
            </p>
          </Col>

          {/* Shipping Partners */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <h4>Đơn Vị Vận Chuyển</h4>
            <div className="footer-logos">
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=8782"
                alt="GHN"
                className="logo-item"
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=8782"
                alt="EMS"
                className="logo-item"
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/ship_3.png?v=8782"
                alt="GVN"
                className="logo-item"
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/ship_4.png?v=8782"
                alt="GHTK"
                className="logo-item"
              />
            </div>
          </Col>

          {/* Payment Methods */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <h4>Cách Thức Thanh Toán</h4>
            <div className="footer-logos">
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/pay_1.png?v=8782"
                alt="Tien Mat"
                className="logo-item"
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=8782"
                alt="JCB"
                className="logo-item"
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/pay_3.png?v=8782"
                alt="MasterCard"
                className="logo-item"
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/pay_4.png?v=8782"
                alt="ZaloPay"
                className="logo-item"
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/pay_5.png?v=8782"
                alt="Tra Gop 0%"
                className="logo-item"
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/pay_6.png?v=8782"
                alt="Visa"
                className="logo-item"
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=8782"
                alt="MoMo"
                className="logo-item"
              />
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p>© 2025 CDNTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>

  );
};

export default Footer;