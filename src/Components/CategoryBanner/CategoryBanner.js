import React, { useState } from 'react';
import './Banner.css';

const Banner = ({ categoryName, description,url }) => {
  const [expanded, setExpanded] = useState(false);
  console.log("url",url)

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <div
      className={`banner ${expanded ? 'expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        
      <p>{categoryName}</p>
      {expanded && <div><p>{description}</p>
      <button>Shop</button>
      </div>}

    </div>
  );
};

export default Banner;
