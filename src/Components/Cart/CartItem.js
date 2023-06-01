import { useContext, useEffect } from "react";
import {ProductListingcontext} from "../../Context/ProductListContext"
import { cartContext } from "../../Context/CartContext";
import {  toast } from 'react-toastify';


export const CartItems = () => {
  const {cartList, setCartList} =useContext(ProductListingcontext);
  const {addedToCartList,setAddedToCartList} = useContext(cartContext);
  const token = localStorage.getItem("Encodedtoken");

  const getCartItem = async () => {
    const response  = await fetch("/api/user/cart",{
      method: "GET",
      headers: {
        authorization: `"${token}"`, // Assuming 'token' holds the actual token value
      },
    });
    const cartProduct = await response.json();
    setCartList(cartProduct.cart)

  }

  console.log("CartList",cartList)

  useEffect(()=>{
      getCartItem();
  },[])

  const onClickRemoveFromCart =(id)=>{
    const updatedList = addedToCartList.filter(item => item !== id)
    setAddedToCartList([...updatedList])
    toast.error('Item removed from cart!', {
      position: toast.POSITION.TOP_RIGHT
    });
    RemoveFromCart(id)
  }

  const RemoveFromCart = async (id) =>{

    const response = await fetch(`/api/user/cart/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: token
          },
           })
        const cartProduct = await response.json();
        setCartList(cartProduct.cart)
}

const incrementTheProduct = async (id) =>{
  const response = await fetch(`/api/user/cart/${id}`, {
      method: 'Post',
      headers: {
          authorization: token
        },
        action: {
          type: "increment"
        },
         })
         console.log("increment response",await response.json())
}


const totalPrice = cartList.length>0 && cartList.reduce((acc,curr) =>{
  acc = acc + (curr.price * curr.qty)
  return acc;
},0)

  return <>
  <div>{cartList.length>0 ? <div>{cartList.map(cartItem =>{
    const {_id, title,qty,price} = cartItem
     return <div>
      {_id}
      {title}
      <p>Price: {price}</p>
      <p>Quantity:<button >-</button>{qty}<button onClick={()=>incrementTheProduct(_id)}>+</button></p>
      <button onClick={()=> onClickRemoveFromCart(_id)}>Remove from Cart</button>
    </div>
    })}
    <div>
      Total Price {totalPrice}
    </div>
    </div>:<p>Your Cart is Empty</p> }</div>

    
  </>
};
