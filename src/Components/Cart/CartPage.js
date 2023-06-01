import { useContext } from "react"
import { LoginAuthContext } from "../../Context/LoginAuthContext"
import { CartItems } from "./CartItem";

export const Cart = () => {
    // const {isLoggedIn} = useContext(LoginAuthContext);

    return (
        <div>
         <CartItems/> 
        </div>
    )
}