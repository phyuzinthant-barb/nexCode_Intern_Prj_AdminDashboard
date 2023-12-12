import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const token = useSelector(state => state.authSlice.token);

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
