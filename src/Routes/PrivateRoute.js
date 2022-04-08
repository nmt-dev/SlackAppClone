import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth, children }) => {
  if (auth === null) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default PrivateRoute;
