import React, { useEffect, useState } from "react";
import { Table, Select, Tag, message, Typography } from "antd";
import ListOrderService from "../../../service/AdminService/ListOrderService";
import "./listorder.css";

const { Option } = Select;
const { Title } = Typography;

const statusColors = {
  "Chờ xác nhận": "orange",
  "Đã xác nhận": "blue",
  "Đang giao hàng": "purple",
  "Thành công": "green",
};

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await ListOrderService.getOrders();
      if (Array.isArray(data.response)) {
        // Gỡ dấu nháy nếu backend trả về kiểu "\"Chờ xác nhận\""
        const cleaned = data.response.map((order) => ({
          ...order,
          status: typeof order.status === "string"
            ? order.status.replace(/^"|"$/g, "") // xoá " ở đầu/cuối
            : order.status,
        }));
        setOrders(cleaned);
      } else {
        messageApi.error("Dữ liệu đơn hàng không hợp lệ");
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };
  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      await ListOrderService.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
      messageApi.success("✅ Cập nhật trạng thái thành công");
    } catch (error) {
      console.error(error);
      messageApi.error("❌ Cập nhật trạng thái thất bại");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusOptions = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao hàng",
    "Thành công",
  ];

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => `${value.toLocaleString()} đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleChangeStatus(record.orderId, value)}
          style={{ width: 180 }}
        >
          {statusOptions.map((s) => (
            <Option key={s} value={s}>
              <Tag color={statusColors[s]} style={{ fontSize: 13, padding: "2px 10px" }}>
                {s}
              </Tag>
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
   <>
    {contextHolder}
    <div style={{ padding: 24 }}>
        <Title level={3}>📦 Danh sách đơn hàng</Title>
        <Table
            columns={columns}
            dataSource={orders}
            rowKey="orderId"
            loading={loading}
            bordered
            className="order-table-custom"
            pagination={{ pageSize: 6 }}
        />
        </div>
    </>
  );
};

export default ListOrder;
