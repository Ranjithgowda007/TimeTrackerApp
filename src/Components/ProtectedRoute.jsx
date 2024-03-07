// PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation} from "react-router-dom";
import { AuthContext } from "../Contexts/LoginContext";

const PrivateRoute = () => {
    const location = useLocation()
  const { isLoggedIn } = useContext(AuthContext);

  if(isLoggedIn=== undefined){
    return null
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
