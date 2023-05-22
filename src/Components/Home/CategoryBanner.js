import { useContext } from "react";

import {ProductCategoryContext} from "../../Context/ProductCategoryContext"

export const CategoryBanner = () =>{
    const {category,isLoading} = useContext(ProductCategoryContext);
    console.log(category)

    return <section>
        {isLoading ? <div>Loading...</div> 
        :
        category.map(categoryItem =>
            {  const {id,categoryName,description} = categoryItem
            return <div key={id}>
                <p>{categoryName}</p> 
                <p>{description}</p>
            </div>})
        }
 

    </section>
   
}