import { useContext, useEffect ,useState} from "react";
import {ProductListingcontext} from "../../Context/ProductListContext"
import { cartContext } from "../../Context/CartContext";
import {  toast } from 'react-toastify';
import { wishListContext } from "../../Context/wishListContext";
import { RemoveFromWishList } from "../WishList/RemoveWishList";
import { addWishList } from "../WishList/AddWishlist";



export const CartItems = () => {
  const [type,setType] = useState("increment");
  const {cartList, setCartList} =useContext(ProductListingcontext);
  const {addedToCartList,setAddedToCartList} = useContext(cartContext);
  const {wishlist, setWishlist,wishlistItem,
    setWishlistItem,} = useContext(wishListContext);
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
  },[type])

  const onClickRemoveFromCart =(id,title)=>{
    const updatedList = addedToCartList.filter(item => item !== id)
    setAddedToCartList([...updatedList])
    toast.warn(`${title} removed from cart!`, {
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

const onclickHandleQty = (id,type) =>{

  
  console.log(id,type)

    incrementTheProduct(id,type)

  

}
const incrementTheProduct = async (id,type) =>{
  const response = await fetch(`/api/user/cart/${id}`, {
      method: 'Post',
      headers: {
          authorization: token
        },
        body : JSON.stringify({action:{type:type}})  
         })
         console.log("increment response",await response.json())
}


const totalPrice = cartList.length>0 && cartList.reduce((acc,curr) =>{
  acc = acc + (curr.price * curr.qty)
  return acc;
},0)

const handleToggleWishlist = (productItem) => {
  let wishListProduct = { product:productItem}
  if (wishlist.includes(productItem._id)) {
    const updatedWishlist = wishlist.filter((item) => item !== productItem._id);
    setWishlist(updatedWishlist);
    RemoveFromWishList(productItem._id)
    toast.warn(`${productItem.title} removed from wishlist!`, {
      position: toast.POSITION.TOP_RIGHT
    });
  } else {
    addWishList(wishListProduct)
    setWishlist([...wishlist, productItem._id]);
    toast.success(`${productItem.title} added to wishlist!`, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
};

  return <>
  <div>{cartList.length>0 ? <div>{cartList.map(cartItem =>{
    const {_id, title,qty,price} = cartItem
     return <div>
      {_id}
      {title}
      <p>Price: {price}</p>
      <p>Quantity:<button onClick={()=>onclickHandleQty(_id,'decrement')} >-</button>{qty}<button onClick={()=>onclickHandleQty(_id,'increment')}>+</button></p>
      <button
                  onClick={() => handleToggleWishlist(cartItem)}
                  className={wishlist.includes(_id) ? 'wishlist-button active' : 'wishlist-button'}
                >
                  {wishlist.includes(_id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
      <button onClick={()=> onClickRemoveFromCart(_id,title)}>Remove from Cart</button>
    </div>
    })}
    <div>
      Total Price {totalPrice}
    </div>
    </div>:<p>Your Cart is Empty</p> }</div>

    
  </>
};
