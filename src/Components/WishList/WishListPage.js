import { useContext } from "react";
import { wishListContext } from "../../Context/wishListContext";


export const WishList = () => {
    const {wishlist, setWishlist,isInWishlist, setIsInWishlist} = useContext(wishListContext);
    console.log(wishlist)
    return (
        <div>
            <p>WishList Page</p> 
            {wishlist.map(item=> <p>{item}</p>)}  
                    
        </div>
    )
}