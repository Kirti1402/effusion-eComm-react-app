import { useContext, useEffect } from "react";
import { wishListContext } from "../../Context/wishListContext";
import { cartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { AddToCart } from "../Cart/AddToCart";
import { toast } from "react-toastify";
import { RemoveFromWishList } from "./RemoveWishList";
import { ProductListingcontext } from "../../Context/ProductListContext";
import "./wishlist.css"

export const WishList = () => {
  const navigate = useNavigate();
  const { setProductId } = useContext(ProductListingcontext);
  const { wishlist, wishlistItem, setWishlistItem, setWishlist } =
    useContext(wishListContext);
  const { addedToCartList, setAddedToCartList } = useContext(cartContext);
  const token = localStorage.getItem("Encodedtoken");

  const getWishListItem = async () => {
    const response = await fetch("/api/user/wishlist", {
      method: "GET",
      headers: {
        authorization: `"${token}"`,
      },
    });
    const wishListProduct = await response.json();
    setWishlistItem(wishListProduct.wishlist);
  };
  useEffect(() => {
    getWishListItem();
  }, [wishlist]);

  const handleToggleWishlist = (productItem) => {
    const updatedWishlist = wishlist.filter((item) => item !== productItem._id);
    setWishlist([...updatedWishlist]);
    RemoveFromWishList(productItem._id);
    toast.warn(`${productItem.title} removed from wishlist!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const CartBtnHandle = (productItem) => {
    let CardProduct = { product: productItem };
    if (!addedToCartList.includes(productItem._id)) {
      AddToCart(CardProduct);
      setAddedToCartList([...addedToCartList, productItem._id]);
    } else {
      navigate("/cart");
    }
  };

  console.log("wishlist", wishlistItem);
  return (
    <div>
      <p className="wishList-text">My WishList ({wishlistItem.length})</p>
      <div className="wishlist-product-container">
        {wishlistItem.length > 0 &&
          wishlistItem.map((wishListProduct) => {
            const {
              _id,
              id,
              url,
              title,
              description,
              rating,
              price,
              discount,
              size,
            } = wishListProduct;
            let discountedPrice = price -(price *(discount/100))
            return (
              <div className="card-container">
                <div className="card-detail-container">
                  <Link
                  className="link-product"
                    to="/productDetail"
                    onClick={() => setProductId(_id)}
                  >
                    <div className="image-conatiner">
                      <img src={url} />
                      <div className="rating-container">
                        <span className="star">&#9733;</span>
                        <p className="rating">{rating}</p>
                      </div>
                    </div>
                    <div  className="card-detail">
                      <p>{title}</p>
                      <div className="price-discount">
                        <div>
                        <span><span>&#8377;</span>{discountedPrice}</span>
                        <span className="discount" style={{ textDecoration: "line-through" }}>
                          <span>&#8377;</span>
                          {price}
                        </span>
                        </div>
                        <div><span>{discount}% Off</span></div>
                      </div>
                    </div>
                  </Link>
                  <div className="wishList-container">
                  <button 
                  onClick={() => handleToggleWishlist(wishListProduct)}
                  className={wishlist.includes(_id) ? 'wishlist-button-added' : 'wishlist-button-remove'}
                >
                </button>
                </div>
                <button className="cart-btn" onClick={() => CartBtnHandle(wishListProduct)}>
                  {addedToCartList.includes(wishListProduct._id)
                    ? "Go To Cart"
                    : "Add To Cart"}
                </button>
                </div>
                
              </div>
            );
          })}
      </div>
    </div>
  );
};
