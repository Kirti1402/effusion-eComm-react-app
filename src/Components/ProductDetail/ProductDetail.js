import { useContext, useEffect, useState } from "react";
import { ProductListingcontext } from "../../Context/ProductListContext";
import "./productDetail.css";
import { Loader } from "../Loader/Loader";
import { wishListContext } from "../../Context/wishListContext";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { toast } from "react-toastify";
import { addWishList } from "../WishList/AddWishlist";
import { RemoveFromWishList } from "../WishList/RemoveWishList";
import { cartContext } from "../../Context/CartContext";
import { AddToCart } from "../Cart/AddToCart";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(LoginAuthContext);
  const { addedToCartList, setAddedToCartList } = useContext(cartContext);
  const { wishlist, setWishlist } = useContext(wishListContext);
  const { storeProductId } = useContext(ProductListingcontext);
  //localstate
  const [storeProductDetail, setProductDetail] = useState({});
  let discountedPrice = Math.ceil(
    storeProductDetail.price -
      storeProductDetail.price * (storeProductDetail.discount / 100)
  );
  //method to get productdetail from api
  const getProductDetail = async () => {
    console.log("productId", storeProductId);
    const response = await fetch(`/api/products/${storeProductId}`, {
      method: "GET",
    });
    const productIndivialData = await response.json();
    setProductDetail(productIndivialData.product);
  };

  useEffect(() => {
    getProductDetail();
  }, []);
  const handleToggleWishlist = (productItem) => {
    let wishListProduct = { product: productItem };
    if (isLoggedIn) {
      if (wishlist.includes(productItem._id)) {
        const updatedWishlist = wishlist.filter(
          (item) => item !== productItem._id
        );
        setWishlist(updatedWishlist);
        RemoveFromWishList(productItem._id);
        toast.warn(`${productItem.title} removed from wishlist!`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 1000,
        });
      } else {
        addWishList(wishListProduct);
        setWishlist([...wishlist, productItem._id]);
        toast.success(`${productItem.title} added to wishlist!`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 1000,
        });
      }
    } else {
      toast.error("Please Login", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
    }
  };
  const CartBtnHandle = (productItem) => {
    let CardProduct = { product: productItem };
    if(isLoggedIn){
      if (!addedToCartList.includes(productItem._id)) {
        AddToCart(CardProduct);
        setAddedToCartList([...addedToCartList, productItem._id]);
        toast.success(`${productItem.title} added to cart!`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 1000,
        });
      } else {
        navigate("/cart");
      }
    } else{
      toast.error("Please Login!!!", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
    }
    
  };


  return (
    <div className="productDetail-container">
      {storeProductDetail.title !== undefined ? (
        <div class="card">
          <div class="card-image">
            <img src={storeProductDetail.url} alt="Image" />
            <div className="product-detail-rating-container">
                        <span className="star">&#9733;</span>
                        <p className="rating">{storeProductDetail.rating}</p>
                      </div>
                      <div className="size-container">
                        <p className="rating">{storeProductDetail.size}</p>
                      </div>
          </div>
          <div class="card-details">
            <h2>{storeProductDetail.title}</h2>
            <p>{storeProductDetail.description}</p>
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
                  {storeProductDetail.price}
                </span>
              </div>
              <div>
                <span>{storeProductDetail.discount}% Off</span>
              </div>
            </div>
            <button
            className="product-detail-cart-btn"
            onClick={() => CartBtnHandle(storeProductDetail)}
          >
            {addedToCartList.includes(storeProductDetail._id) ? "Go To Cart" : "Add To Cart"}
          </button>
          </div>
          <div className="wishList-container">
            <button
              onClick={() => handleToggleWishlist(storeProductDetail)}
              className={
                wishlist.includes(storeProductDetail._id)
                  ? "wishlist-button-added"
                  : "wishlist-button-remove"
              }
            ></button>
          </div>
          

          
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductDetail;
