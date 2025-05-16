import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/user/home";
import Login from "../pages/admin/login";
import Dashboard from "../pages/admin/dashboard";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Product from "../pages/admin/product";
import MousePad from "../pages/admin/mouse-pad";
import Mice from "../pages/admin/mice";
import Laptop from "../pages/admin/laptop";
import Headphone from "../pages/admin/headphone";
import Brand from "../pages/admin/brand";
import Category from "../pages/admin/Category";
import RequireAdmin from "./RequireAdmin";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/user/productDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>

      <Route path="/admin" element={<Login />} />

      <Route path="/admin" element={<RequireAdmin />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="mouse-pad" element={<MousePad />} />
          <Route path="mice" element={<Mice />} />
          <Route path="laptop" element={<Laptop />} />
          <Route path="headphone" element={<Headphone />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />} />
        </Route>
      </Route>

      <Route path="/404" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
