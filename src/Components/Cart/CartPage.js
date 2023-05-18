import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { CartItems } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { Login } from "../Login/LoginPage";

export const Cart = () => {
    const {isLoggedIn} = useContext(AuthContext);

    console.log(isLoggedIn);
    return (
        <div>
         <CartItems/> 
        </div>
    )
}