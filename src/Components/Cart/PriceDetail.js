import { useNavigate,useLocation } from "react-router-dom";
import { useContext, useState } from "react";

import { ProductListingcontext } from "../../Context/ProductListContext";

export default function PriceDetail() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { cartList } = useContext(ProductListingcontext);
  const { price, qty, discount } = cartList;

  //calculation total price of product
  const totalPrice =
    cartList.length > 0 &&
    cartList.reduce((total, { qty, price }) => {
      total = total + qty * price;
      return total;
    }, 0);
//calculation for total quantity
  const totalItem =
    cartList.length > 0 &&
    cartList.reduce((totalItem, { qty }) => {
      totalItem = totalItem + qty;
      return totalItem;
    }, 0);
//calculation for discount price
  const discountedPrice =
    cartList.length > 0 &&
    totalPrice -
      cartList.reduce((discountPrice, { qty, price, discount }) => {
        discountPrice =
          discountPrice + qty * Math.ceil(price - price * (discount / 100));
        return discountPrice;
      }, 0);

  const onClickCheckoutHandle = () => {
    if (currentPath === "/checkout") {
      // setIsCheckout("Place Order");
      navigate("/");
      window.location.reload();
    } else {
      navigate("/checkout");
    }
  };
  
  return (
    <div className="price-detail">
      <p>Price Detail</p>
      <hr />
      <p>
        Total Item : <span className="item-price-detail">{totalItem}</span>
      </p>
      <p>
        Total Price :{" "}
        <span className="item-price-detail">&#8377;{totalPrice}</span>
      </p>
      <p>
        Discount:{" "}
        <span className="item-price-detail">-&#8377;{discountedPrice}</span>
      </p>
      <hr />
      <p>
        Total Amount :{" "}
        <span className="item-price-detail">
          &#8377;{totalPrice - discountedPrice}
        </span>
      </p>
      <button onClick={onClickCheckoutHandle} className="checkout">
        {currentPath === "/checkout" ? "Place Order" : "CheckOut"}
      </button>
    </div>
  );
}
