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
  const [sortOrder, setSortOrder] = useState('ascending');
  const [searchQuery, setSearchQuery] = useState('');
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

  //sortingPrice
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  //searching
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = productList.filter((product) => {
    const isGenderMatched =
      selectedRadioFilter === "" ||
      product.categoryName === selectedRadioFilter;
    const isSizeMatched = sizes.length === 0 || sizes.includes(product.size);
    const isRatingMatched = rating === 0 || product.rating >= rating;
    const isSearchMatched =
        searchQuery === '' || product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return isGenderMatched && isSizeMatched && isRatingMatched && isSearchMatched;
  }).sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.price - b.price;
    } else if (sortOrder === 'descending') {
      return b.price - a.price;
    }
    return 0;
  });;
  const filterProductLength = filteredProducts.length;

  console.log("filteredProducts", filteredProducts);

  return (
    <div>
      <div>
        <label>
          Search:
          <input type="text" value={searchQuery} onChange={handleSearchChange} />
        </label>
      </div>
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
              size
            } = productItem;
            return (
              <div className="card-container" key={id}>
                <p>{title}</p>
                <p>{description}</p>
                <p>{price}</p>
                <p>{rating}</p>
                <p>{categoryName}</p>
                <p>{size}</p>
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
