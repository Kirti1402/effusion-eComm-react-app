import { useContext } from "react";

import { ProductCategoryContext } from "../../Context/ProductCategoryContext";
import Banner from "./CategoryBanner";

export const CategoryBanner = () => {
  const { category, isLoading } = useContext(ProductCategoryContext);
  console.log(category);

  return (
    <section>
      {!isLoading && (
        <div className="banner-container">
          {category.map((categoryItem) => {
            const { id, categoryName, description,url } = categoryItem;
            console.log(url)
            return (
              <Banner
                key={id}
                categoryName={categoryName}
                description={description}
                image = {url}
              />
            );
          })}
          
        </div>
      )}
    </section>
  );
};
