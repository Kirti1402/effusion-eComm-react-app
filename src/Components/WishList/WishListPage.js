import { useContext, useEffect } from "react";
import { wishListContext } from "../../Context/wishListContext";
import { cartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { AddToCart } from "../Cart/AddToCart";
import { toast } from "react-toastify";
import { RemoveFromWishList } from "./RemoveWishList";
import { ProductListingcontext } from "../../Context/ProductListContext";

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
      <p>WishList Page</p>
      <div className="product-container">
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
                    to="/productDetail"
                    onClick={() => setProductId(_id)}
                  >
                    <img src={url} />
                    <div>
                      <p>{title}</p>
                      <p>{description}</p>
                      <p>{rating}</p>
                      <p>
                        <span>{discountedPrice}</span>
                        <span style={{ textDecoration: "line-through" }}>
                          {price}
                        </span>
                      </p>
                      <p>{discount}% Off</p>
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
