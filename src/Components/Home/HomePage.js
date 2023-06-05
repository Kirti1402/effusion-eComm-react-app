import { useContext } from "react";

import { CategoryBanner } from "../CategoryBanner/CategoryItem";
import { ProductCategoryContext } from "../../Context/ProductCategoryContext";
import { Loader } from "../Loader/Loader";
import Footer from "./Footer";

export const Home = () => {
  const { isLoading } = useContext(ProductCategoryContext);
  return (
    <div>
      {isLoading ? <Loader /> : <CategoryBanner />}
      <Footer />
    </div>
  );
};
