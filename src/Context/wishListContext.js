import { createContext,useState } from "react";

export const  wishListContext = createContext()

export  const WishListProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState(false);

    return <wishListContext.Provider 
    value={{wishlist, setWishlist,isInWishlist, setIsInWishlist}}
    >
        {children}
    </wishListContext.Provider>
}