import React, { useState } from "react";
import { Dropdown, Menu, Divider } from "antd";
import logo from "../../assets/CDN-Shop.png";
import { Button, Input } from "antd";
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined, PhoneOutlined, CreditCardOutlined } from "@ant-design/icons";
import { LogoutIcon, HiIcon, DonHangIcon, HistoryViewIcon } from "../../assets/iconSVG/constants";
import "./MainHeader.css";
import AuthModal from "../AuthModal/AuthModal";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartService from "../../service/UserService/CartService";
import { useEffect } from "react";

const MainHeader = () => {
    const { isLoginedIn, user, logout, user_id } = useContext(AuthContext);
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState("login");

    const [cartCount, setCartCount] = useState(0);



    const handleLogout = () => {
        console.log("logout");
        setCartCount(0);
        logout();
    };

    const handleOpenModal = (mode) => {
        setModalMode(mode);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };
    useEffect(() => {
        if (isLoginedIn && user_id) {
            CartService.getCart(user_id)
                .then(res => setCartCount(res.total_cart || 0))
                .catch(() => setCartCount(0));
        } else {
            setCartCount(0);
        }
    }, [isLoginedIn, user_id]);


    useEffect(() => {
        const handleCartUpdated = () => {
            if (isLoginedIn && user_id) {
                CartService.getCart(user_id)
                    .then(res => setCartCount(res.total_cart || 0))
                    .catch(() => setCartCount(0));
            }
        };
        window.addEventListener("cart_updated", handleCartUpdated);
        return () => window.removeEventListener("cart_updated", handleCartUpdated);
    }, [isLoginedIn, user_id]);


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
            onClick={() => handleOpenModal("register")}
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
          Xin chào, {user?.name || "User"}
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
      <Menu.Item key="4" onClick={handleLogout}>
        <span style={{ display: "flex" }}>
          <span><LogoutIcon /></span>
          <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 10 }}>
            Đăng xuất
          </span>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="main-header">
      <div className="container-fluid" style={{ height: "100%" }}>
        <div className="row-header" style={{ height: "100%" }}>
          <div className="header-left">
            <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
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
                    icon={<CreditCardOutlined style={{ color: "#fff" }} />}
                    style={{ color: "#fff" }}
                    onClick={() => navigate("/orders")}
                >
                    Tra cứu đơn hàng
              </Button>
            </div>
            <div className="header-action-item" onClick={() => navigate("/cart")}>
                <Button
                    className="header-action-item-button"
                    type="text"
                    style={{ color: "#fff", position: "relative" }}
                    icon={
                    <div style={{ position: "relative" }}>
                        <ShoppingCartOutlined style={{ color: "#fff", fontSize: 20 }} />
                        {cartCount > 0 && (
                        <span style={{
                            position: "absolute",
                            top: -6,
                            right: -10,
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "50%",
                            fontSize: 10,
                            padding: "3px 6px",
                            lineHeight: 1
                        }}>
                            {cartCount}
                        </span>
                        )}
                    </div>
                    }
                >
                    Giỏ hàng
                </Button>
            </div>
            <div className="header-action-item button-menu">
              <Dropdown
                overlay={isLoginedIn ? loggedInMenu : loggedOutMenu}
                trigger={["hover"]}
                arrow
              >
                <Button
                  className="header-action-item-button"
                  type="text"
                  icon={<UserOutlined style={{ color: "#fff" }} />}
                  style={{ color: "#fff" }}
                >
                  {isLoginedIn ? user.name : "Đăng nhập"}
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