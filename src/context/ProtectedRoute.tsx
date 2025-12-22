import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PageSpinner from "../components/ui/PageSpinner";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { authState, loading } = useContext(AuthContext);

  if (loading) {
    return <PageSpinner />;
  }

  const isValidSession =
    Boolean(authState.accessToken) &&
    Boolean(authState.refreshToken) &&
    Boolean(authState.user);

  if (!isValidSession) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
