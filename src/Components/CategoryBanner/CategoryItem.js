import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Banner.css";
import { ProductListingcontext } from "../../Context/ProductListContext";
import { ProductCategoryContext } from "../../Context/ProductCategoryContext";

export const CategoryBanner = () => {
  const { category, isLoading } = useContext(ProductCategoryContext);
  const navigate = useNavigate();
  const { setselectedRadioFilter } = useContext(ProductListingcontext);

  const handleCategoryWiseShopBtn = (e) => {
    setselectedRadioFilter(e.target.value);
    navigate("/product");
  };
  return (
    <section>
      <h3 className="home-header">Shop By Category</h3>
      {!isLoading && (
        <div className="banner-container">
          {category.map((categoryItem) => {
            const { id, categoryName, url } = categoryItem;
            return (
              <div key={id}>
                <div className="category-images">
                  <img src={url} alt={categoryName} />
                </div>
                <div className="category-name">
                  <p className="category-text">{categoryName}</p>
                </div>
                <div className="category-shop-btn">
                  <button
                    value={categoryName}
                    onClick={handleCategoryWiseShopBtn}
                  >
                    Shop
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button className="shop-all" onClick={() => navigate("/product")}>
        Explore
      </button>
    </section>
  );
};
