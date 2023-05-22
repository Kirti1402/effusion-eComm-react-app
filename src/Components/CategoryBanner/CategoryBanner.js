import React, { useState ,useContext} from 'react';
import './Banner.css';
import { ProductListingcontext } from '../../Context/ProductListContext';
import {useNavigate} from "react-router-dom";

const Banner = ({ categoryName, description,url }) => {
    const navigate = useNavigate();
    const {selectedRadioFilter,
        setselectedRadioFilter} = useContext(ProductListingcontext)
  const [expanded, setExpanded] = useState(false);
  console.log("url",url)

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const handleCategoryWiseShopBtn = (e) =>{
    console.log(e.target.value)
    setselectedRadioFilter(e.target.value)
    navigate("/product")

  }
  return (
    <div
      className={`banner ${expanded ? 'expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        
      <p>{categoryName}</p>
      {expanded && <div><p>{description}</p>
      <button value = {categoryName} onClick={handleCategoryWiseShopBtn}>Shop</button>
      </div>}

    </div>
  );
};

export default Banner;
