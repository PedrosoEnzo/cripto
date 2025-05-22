import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!sessionStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/login" />;
}
