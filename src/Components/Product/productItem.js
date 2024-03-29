import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ProductCategoryContext } from "../../Context/ProductCategoryContext";
import { ProductListingcontext } from "../../Context/ProductListContext";
import { cartContext } from "../../Context/CartContext";
import { AddToCart } from "../Cart/AddToCart";
import { wishListContext } from "../../Context/wishListContext";
import { addWishList } from "../WishList/AddWishlist";
import { RemoveFromWishList } from "../WishList/RemoveWishList";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import "./Product.css";

export const ProductItem = () => {
  const navigate = useNavigate();
  const { addedToCartList, setAddedToCartList } = useContext(cartContext);
  const { wishlist, setWishlist } = useContext(wishListContext);
  const { isLoggedIn } = useContext(LoginAuthContext);
  const [max, setMax] = useState(2000);
  const [maxValue, setMaxValue] = useState(2000);
  const ratingNumber = [1, 2, 3, 4, 5];
  const {
    productList,
    selectedRadioFilter,
    setselectedRadioFilter,
    searchQuery,
    setSearchQuery,
    setProductId,
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
    setProductId(id);
  };
  console.log("productlist",productList);
  let discountedPrice = productList &&  productList.map(product =>{

    const discountedProduct = { ...product };
    const discountPercentage = product.discount / 100;
  const discountedAmount = product.price * discountPercentage;
  discountedProduct.discountedPrice = product.price - discountedAmount;
  
  return discountedProduct;

  })

  //implemented filter logic
  let filteredProducts =
  discountedPrice &&
  discountedPrice
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
        const isPriceRangeMatch =  product.discountedPrice >0 && product.discountedPrice <= maxValue
        return (
          isGenderMatched && isSizeMatched && isRatingMatched && isSearchMatched && isPriceRangeMatch
        );
      })
      .sort((a, b) => {
        if (sortOrder === "ascending") {
          return (
            a.price -
            a.price * (a.discount / 100) -
            (b.price - b.price * (b.discount / 100))
          );
        } else if (sortOrder === "descending") {
          return (
            b.price -
            b.price * (b.discount / 100) -
            (a.price - a.price * (a.discount / 100))
          );
        }
        return 0;
      });

  //storing length for validating and rendering the item
  const filterProductLength = filteredProducts && filteredProducts.length;

  const CartBtnHandle = (productItem) => {
    let CardProduct = { product: productItem };
    if (isLoggedIn) {
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
    } else {
      toast.error("Please Login!!!", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
    }
  };

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
      toast.error("Please Login!!!", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
    }
  };

  const onClickHandleClearFilter = () => {
    setselectedRadioFilter("");
    setSizes("");
    setRating(0);
    setSearchQuery("");
    setMaxValue(2000);
  };


  const handleRangeChange = (event) => {

    const {  value } = event.target;

    setMaxValue(Number(value));
  };


  return (
    <>
      <div className="product-page-container">
        <div className="filter-container">
          <p className="text-product">
            {filterProductLength === (productList && productList.length) ? (
              "Showing All Product"
            ) : (
              <span>Product found : {filterProductLength}</span>
            )}
          </p>
          <div className="clear-filter">
            <p>Filter</p>
            <button
              className="clear-filter-btn"
              onClick={onClickHandleClearFilter}
            >
              Clear Filter
            </button>
          </div>
          <div className="category-filter">
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
          <div className="price-range-filter">
            {/* <p>Price:</p> */}
          <label>
          Price
        <input
          type="range"
          name="max"
          min="0"
          max={max}
          value={maxValue}
          onChange={(event) => handleRangeChange(event)}
        />
       <span>&#8377; {maxValue}</span> 
      </label>
          </div>
          <div className="sorting-filter">
            <label>
              Sort Order:
              <select value={sortOrder} onChange={handleSortChange}>
                <option value="ascending">Price: Low-to-High</option>
                <option value="descending">Price: High-to-Low</option>
              </select>
            </label>
          </div>
          <div className="size-filter">
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
          <div className="rating-filter">
            {ratingNumber &&
              ratingNumber.map((ratingnum) => (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingnum}
                    onChange={handleRatingChange}
                    checked={rating === ratingnum}
                  />
                  {ratingnum} & above
                </label>
              ))}
          </div>
        </div>
        <aside className="product-container">
          {filterProductLength ? (
            filteredProducts.map((productItem) => {
              const { _id, id, url, title, rating, price, discount } =
                productItem;

              let discountedPrice = Math.ceil(price - price * (discount / 100));
              return (
                <div className="card-container" key={id}>
                  <div className="card-detail-container">
                    <Link
                      className="link-product"
                      to="/productDetail"
                      onClick={() => productOnClickHandle(productItem._id)}
                    >
                      <div className="image-conatiner">
                        <img src={url} />
                        <div className="rating-container">
                          <span className="star">&#9733;</span>
                          <p className="rating">{rating}</p>
                        </div>
                      </div>
                      <div className="card-detail">
                        <p>{title}</p>
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
                              {price}
                            </span>
                          </div>
                          <div>
                            <span>{discount}% Off</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="wishList-container">
                      <button
                        onClick={() => handleToggleWishlist(productItem)}
                        className={
                          wishlist.includes(_id)
                            ? "wishlist-button-added"
                            : "wishlist-button-remove"
                        }
                      ></button>
                    </div>
                    <button
                      className={
                        addedToCartList.includes(_id)
                          ? "GoToCart-btn"
                          : "AddToCartBtn"
                      }
                      onClick={() => CartBtnHandle(productItem)}
                    >
                      {addedToCartList.includes(_id)
                        ? "Go To Cart"
                        : "Add To Cart"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="product-not-found">No Product found</p>
          )}
        </aside>
      </div>
    </>
  );
};
