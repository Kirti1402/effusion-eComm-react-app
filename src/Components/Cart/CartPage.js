import { useContext } from "react"
import { LoginAuthContext } from "../../Context/LoginAuthContext"
import { CartItems } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { Login } from "../Login/LoginPage";

export const Cart = () => {
    const {isLoggedIn} = useContext(LoginAuthContext);

    console.log(isLoggedIn);
    return (
        <div>
         <CartItems/> 
        </div>
    )
}