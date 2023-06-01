import { useContext ,useEffect} from "react";
import { wishListContext } from "../../Context/wishListContext";

export const WishList = () => {
  const { wishlist, setWishlist, wishlistItem, setWishlistItem } =
    useContext(wishListContext);
  const token = localStorage.getItem("Encodedtoken");
  const getWishListItem = async () => {
    const response = await fetch("/api/user/wishlist", {
      method: "GET",
      headers: {
        authorization: `"${token}"`, // Assuming 'token' holds the actual token value
      },
    });
    // const wishList = await response.json();
    console.log("wishlist",await response.json())
    // setWishlistItem(cartProduct.cart);
  };
  useEffect(() => {
    getWishListItem();
  }, []);
  console.log(wishlist);
  return (
    <div>
      <p>WishList Page</p>
      {wishlist.map((item) => (
        <p>{item}</p>
      ))}
    </div>
  );
};
