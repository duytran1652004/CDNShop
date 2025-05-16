import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
        textAlign: "center",
        padding: 20,
      }}
    >
      <motion.h1
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        style={{ fontSize: "6rem", marginBottom: 0, color: "#ff4d4f" }}
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: 10 }}
      >
        Không tìm thấy trang
      </motion.h2>

      <motion.p
        style={{ color: "#666", maxWidth: 400 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Trang bạn đang tìm kiếm không tồn tại hoặc bạn không có quyền truy cập.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button style={{ padding: "20px" }} type="primary" onClick={() => navigate("/")}>
          Quay về trang chủ
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
