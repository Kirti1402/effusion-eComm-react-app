import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { ProductListingcontext } from "../../Context/ProductListContext";
import "./headerStyle.css";
export const Header = () => {
  const { isEncodedToken } = useContext(LoginAuthContext);
  const { searchQuery, setSearchQuery } = useContext(ProductListingcontext);
  console.log("in header", isEncodedToken);
  return (
    <div className="header-container">
      <nav className="nav-container">
        <Link className="link" to="/">
          <span className="link-title">Home</span>
        </Link>
        <div className="right-container">
          <Link className="link" to="/product">
            <span className="link-title">Shop</span>
          </Link>
          {isEncodedToken ? (
            <Link className="link" to="/profile">
              <span className="link-title">Profile</span>
            </Link>
          ) : (
            <Link className="link" to="/login">
              <span className="link-title">Login</span>
            </Link>
          )}
          <Link className="link" to="/wishlist">
            <span className="link-title">Wishlist</span>
          </Link>
          <Link className="link" to="/cart">
            <span className="link-title">Cart</span>
          </Link>
        </div>

        {/* <Link to="/login">Login</Link> */}
      </nav>
    </div>
  );
};
