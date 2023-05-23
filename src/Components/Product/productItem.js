import { ProductListingcontext } from "../../Context/ProductListContext";
import { ProductCategoryContext } from "../../Context/ProductCategoryContext";

import { useContext, useEffect, useState } from "react";

import "./Product.css";

export const ProductItem = () => {
  const ratingNumber = [1, 2, 3, 4, 5];
  const {
    filterCategory,
    productList,
    selectedRadioFilter,
    setFilterCategory,
    setselectedRadioFilter,
  } = useContext(ProductListingcontext);
  const { category } = useContext(ProductCategoryContext);

  const uniqueSize = [...new Set(productList.map(({size})=> size))]

  const [sizes, setSizes] = useState([]);
  const [rating, setRating] = useState(0);
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
      setSizes(sizes.filter((size) => size !== value)); // Remove the size from the array
    }
  };

  //handleRating
  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const filteredProducts = productList.filter((product) => {
    const isGenderMatched =
      selectedRadioFilter === "" ||
      product.categoryName === selectedRadioFilter;
    const isSizeMatched = sizes.length === 0 || sizes.includes(product.size);
    const isRatingMatched = rating === 0 || product.rating >= rating;
    return isGenderMatched && isSizeMatched && isRatingMatched;
  });
  const filterProductLength = filteredProducts.length;

  console.log("filteredProducts", filteredProducts);

  return (
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
            {uniqueSize.map(size =>
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
            )}
      </div>

      <div>
        {ratingNumber.map((ratingnum) => (
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

      <aside>
        {filterProductLength ?
          filteredProducts.map((productItem) => {
            const {
              id,
              title,
              description,
              rating,
              rated,
              price,
              discount,
              categoryName,
            } = productItem;
            return (
              <div className="card-container" key={id}>
                <p>{title}</p>
                <p>{description}</p>
                <button>Add to Cart</button>
              </div>
            );
          })
          :<p>No Product found</p>
        }
      </aside>
    </div>
  );
};
