import { Navigate } from "react-router-dom";

const PublicRoute = ({ auth, children }) => {
  if (auth !== null) {
    return <Navigate to="/SlackPage" replace />;
  }
  return children;
};
export default PublicRoute;
