import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"
import { useContext } from "react";
export const Header = () => {
  const {isLoggedIn} = useContext(AuthContext)
    return<>
    <nav>
        <Link to="/">Home</Link>
        {isLoggedIn ?<Link to="/profile">Profile</Link> : <Link to="/login">Login</Link>}
        <Link to="/wishlist">WishList</Link>
        <Link to="/cart">Cart</Link>
        {/* <Link to="/login">Login</Link> */}
      </nav>
    </>
}