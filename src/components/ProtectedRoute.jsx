import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  const authToken =
    token || localStorage.getItem("token");

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;