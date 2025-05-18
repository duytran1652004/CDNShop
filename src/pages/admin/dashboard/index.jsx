import React, { useEffect, useState } from "react";
import { DatePicker, Card, Row, Col, Statistic, List, Image, message } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import DashBoardService from "../../../service/AdminService/DashBoardService";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  const [stats, setStats] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);

  const fetchStats = async () => {
    try {
      const adjustedRange = [
        dateRange[0],
        dateRange[1].add(1, "day") // cộng thêm 1 ngày vào endDate
      ];
      const data = await DashBoardService.getDashBoard(adjustedRange);
      setStats(data);
    } catch (err) {
      message.error("Lỗi lấy thống kê");
    }
  };

  const fetchBestSellers = async () => {
    const now = dayjs();
    try {
      const data = await DashBoardService.getBestSellers(now.month() + 1, now.year());
      setBestSellers(data);
    } catch (err) {
      message.error("Lỗi lấy sản phẩm bán chạy");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchBestSellers();
  }, [dateRange]);

  const chartData = stats?.dailyStats
    ? Object.entries(stats.dailyStats).map(([date, { orderCount, revenue }]) => ({
        date,
        orderCount,
        revenue,
      }))
    : [];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col span={24}>
          <DatePicker.RangePicker
            value={dateRange}
            onChange={(val) => setDateRange(val)}
            style={{ marginBottom: 24 }}
          />
        </Col>

        <Col span={12}>
          <Card>
            <Statistic title="Tổng đơn hàng" value={stats?.totalOrders || 0} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={stats?.totalRevenue || 0}
              precision={0}
              suffix="₫"
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Biểu đồ doanh thu theo ngày" style={{ marginTop: 24 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu" />
                <Line type="monotone" dataKey="orderCount" stroke="#82ca9d" name="Đơn hàng" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Sản phẩm bán chạy" style={{ marginTop: 24 }}>
            <List
              itemLayout="horizontal"
              dataSource={bestSellers}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Image width={80} src={item.product.urlImg} />}
                    title={item.product.name}
                    description={`Số lượng bán: ${item.quantity}`}
                  />
                  <div>{item.product.price.toLocaleString()}₫</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
