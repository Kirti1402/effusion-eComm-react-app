import { useContext, useEffect, useState } from "react";
import { ProductListingcontext } from "../../Context/ProductListContext";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { wishListContext } from "../../Context/wishListContext";
import { RemoveFromWishList } from "../WishList/RemoveWishList";
import { addWishList } from "../WishList/AddWishlist";
import "./cart.css";

export const CartItems = () => {
  const [type, setType] = useState("increment");
  const { cartList, setCartList } = useContext(ProductListingcontext);
  const { addedToCartList, setAddedToCartList } = useContext(cartContext);
  const { wishlist, setWishlist, wishlistItem, setWishlistItem } =
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

  const totalPrice =
    cartList.length > 0 &&
    cartList.reduce((total, { qty, price, discount }) => {
      total = total + qty * price;
      return total;
    }, 0);

  const totalItem =
    cartList.length > 0 &&
    cartList.reduce((totalItem, { qty }) => {
      totalItem = totalItem + qty;
      return totalItem;
    }, 0);

  const discountedPrice =
    cartList.length > 0 &&
    totalPrice -
      cartList.reduce((discountPrice, { qty, price, discount }) => {
        console.log(qty, price, discount);
        discountPrice =
          discountPrice + qty * Math.ceil(price - price * (discount / 100));
        return discountPrice;
      }, 0);

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

          {cartList.length >0 ? <p className="cart-text" style={{color:'black'}}>My Cart ({cartList.length})</p>:<p className="cart-text">There is Nothing in your cart.Let's add some items.</p>}

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
          <div className="price-detail">
            <p>Price Detail</p>
            <hr/>
            <p>
              Total Item : <span className="item-price-detail">{totalItem}</span>
            </p>
            <p>
              Total Price : <span className="item-price-detail">&#8377;{totalPrice}</span>
            </p>
            <p>
              Discount: <span className="item-price-detail">-&#8377;{discountedPrice}</span>
            </p>
            <hr/>
            <p>
              Total Amount : <span className="item-price-detail">&#8377;{totalPrice - discountedPrice}</span>
            </p>

            <button className="checkout">CheckOut</button>
          </div>
        )}
      </div>
    </>
  );
};
