import { useContext, useEffect } from "react";
import {ProductListingcontext} from "../../Context/ProductListContext"
import { RemoveFromCart } from "./RemoveFromCart";

export const CartItems = () => {
  const {cartList, setCartList} =useContext(ProductListingcontext);
  const token = localStorage.getItem("Encodedtoken");

  const getCartItem = async () => {
    const response  = await fetch("/api/user/cart",{
      method: "GET",
      headers: {
        authorization: `"${token}"`, // Assuming 'token' holds the actual token value
      },
    });
    const cartProduct = await response.json();
    // console.log("Response get",await response.json());
    setCartList(cartProduct.cart)

  }

  console.log("CartList",cartList)

  useEffect(()=>{
    getCartItem();
  },[])

  const onClickRemoveFromCart =(id)=>{
    console.log(id)
    RemoveFromCart(id)
  }
  return <>
  <div>{cartList.length>0 ? <div>{cartList.map(cartItem =>{
    const {_id, title} = cartItem
     return <div>
      {_id}
      {title}
      <button onClick={()=> onClickRemoveFromCart(_id)}>Remove from Cart</button>
    </div>
    })}</div>:<p>Your Cart is Empty</p> }</div>
  </>
};
