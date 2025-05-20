import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { key: 'dashboard', label: <Link to="/admin/dashboard">Dashboard</Link> },
    { key: 'product', label: <Link to="/admin/product">Sản Phẩm</Link> },
    { key: 'category', label: <Link to="/admin/category">Danh Mục</Link> },
    { key: 'brand', label: <Link to="/admin/brand">Thương Hiệu</Link> },
    { key: 'user', label: <Link to="/admin/user">Người Dùng</Link> },
    { key: 'list-order', label: <Link to="/admin/list-order">Danh Sách Đơn Hàng</Link> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="admin-sider">
        <div className="admin-title">Admin Panel</div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split('/').pop() || 'dashboard']}
          className="admin-menu"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;