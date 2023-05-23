import React from "react";
import { useContext,useState } from "react";
import { ProductListingcontext } from "../../Context/ProductListContext";
import styles from "./SearchBar.css"
import Result from "./Result";

export default function SearchBar() {
  const { productList ,searchQuery, setSearchQuery} = useContext(ProductListingcontext);
  const [suggestions, setSuggestions] = useState([])
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [result, setResult] = useState(null);

  const findResult = (title) => {
    setResult(suggestions.find((suggestion) => suggestion.title === title));
  };

  return <div>
  Search:
  <input
          onFocus={() => setHideSuggestions(false)}
          onBlur={async () => {
            setTimeout(() => {
              setHideSuggestions(true);
            }, 200);
          }}
          type="text"
          className={styles.textbox}
          placeholder="Search data..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
 <div
          className={`${styles.suggestions} ${
            hideSuggestions && styles.hidden
          }`}
        >
          {productList && productList.map((suggestion) => (
            <div
              className={styles.suggestion}
              onClick={() => findResult(suggestion.title)}
            >
              {productList.title}
            </div>
          ))}
        </div>
        {result && <Result {...result} />}

</div>;
}