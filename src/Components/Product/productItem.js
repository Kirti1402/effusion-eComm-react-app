import { useContext, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

import { ProductCategoryContext } from "../../Context/ProductCategoryContext";
import { ProductListingcontext } from "../../Context/ProductListContext";
import { cartContext } from "../../Context/CartContext";
import { AddToCart } from "../Cart/AddToCart";
import { wishListContext } from "../../Context/wishListContext";
import { addWishList } from "../WishList/AddWishlist";
import "./Product.css";
import {  toast } from 'react-toastify';
import { RemoveFromWishList } from "../WishList/RemoveWishList";
import { LoginAuthContext } from "../../Context/LoginAuthContext";



export const ProductItem = () => {
  const navigate = useNavigate();
  const {addedToCartList,setAddedToCartList} = useContext(cartContext);
  const {wishlist, setWishlist} = useContext(wishListContext);
  const {isLoggedIn} = useContext(LoginAuthContext);

  const ratingNumber = [1, 2, 3, 4, 5];
  const {
    productList,
    selectedRadioFilter,
    setselectedRadioFilter,
    searchQuery,
    setProductId,
    storeProductId,
  } = useContext(ProductListingcontext);
  const { category } = useContext(ProductCategoryContext);
  // new array to store unique size from product object
  const uniqueSize = [
    ...new Set(productList && productList.map(({ size }) => size)),
  ];
  //local states
  const [sizes, setSizes] = useState([]);
  const [rating, setRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("ascending");

  //settingSelectedRadioValue
  const handleFilterChange = (event) => {
    setselectedRadioFilter(event.target.value);
  };
  //checkboxHandle
  const handleSizeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSizes([...sizes, value]); // Add the size to the array
    } else {
      setSizes(sizes && sizes.filter((size) => size !== value)); // Remove the size from the array
    }
  };

  //handleRating
  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  //sortingPrice
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  //storing productiD for product detail page
  const productOnClickHandle = (id) => {
    console.log("id", id);
    setProductId(id);
    // getProductDetail()
    console.log("ProductID ProductItem", storeProductId);
  };
  //implemented filter logic
  const filteredProducts =
    productList &&
    productList
      .filter((product) => {
        const isGenderMatched =
          selectedRadioFilter === "" ||
          product.categoryName === selectedRadioFilter;
        const isSizeMatched =
          sizes.length === 0 || sizes.includes(product.size);
        const isRatingMatched = rating === 0 || product.rating >= rating;
        const isSearchMatched =
          searchQuery === "" ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase());
        return (
          isGenderMatched && isSizeMatched && isRatingMatched && isSearchMatched
        );
      })
      .sort((a, b) => {
        if (sortOrder === "ascending") {
          return a.price - b.price;
        } else if (sortOrder === "descending") {
          return b.price - a.price;
        }
        return 0;
      });

  //storing length for validating and rendering the item
  const filterProductLength = filteredProducts && filteredProducts.length;

  const CartBtnHandle = (productItem) =>{
    let CardProduct = { product:productItem}
    if(!addedToCartList.includes(productItem._id)){
      AddToCart(CardProduct)
      setAddedToCartList([...addedToCartList,productItem._id])
      toast.success(`${productItem.title} added to cart!`, {
        position: toast.POSITION.TOP_RIGHT
      });
    }else{
      navigate('/cart')
    }

   
  }

  const handleToggleWishlist = (productItem) => {
    let wishListProduct = { product:productItem}
    if(isLoggedIn){
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
    }else{
      toast.error("Please Login", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

   
  };

  return (
    <div className="product-page-container">
      <div className="filter-container">
        <div>
          {category &&
            category.map(({ id, categoryName }) => (
              <label key={id}>
                <input
                  type="radio"
                  name="categoryfilter"
                  value={categoryName}
                  onChange={handleFilterChange}
                  checked={selectedRadioFilter === categoryName}
                />
                {categoryName}
              </label>
            ))}
        </div>
        <div>
          <label>
            Sort Order:
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="ascending">Price: Low-to-High</option>
              <option value="descending">Price: High-to-Low</option>
            </select>
          </label>
        </div>
        <div>
          {uniqueSize &&
            uniqueSize.map((size) => (
              <label>
                <input
                  type="checkbox"
                  name="size"
                  value={size}
                  checked={sizes.includes(size)}
                  onChange={handleSizeChange}
                />
                {size}
              </label>
            ))}
        </div>

        <div>
          {ratingNumber &&
            ratingNumber.map((ratingnum) => (
              <label>
                <input
                  type="radio"
                  name="rating"
                  value={ratingnum}
                  onChange={handleRatingChange}
                />
                {ratingnum} & above
              </label>
            ))}
        </div>
      </div>

      <aside className="product-container">
        {filterProductLength ? (
          filteredProducts.map((productItem) => {
            console.log(productItem._id);
            const {
              _id,
              id,
              url,
              title,
              description,
              rating,
              price,
              discount,
              size,
            } = productItem;
            return (

                <div className="card-container" key={id}>
                  <div className="card-detail">
                  <Link
                    to="/productDetail"
                    onClick={() => productOnClickHandle(productItem._id)}
                  >
                    <img src={url}/>
                    <div>
                    <p>{title}</p>
                    <p>{description}</p>
                    <p>{rating}</p>
                    <p><span>{ price -(price *(discount/100)) }</span><span style={{textDecoration:'line-through'}}>{price}</span></p>
                    <p>{discount}% Off</p>
                    </div>
                  </Link>
                  <div>
                  <button
                  onClick={() => handleToggleWishlist(productItem)}
                  className={wishlist.includes(_id) ? 'wishlist-button active' : 'wishlist-button'}
                >
                  {wishlist.includes(_id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
                  </div>
                  <button  className="cart-btn active" onClick={() => CartBtnHandle(productItem)}>
                   {addedToCartList.includes(_id) ? 'Go To Cart' : 'Add To Cart' }
                  </button>
                  </div>
                </div>
            );
          })
        ) : (
          <p>No Product found</p>
        )}
      </aside>
    </div>
  );
};
