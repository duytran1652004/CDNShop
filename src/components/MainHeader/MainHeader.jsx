import React, { useState } from "react";
import { Dropdown, Menu, Divider } from "antd";
import logo from "../../assets/CDN-Shop.png";
import { Button, Input } from "antd";
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { LogoutIcon, HiIcon, DonHangIcon, HistoryViewIcon } from "../../assets/iconSVG/constants";
import "./MainHeader.css";
import AuthModal from "../AuthModal/AuthModal";

const isLoggedIn = false;
const userName = "Nguyễn Chính";

const MainHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("login");

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const loggedOutMenu = (
    <Menu style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span><HiIcon /></span>
        <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 10 }}>
          Xin chào, Vui lòng đăng nhập để tiếp tục
        </span>
      </div>
      <Divider style={{ margin: 0 }} />
      <div
        className="box"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Menu.Item key="1">
          <Button
            type="primary"
            block
            style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
            onClick={() => handleOpenModal("login")}
          >
            ĐĂNG NHẬP
          </Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Button
            block
            onClick={() => handleOpenModal("register")} // Mở modal với form đăng ký
          >
            ĐĂNG KÝ
          </Button>
        </Menu.Item>
      </div>
    </Menu>
  );

  const loggedInMenu = (
    <Menu>
      <Menu.Item key="1" style={{ cursor: "default", color: "black" }}>
        <a style={{ display: "flex" }} href="">
          <span><HiIcon /></span>
          <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 10 }}>
            Xin chào, {userName}
          </span>
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a style={{ display: "flex" }} href="">
          <span><DonHangIcon /></span>
          <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 10 }}>
            Đơn hàng của tôi
          </span>
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a style={{ display: "flex" }} href="">
          <span><HistoryViewIcon /></span>
          <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 10 }}>
            Đã xem gần đây
          </span>
        </a>
      </Menu.Item>
      <Menu.Item key="4">
        <a style={{ display: "flex" }} href="">
          <span><LogoutIcon /></span>
          <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 10 }}>
            Đăng xuất
          </span>
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="main-header">
      <div className="container-fluid" style={{ height: "100%" }}>
        <div className="row-header" style={{ height: "100%" }}>
          <div className="header-left">
            <div className="logo">
              <img src={logo} alt="CDN-Shop" style={{ height: "100%" }} />
            </div>
            <div className="header-action-item button-menu">
              <Button
                className="header-action-item-button"
                type="text"
                icon={<MenuOutlined style={{ color: "#fff" }} />}
                style={{ color: "#fff", display: "flex", alignItems: "center" }}
              >
                <span style={{ marginLeft: 8 }}>Danh mục</span>
              </Button>
            </div>
          </div>
          <div className="header-right">
            <div className="header-action-item header-search">
              <Input
                className="input-search"
                placeholder="Tìm kiếm"
                prefix={<SearchOutlined />}
                style={{ height: 40, width: 300 }}
              />
            </div>
            <div className="header-action-item">
              <Button
                className="header-action-item-button"
                type="text"
                icon={<PhoneOutlined style={{ color: "#fff" }} />}
                style={{ color: "#fff" }}
              >
                Hotline: 1900.5301
              </Button>
            </div>
            <div className="header-action-item">
              <Button
                className="header-action-item-button"
                type="text"
                icon={<ShoppingCartOutlined style={{ color: "#fff" }} />}
                style={{ color: "#fff" }}
              >
                Giỏ hàng
              </Button>
            </div>
            <div className="header-action-item button-menu">
              <Dropdown
                overlay={isLoggedIn ? loggedInMenu : loggedOutMenu}
                trigger={["hover"]}
                arrow
              >
                <Button
                  className="header-action-item-button"
                  type="text"
                  icon={<UserOutlined style={{ color: "#fff" }} />}
                  style={{ color: "#fff" }}
                >
                  {isLoggedIn ? userName : "Đăng nhập"}
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <AuthModal visible={modalVisible} onCancel={handleCloseModal} initialMode={modalMode} />
    </header>
  );
};

export default MainHeader;