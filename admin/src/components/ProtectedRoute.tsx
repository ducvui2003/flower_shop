import { authUtil } from "@/lib/auth.util";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUtil.isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  if (!authUtil.isAuthenticated()) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
