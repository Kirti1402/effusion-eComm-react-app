import { Link } from "react-router-dom";
export const Header = () => {
    return<>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/wishlist">WishList</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </nav>
    </>
}