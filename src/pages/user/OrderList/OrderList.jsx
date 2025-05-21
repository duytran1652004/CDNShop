import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Tag, Typography, Image, Card, Divider } from "antd";
import OrderService from "../../../service/UserService/OrderService";

const { Title } = Typography;

const OrderList = () => {
  const { user_id } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user_id) return;
      try {
        const res = await OrderService.getOrdersByUserId(user_id);
        setOrders(Array.isArray(res) ? res : [res]);
      } catch (err) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user_id]);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>
      <Title level={2} style={{ marginBottom: 24 }}>Đơn hàng của bạn</Title>
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", background: "#f5f5f5", borderRadius: 8 }}>
          Không có đơn hàng nào.
        </div>
      ) : (
        orders.map((order, idx) => (
          <Card
            key={idx}
            style={{
              marginBottom: 24,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: 8
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 500 }}>
                Mã đơn: {order.order_id || idx + 1}
              </div>
              <Tag
                color={order.status === "Pending" ? "orange" : "green"}
                style={{
                  padding: "4px 12px",
                  fontSize: 14,
                  borderRadius: 4
                }}
              >
                {order.status}
              </Tag>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: 16
            }}>
              <div>
                <div style={{ color: "#666", marginBottom: 4 }}>Ngày đặt</div>
                <div style={{ fontWeight: 500 }}>{order.order_date}</div>
              </div>
              <div>
                <div style={{ color: "#666", marginBottom: 4 }}>Người nhận</div>
                <div style={{ fontWeight: 500 }}>{order.name}</div>
              </div>
              <div>
                <div style={{ color: "#666", marginBottom: 4 }}>Số điện thoại</div>
                <div style={{ fontWeight: 500 }}>{order.phone}</div>
              </div>
              <div>
                <div style={{ color: "#666", marginBottom: 4 }}>Địa chỉ</div>
                <div style={{ fontWeight: 500 }}>{order.address}</div>
              </div>
            </div>

            <Divider style={{ margin: "16px 0" }} />

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: 16
            }}>
              <div>
                <div style={{ color: "#666", marginBottom: 4 }}>Phương thức thanh toán</div>
                <div style={{ fontWeight: 500 }}>{order.payment_method}</div>
              </div>
              <div>
                <div style={{ color: "#666", marginBottom: 4 }}>Trạng thái thanh toán</div>
                <div style={{ fontWeight: 500 }}>{order.payment_status}</div>
              </div>
              <div>
                <div style={{ color: "#666", marginBottom: 4 }}>Hình thức nhận hàng</div>
                <div style={{ fontWeight: 500 }}>{order.receiving_method}</div>
              </div>
            </div>

            <Divider style={{ margin: "16px 0" }} />

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>Sản phẩm</div>
              {order.order_item.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                    background: "#f9f9f9",
                    borderRadius: 8,
                    marginBottom: 8
                  }}
                >
                  <Image
                    src={item.product[0].url_img}
                    width={80}
                    style={{
                      marginRight: 16,
                      borderRadius: 4,
                      objectFit: "cover"
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>
                      {item.product[0].name}
                    </div>
                    <div style={{ display: "flex", gap: "16px", color: "#666" }}>
                      <div>Số lượng: {item.quantity}</div>
                      <div>Đơn giá: {item.price.toLocaleString("vi-VN")}₫</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              textAlign: "right",
              padding: "16px",
              background: "#f5f5f5",
              borderRadius: 8
            }}>
              <span style={{ fontSize: 16, fontWeight: 500 }}>Tổng tiền: </span>
              <span style={{
                color: "#ff4d4f",
                fontSize: 20,
                fontWeight: 600
              }}>
                {order.total_amount.toLocaleString("vi-VN")}₫
              </span>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderList;