import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
export const PrivateRoutes = () => {
    const {isEncodedToken} = useContext(AuthContext);

    return (
        isEncodedToken ? <Outlet/>:<Navigate to='/login'/>
    )
}