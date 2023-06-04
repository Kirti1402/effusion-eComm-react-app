import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { ProductListingcontext } from "../../Context/ProductListContext";
import "./headerStyle.css";
import SearchBar from "../SearchBar/SearchBar";
import { wishListContext } from "../../Context/wishListContext";
import { cartContext } from "../../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart ,faShoppingCart,faUser,faShoppingBag,faHome} from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const { wishlist } = useContext(wishListContext);
  const { addedToCartList } = useContext(cartContext);
  const { isEncodedToken } = useContext(LoginAuthContext);
  const { searchQuery, setSearchQuery } = useContext(ProductListingcontext);
  console.log("in header", isEncodedToken);
  return (
    <div className="header-container">
      <nav className="nav-container">
        <Link className="link" to="/">
          <span className="link-title"><FontAwesomeIcon icon={faHome } /></span>
        </Link>
        <div>
          <SearchBar />
        </div>
        <div className="right-container">
          <Link className="link" to="/product">
            <span className="link-title"><FontAwesomeIcon icon={faShoppingBag } /></span>
          </Link>
          
          <Link className="link" to="/profile">
            <span className="link-title"><FontAwesomeIcon icon={faUser } /></span>
          </Link>
          <Link className="link" to="/wishlist">
          <span className="link-title">
          <FontAwesomeIcon icon={faHeart} /><span className="banner-noti">{wishlist.length}</span>
            </span>
          </Link>
          
          <Link className="link" to="/cart">
            <span className="link-title">
            <FontAwesomeIcon icon={faShoppingCart} /><span className="banner-noti">{addedToCartList.length}</span>
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
