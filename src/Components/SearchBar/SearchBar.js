import React from "react";
import { useContext,useState } from "react";
import { ProductListingcontext } from "../../Context/ProductListContext";
import styles from "./SearchBar.css"

export default function SearchBar() {
  const { productList ,searchQuery, setSearchQuery} = useContext(ProductListingcontext);
  const [suggestions, setSuggestions] = useState([])
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [result, setResult] = useState(null);
  const handleSearchChange = (event) => {
    console.log("searchQuery",event.target.value)
    
    setSearchQuery(event.target.value);
  };
//   const findResult = (title) => {
//     setResult(suggestions.find((suggestion) => suggestion.title === title));
//   };
  const filteredProducts = productList && productList.filter((product) =>

    {   console.log("searcg",searchQuery,"pT",product.title)
        console.log("bool",product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        return product.title.toLowerCase().includes(searchQuery.toLowerCase())}
  );

  return <div>
  Search:
  <input
   onFocus={() => setHideSuggestions(false)}
   onBlur={async () => {
    setTimeout(() => {
      setHideSuggestions(true);
    }, 200);
  }}
    className={styles.textbox}
    type="text"
    value={searchQuery}
    onChange={handleSearchChange}
    // className="search-input"
  />
 <ul className="product-list">
        {filteredProducts && filteredProducts.map((product) => (
          <li key={product.id} className="product-item">
            {product.title}
          </li>
        ))}
      </ul>

</div>;
}
