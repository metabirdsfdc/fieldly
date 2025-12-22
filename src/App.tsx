import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import PageSpinner from "./components/ui/PageSpinner";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import PublicRoute from "./context/PublicRoute";
import DeployPage from "./pages/DeployPage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const { loading } = useContext(AuthContext);
  if (loading) return <PageSpinner />;

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DeployPage />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
