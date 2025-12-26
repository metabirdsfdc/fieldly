import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PageSpinner from "../components/ui/PageSpinner";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = () => {
  const { authState, loading } = useContext(AuthContext);

  if (loading) return <PageSpinner />;

  const isAuthenticated = !!authState.accessToken && !!authState.user;

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
