import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { key: 'dashboard', label: <Link to="/admin/dashboard">Dashboard</Link> },
    { key: 'product', label: <Link to="/admin/product">Product</Link> },
    { key: 'category', label: <Link to="/admin/category">Category</Link> },
    { key: 'brand', label: <Link to="/admin/brand">Brand</Link> },
    { key: 'user', label: <Link to="/admin/user">User</Link> },
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