import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { CartItems } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { Login } from "../Login/LoginPage";

export const Cart = () => {
    const {isLoggedIn} = useContext(AuthContext);
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
                {/* <button onClick={onClickHandle}>Login</button> */}
                <Login/>
                </div>}
        </div>
    )
}