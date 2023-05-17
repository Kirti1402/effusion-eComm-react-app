import { useContext } from "react"
import { LoginContext } from "../../Context/LoginContext"
import { CartItems } from "./CartItem";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
    const {isLoggedIn} = useContext(LoginContext);
    const navigate = useNavigate()

    const onClickHandle = () => {
        navigate("/login");
    }
    console.log(isLoggedIn);
    return (
        <div>
            <p>Cart Page</p>  
            {isLoggedIn ? <CartItems/> : <div>
                <p>Please Sign up to see Cart</p>
                <button onClick={onClickHandle}>Login</button>
                </div>}
        </div>
    )
}