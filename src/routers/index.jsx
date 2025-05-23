import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/user/home";
import Login from "../pages/admin/login";
import Dashboard from "../pages/admin/dashboard";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Product from "../pages/admin/product";
import Brand from "../pages/admin/brand";
import Category from "../pages/admin/Category";
import RequireAdmin from "./RequireAdmin";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/user/productDetail";
import CartByOrderBox from "../pages/user/cartByOrtherBox";
import UserAdminPage from "../pages/admin/user";
import OrderList from "../pages/user/OrderList/OrderList";
import PageListProduct from "../pages/user/ListProduct/PageListProduct";
import ListOrder from "../pages/admin/listOrder";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<CartByOrderBox />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="/collection/:category" element={<PageListProduct />} />
      </Route>

      <Route path="/admin" element={<Login />} />

      <Route path="/admin" element={<RequireAdmin />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />} />
          <Route path="user" element={<UserAdminPage />} />
          <Route path="list-order" element={<ListOrder />} />
        </Route>
      </Route>

      <Route path="/404" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
