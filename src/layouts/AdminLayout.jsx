import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { key: 'dashboard', label: <Link to="/admin/dashboard">Dashboard</Link> },
    { key: 'product', label: <Link to="/admin/product">Product</Link> },
    { key: 'mouse-pad', label: <Link to="/admin/mouse-pad">Mouse Pad</Link> },
    { key: 'mice', label: <Link to="/admin/mice">Mice</Link> },
    { key: 'laptop', label: <Link to="/admin/laptop">Laptop</Link> },
    { key: 'headphone', label: <Link to="/admin/headphone">Headphone</Link> },
    { key: 'category', label: <Link to="/admin/category">Category</Link> },
    { key: 'brand', label: <Link to="/admin/brand">Brand</Link> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={300} className="admin-sider">
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