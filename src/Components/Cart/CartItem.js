import { useContext, useEffect, useState } from "react";
import { ProductListingcontext } from "../../Context/ProductListContext";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { wishListContext } from "../../Context/wishListContext";
import { RemoveFromWishList } from "../WishList/RemoveWishList";
import { addWishList } from "../WishList/AddWishlist";
import "./cart.css"

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
      position: toast.POSITION.TOP_RIGHT,
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
    cartList.reduce((total, {qty,price,discount}) => {
      total = total + qty *  Math.ceil((price - (price * (discount/100))));
      return total;
    }, 0);

    const totalItem = cartList.length>0 && cartList.reduce((totalItem,{qty})=>{
      totalItem = totalItem + qty
      return totalItem
    },0)

    const discountedPrice = cartList.length >0 && cartList.reduce((discountPrice,{qty,price,discount})=>{
      discountPrice =(price * qty) -(qty *  Math.ceil((price - (price * (discount/100)))))

      return discountPrice
    },0)

  const handleToggleWishlist = (productItem) => {
    let wishListProduct = { product: productItem };
    if (wishlist.includes(productItem._id)) {
      const updatedWishlist = wishlist.filter(
        (item) => item !== productItem._id
      );
      setWishlist(updatedWishlist);
      RemoveFromWishList(productItem._id);
      toast.warn(`${productItem.title} removed from wishlist!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      addWishList(wishListProduct);
      setWishlist([...wishlist, productItem._id]);
      toast.success(`${productItem.title} added to wishlist!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="cart-page-container">
        {cartList.length > 0 ? (
          <div className="cart-product-container">
            {cartList.map((cartItem) => {
              const { _id, id, url, title, rating, price, discount, qty } =
                cartItem;
                let discountedPrice = Math.ceil((price - price * (discount / 100)));
              return (
                <div className="card-container">
                  <div className="card-detail-container">
                    <div className="image-conatiner">
                      <img src={url} />
                      <div className="rating-container">
                        <span className="star">&#9733;</span>
                        <p className="rating">{rating}</p>
                      </div>
                    </div>
                    <div className="card-detail">
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
                  </div>
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
                  <button
                    className="cart-btn"
                    onClick={() => onClickRemoveFromCart(_id, title)}
                  >
                    Remove from Cart
                  </button>
                </div>
              );
            })}
            
          </div>
        ) : (
          <p>Your Cart is Empty</p>
        )}
        <div className="checkout-detail">
            <p>Total Item : <span>{totalItem}</span></p>
            <p>Total Price : <span>{totalPrice}</span></p> 
            <p>Discount: <span>{discountedPrice}</span></p>
        </div>
      </div>
    </>
  );
};
