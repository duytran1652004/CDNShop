import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Tag, Typography, Image, Card } from "antd";
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
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Title level={2}>Đơn hàng của bạn</Title>
      {orders.length === 0 ? (
        <div>Không có đơn hàng nào.</div>
      ) : (
        orders.map((order, idx) => (
          <Card key={idx} style={{ marginBottom: 24 }}>
            <div>
              <b>Mã đơn:</b> {order.order_id || idx + 1} &nbsp;
              <Tag color={order.status === "Pending" ? "orange" : "green"}>{order.status}</Tag>
            </div>
            <div><b>Ngày đặt:</b> {order.order_date}</div>
            <div><b>Người nhận:</b> {order.name} | <b>SDT:</b> {order.phone}</div>
            <div><b>Địa chỉ:</b> {order.address}</div>
            <div><b>Phương thức:</b> {order.payment_method} | <b>Trạng thái:</b> {order.payment_status}</div>
            <div><b>Nhận hàng:</b> {order.receiving_method}</div>
            <div style={{ margin: "12px 0" }}>
              <b>Sản phẩm:</b>
              {order.order_item.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
                  <Image src={item.product[0].url_img} width={60} style={{ marginRight: 12 }} />
                  <div>
                    <div>{item.product[0].name}</div>
                    <div>Số lượng: {item.quantity}</div>
                    <div>Đơn giá: {item.price.toLocaleString("vi-VN")}₫</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <b>Tổng tiền:</b> <span style={{ color: "red" }}>{order.total_amount.toLocaleString("vi-VN")}₫</span>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderList;