import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { ProductListingcontext } from "../../Context/ProductListContext";
import "./SearchBar.css"

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(ProductListingcontext);
  const navigate = useNavigate();
  const searchHandle = (e) => {
    navigate("/product");
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <label>
        Search:
        <input
        className="searchbar-input"
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={searchHandle}
        />
      </label>
    </div>
  );
}
