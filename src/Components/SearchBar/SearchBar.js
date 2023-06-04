import React from "react";
import { useContext,useState } from "react";
import { ProductListingcontext } from "../../Context/ProductListContext";
import styles from "./SearchBar.css"
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { productList ,searchQuery, setSearchQuery} = useContext(ProductListingcontext);
const navigate =useNavigate()
  const searchHandle = (e) =>{
    navigate("/product")
    setSearchQuery(e.target.value)
  }

  return <div>
  Search:
  <input  
          type="text"
          className={styles.textbox}
          placeholder="Search data..."
          value={searchQuery}
          onChange={searchHandle}
        />
</div>;
}