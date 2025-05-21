import React, { useEffect, useState } from "react";
import { Table, Select, Tag, message, Typography } from "antd";
import ListOrderService from "../../../service/AdminService/ListOrderService";
import "./listorder.css";

const { Option } = Select;
const { Title } = Typography;

const statusOptions = [
  { label: "Pending", value: "pending", color: "orange" },
  { label: "Confirmed", value: "confirmed", color: "blue" },
  { label: "Shipping", value: "shipping", color: "purple" },
  { label: "Success", value: "success", color: "green" },
];

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await ListOrderService.getOrders();
      if (Array.isArray(data.response)) {
        setOrders(data.response);
      } else {
        messageApi.error("Invalid order data");
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to load orders");
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
      messageApi.success(" Status updated successfully");
    } catch (error) {
      console.error(error);
      messageApi.error(" Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
        title: "Phương thức thanh toán",
        dataIndex: "paymentMethod",
        key: "paymentMethod",
    },
    {
        title: "Trạng thái",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => `${value.toLocaleString()} đ`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleChangeStatus(record.orderId, value)}
          style={{ width: 160 }}
        >
          {statusOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              <Tag color={option.color} style={{ fontSize: 13, padding: "2px 10px" }}>
                {option.label}
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
        <Title level={3}>📦 Order List</Title>
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
