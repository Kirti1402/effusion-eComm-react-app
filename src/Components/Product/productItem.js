import { useContext, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

import { ProductCategoryContext } from "../../Context/ProductCategoryContext";
import { ProductListingcontext } from "../../Context/ProductListContext";
import { cartContext } from "../../Context/CartContext";
import { AddToCart } from "../Cart/AddToCart";
import { wishListContext } from "../../Context/wishListContext";

import "./Product.css";
import {  toast } from 'react-toastify';


export const ProductItem = () => {
  const navigate = useNavigate();
  const {addedToCartList,setAddedToCartList} = useContext(cartContext);
  const {wishlist, setWishlist,isInWishlist, setIsInWishlist} = useContext(wishListContext);

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

  const CartBtnHandle = (productItem,event) =>{

    let CardProduct = { product:productItem}
    console.log("bool",(!addedToCartList.includes(productItem._id)))
    if(!addedToCartList.includes(productItem._id)){
      AddToCart(CardProduct)
      setAddedToCartList([...addedToCartList,productItem._id])
    }else{
      navigate('/cart')
    }

    toast.success('Item added to cart!', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const handleToggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      const updatedWishlist = wishlist.filter((item) => item !== productId);
      setWishlist(updatedWishlist);
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <div>
      <div>
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

      <aside>
        {filterProductLength ? (
          filteredProducts.map((productItem) => {
            console.log(productItem._id);
            const {
              _id,
              id,
              title,
              description,
              rating,
              price,
              categoryName,
              size,
            } = productItem;
            return (
              <div>
                <div className="card-container" key={id}>
                  <Link
                    to="/productDetail"
                    onClick={() => productOnClickHandle(productItem._id)}
                  >
                    <p>{title}</p>
                    <p>{description}</p>
                  </Link>
                  <p>{price}</p>
                  <p>{rating}</p>
                  <p>{categoryName}</p>
                  <p>{size}</p>

                  <div>
                  <button
                  onClick={() => handleToggleWishlist(_id)}
                  className={wishlist.includes(_id) ? 'wishlist-button active' : 'wishlist-button'}
                >
                  {wishlist.includes(_id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
                  </div>
                  <button onClick={() => CartBtnHandle(productItem)}>
                   {addedToCartList.includes(productItem._id) ? 'Go To Cart' : 'Add To Cart' }
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
