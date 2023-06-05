import {Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LoginAuthContext } from "./Context/LoginAuthContext";
export const PrivateRoutes = ({children}) => {
  const {isEncodedToken} = useContext(LoginAuthContext);
  const token = localStorage.getItem("Encodedtoken");
  const location = useLocation();
  console.log("encodedToken", isEncodedToken);

  if (!token) {
    return (
      <>
        <Navigate to='/login' replace state={{ path: location.pathname }} />
      </>
    );
  }
 
  return children;
};
