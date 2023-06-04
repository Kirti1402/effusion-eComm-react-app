import { useContext, useEffect, useState } from "react";
import { ProductListingcontext } from "../../Context/ProductListContext";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { wishListContext } from "../../Context/wishListContext";
import { RemoveFromWishList } from "../WishList/RemoveWishList";
import { addWishList } from "../WishList/AddWishlist";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import PriceDetail from "./PriceDetail";


export const CartItems = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("increment");
  const { cartList, setCartList } = useContext(ProductListingcontext);
  const { addedToCartList, setAddedToCartList } = useContext(cartContext);
  const { wishlist, setWishlist,} =
    useContext(wishListContext);
  const token = localStorage.getItem("Encodedtoken");

  const getCartItem = async () => {
    const response = await fetch("/api/user/cart", {
      method: "GET",
      headers: {
        authorization: `"${token}"`, // Assuming 'token' holds the actual token value
      },
    });
    const cartProduct = await response.json();
    setCartList(cartProduct.cart);
  };

  console.log("CartList", cartList);

  useEffect(() => {
    getCartItem();
  }, [type]);

  const onClickRemoveFromCart = (id, title) => {
    const updatedList = addedToCartList.filter((item) => item !== id);
    setAddedToCartList([...updatedList]);
    toast.warn(`${title} removed from cart!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
    RemoveFromCart(id);
  };

  const RemoveFromCart = async (id) => {
    const response = await fetch(`/api/user/cart/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    const cartProduct = await response.json();
    setCartList(cartProduct.cart);
  };

  const onclickHandleQty = (id, type) => {
    console.log(id, type);

    incrementTheProduct(id, type);
  };
  const incrementTheProduct = async (id, type) => {
    const response = await fetch(`/api/user/cart/${id}`, {
      method: "Post",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({ action: { type: type } }),
    });
    console.log("increment response", await response.json());
  };


  const handleToggleWishlist = (productItem) => {
    let wishListProduct = { product: productItem };
    if (wishlist.includes(productItem._id)) {
      const updatedWishlist = wishlist.filter(
        (item) => item !== productItem._id
      );
      setWishlist(updatedWishlist);
      RemoveFromWishList(productItem._id);
      toast.warn(`${productItem.title} removed from wishlist!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } else {
      addWishList(wishListProduct);
      setWishlist([...wishlist, productItem._id]);
      toast.success(`${productItem.title} added to wishlist!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <>

          {cartList.length >0 ? <p className="cart-text" style={{color:'black'}}>My Cart ({cartList.length})</p>:<div className="cart-text"><p>There is Nothing in your cart.Let's add some items.</p><button className="shop-btn" onClick = {() =>navigate("/product")}>SHOP</button></div>}

      <div className="cart-page-container">
        {cartList.length > 0 && (
          <div className="cart-product-container">
            {cartList.map((cartItem) => {
              const { _id, size, url, title, rating, price, discount, qty } =
                cartItem;
              let discountedPrice = Math.ceil(price - price * (discount / 100));
              return (
                <div className="cart-card-container">
                  <div className="cart-card-detail-container">
                    <div className="cart-image-conatiner">
                      <img src={url} />
                      <div className="rating-container">
                        <span className="star">&#9733;</span>
                        <p className="rating">{rating}</p>
                      </div>
                    </div>
                    <div className="cart-card-detail">
                      <div></div>
                      <p>{title}</p>
                      <div className="price-discount">
                        <div>
                          <span>
                            <span>&#8377;</span>
                            {discountedPrice}
                          </span>
                          <span
                            className="discount"
                            style={{ textDecoration: "line-through" }}
                          >
                            <span>&#8377;</span>
                            {price}
                          </span>
                        </div>
                        <div>
                          <span>{discount}% Off</span>
                        </div>
                      </div>
                      <p>
                        Quantity:
                        <button
                          onClick={() => onclickHandleQty(_id, "decrement")}
                        >
                          -
                        </button>
                        {qty}
                        <button
                          onClick={() => onclickHandleQty(_id, "increment")}
                        >
                          +
                        </button>
                      </p>
                      <div className="wishList-container">
                        <button
                          onClick={() => handleToggleWishlist(cartItem)}
                          className={
                            wishlist.includes(_id)
                              ? "wishlist-button-added"
                              : "wishlist-button-remove"
                          }
                        ></button>
                      </div>
                      <div></div>

                      <button
                        className="remove-btn"
                        onClick={() => onClickRemoveFromCart(_id, title)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {cartList.length > 0 && (
          <PriceDetail/>
        )}
      </div>
    </>
  );
};
