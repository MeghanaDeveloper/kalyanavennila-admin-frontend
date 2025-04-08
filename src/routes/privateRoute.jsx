import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { isAdminAuthenticated } = useSelector(state => state.userReducer); 
  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminPrivateRoute;
