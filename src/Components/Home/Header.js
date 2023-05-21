import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginAuthContext } from "../../Context/LoginAuthContext"
import "./headerStyle.css"
export const Header = () => {
  const {isEncodedToken} = useContext(LoginAuthContext);
  console.log("in header",isEncodedToken);
    return<div className="header-container">
    <nav className="nav-container">
        <Link to="/">Home</Link>
        {isEncodedToken ?<Link to="/profile">Profile</Link> : <Link to="/login">Login</Link>}
        <Link to="/wishlist">WishList</Link>
        <Link to="/cart">Cart</Link>
        {/* <Link to="/login">Login</Link> */}
      </nav>
    </div>
}