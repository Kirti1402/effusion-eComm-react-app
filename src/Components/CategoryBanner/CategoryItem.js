import React, { useState, useContext } from "react";
import "./Banner.css";
import { ProductListingcontext } from "../../Context/ProductListContext";
import { useNavigate } from "react-router-dom";

import { ProductCategoryContext } from "../../Context/ProductCategoryContext";

export const CategoryBanner = () => {
  const { category, isLoading } = useContext(ProductCategoryContext);
  console.log(category);
  const navigate = useNavigate();
  const { setselectedRadioFilter } = useContext(ProductListingcontext);

  const handleCategoryWiseShopBtn = (e) => {
    console.log(e.target.value);
    setselectedRadioFilter(e.target.value);
    navigate("/product");
  };
  return (
    <section>
      {!isLoading && (
        <div className="banner-container">
          {category.map((categoryItem) => {
            const { id, categoryName, url } = categoryItem;
            console.log("url", url);
            return (
              <div>
                <div>
                  <img src={url} alt={categoryName} />
                </div>
                <p>{categoryName}</p>
                <button
                  value={categoryName}
                  onClick={handleCategoryWiseShopBtn}
                >
                  Shop
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
