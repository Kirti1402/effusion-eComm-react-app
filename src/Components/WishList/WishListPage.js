import { useContext ,useEffect} from "react";
import { wishListContext } from "../../Context/wishListContext";
import { cartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { AddToCart } from "../Cart/AddToCart";
import {  toast } from 'react-toastify';
import { addWishList } from "./AddWishlist";
import { RemoveFromWishList } from "./RemoveWishList";
import { Loader } from "../Loader/Loader";

export const WishList = () => {
  const navigate =useNavigate()
  const { wishlist, wishlistItem, setWishlistItem ,setWishlist} =
    useContext(wishListContext);
    const {addedToCartList,setAddedToCartList} = useContext(cartContext);
  const token = localStorage.getItem("Encodedtoken");

  const getWishListItem = async () => {
    const response = await fetch("/api/user/wishlist", {
      method: "GET",
      headers: {
        authorization: `"${token}"`,
      },
    });
    const wishListProduct = await response.json();
    // console.log("wishlist",await response.json())
    setWishlistItem(wishListProduct.wishlist);
  };
  useEffect(() => {
    getWishListItem();
  }, [wishlist]);

  const handleToggleWishlist = (productItem) => {
    const updatedWishlist = wishlist.filter((item) => item !== productItem._id);
    setWishlist([...updatedWishlist]);
    RemoveFromWishList(productItem._id)
    toast.warn(`${productItem.title} removed from wishlist!`, {
      position: toast.POSITION.TOP_RIGHT
    });
  
};
  const CartBtnHandle = (productItem) =>{
    let CardProduct = { product:productItem}
    if(!addedToCartList.includes(productItem._id)){
      AddToCart(CardProduct)
      setAddedToCartList([...addedToCartList,productItem._id])
    }else{
      navigate('/cart')
    }

  }

  console.log("wishlist",wishlistItem)
  return (
    <div>
      <p>WishList Page</p>
      <div>
        {wishlistItem.length>0 && wishlistItem.map(wishListProduct => (
          <div>
            {wishListProduct.title}
            <button
            onClick={() => handleToggleWishlist(wishListProduct)}
                  className={wishlist.includes(wishListProduct._id) ? 'wishlist-button active' : 'wishlist-button'}
                >
                  {wishlist.includes(wishListProduct._id) ? 'Remove from Wishlist' :'Remove from WishList' }
                </button>
            <button onClick={() => CartBtnHandle(wishListProduct)} >{addedToCartList.includes(wishListProduct._id) ? 'Go To Cart' : 'Add To Cart' }</button>
          </div>
        ))}
      </div>
    </div>
  );
};
