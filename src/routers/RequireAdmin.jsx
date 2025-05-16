import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const RequireAdmin = () => {
  const { user } = useContext(AuthContext);

  if (!user || !user.authorities?.includes("ROLE_ADMIN")) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;
