import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
export const PrivateRoutes = ({children}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  console.log("Location",location)
  console.log("encodedToken", isLoggedIn);

  if(!isLoggedIn){
    return <Navigate to='/login' replace state={{ path: location.pathname }}/>}
    return children

//   return (


//     isLoggedIn ? children :<Navigate to='/login' replace state={{ path: location.pathname }}/>

//   );
};
