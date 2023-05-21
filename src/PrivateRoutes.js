import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LoginAuthContext } from "./Context/LoginAuthContext";
export const PrivateRoutes = ({children}) => {
  const { isLoggedIn ,isEncodedToken} = useContext(LoginAuthContext);
  const token = localStorage.getItem("Encodedtoken");
  const location = useLocation();
  console.log("Location",location)
  console.log("encodedToken", isEncodedToken);

  if (!token) {
    return (
      <>
        <Navigate to='/login' replace state={{ path: location.pathname }} />
        {/* <Navigate to='/signup' replace state={{ path: location.pathname }} /> */}
      </>
    );
  }
  return children;
};
