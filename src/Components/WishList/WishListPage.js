import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

//file import
import { wishListContext } from "../../Context/wishListContext";
import { cartContext } from "../../Context/CartContext";
import { AddToCart } from "../Cart/AddToCart";
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
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
  };
  const CartBtnHandle = (productItem) => {
    let CardProduct = { product: productItem };
    if (!addedToCartList.includes(productItem._id)) {
      AddToCart(CardProduct);
      setAddedToCartList([...addedToCartList, productItem._id]);
      toast.success(`${productItem.title} added to cart!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } else {
      navigate("/cart");
    }
  };

  console.log("wishlist", wishlistItem);
  return (
    <div>
      {wishlistItem.length>0 ? <p className="wishList-text">My WishList ({wishlistItem.length})</p>: <div className="wishList-text"><p>Add now, Buy Later.
</p><p>Save your favourite items here!</p><button className="shop-btn" onClick = {() =>navigate("/product")}>SHOP</button></div>}
      
      <div className="wishlist-product-container">
        {wishlistItem.length > 0 &&
          wishlistItem.map((wishListProduct) => {
            const {
              _id,
              url,
              title,
              rating,
              price,
              discount,
            } = wishListProduct;
            let discountedPrice =Math.ceil(price -(price *(discount/100))) 
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
                <button className={addedToCartList.includes(_id)?'GoToCart-btn':'AddToCartBtn'}onClick={() => CartBtnHandle(wishListProduct)}>
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
