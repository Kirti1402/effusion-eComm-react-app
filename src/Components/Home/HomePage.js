
import { useContext } from "react";
import { CategoryBanner } from "./CategoryBanner";
import {ProductCategoryContext} from "../../Context/ProductCategoryContext"
import { Loader } from "../Loader/Loader";


export const Home = () => {
  const {isLoading} = useContext(ProductCategoryContext);
  return (
    <div>
      {isLoading ? <Loader/>:<CategoryBanner/>}
    </div>
  );
};
