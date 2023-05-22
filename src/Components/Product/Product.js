import { useContext } from "react";
import { ProductListingcontext } from "../../Context/ProductListContext";

import { ProductItem } from "./productItem";
import { Loader } from "../Loader/Loader";
import { FilterCategory } from "../FilterCategory/FilterCategory";

export const Product = () => {
  const { isLoading } = useContext(ProductListingcontext);
  return (
    <div>
      <p>Product Page</p>
      <FilterCategory />
      {isLoading ? <Loader /> : <ProductItem />}
    </div>
  );
};
