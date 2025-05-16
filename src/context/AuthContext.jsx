import React, { createContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import AuthService from "../service/AuthService";
import { message } from "antd";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginedIn, setIsLoginedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const verifyToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp && decoded.exp > currentTime;
    } catch {
      return false;
    }
  };



  const setSession = (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    }
  };

  const loginMutation = useMutation({
    mutationFn: (data) => AuthService.login(data),
    onSuccess: (res) => {
        const token = res.acces_token;
        const name = res.name || "";
        const decoded = jwtDecode(token);

        setSession(token);
        localStorage.setItem("name", name);
        setUser({ ...decoded, name });
        setIsLoginedIn(true);
        setIsInitialized(true);

        if (decoded.authorities && decoded.authorities.includes("ROLE_ADMIN")) {
          window.location.href = "/admin/dashboard";
        } else {
          message.error("Tài khoản này không có quyền truy cập trang quản trị.");
        }
      },
    onError: (err) => {
      message.error("Đăng nhập thất bại!");
      setSession(null);
      setUser(null);
      setIsLoginedIn(false);
    },
  });

  const logout = () => {
    setSession(null);
    setUser(null);
    setIsLoginedIn(false);
    setIsInitialized(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && verifyToken(token)) {
      setUser({ ...jwtDecode(token), name });
      setIsLoginedIn(true);
    }
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoginedIn,
        login: loginMutation.mutate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;