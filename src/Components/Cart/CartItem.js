import { useContext, useEffect } from "react";
import {ProductListingcontext} from "../../Context/ProductListContext"

export const CartItems = () => {
  const {cartList, setCartList} =useContext(ProductListingcontext);
  // console.log("token",token)
  const token = localStorage.getItem("Encodedtoken");

  const getCartItem = async () => {
    const response  = await fetch("/api/user/cart",{
      method: "GET",
      headers: {
        authorization: `"${token}"`, // Assuming 'token' holds the actual token value
      },
    });
    const cartProduct = await response.json();
    // console.log(await response.json());
    setCartList(cartProduct.cart)

  }

  useEffect(()=>{
    getCartItem();
  },[])

  return <>
  <div>{cartList.length>0 ? <p>full</p>:<p>Your Cart is Empty</p> }</div>
  </>
};
