import {ProductListingcontext} from "../../Context/ProductListContext"

import { useContext } from "react"

import "./Product.css"
import { FilterCategory } from "../FilterCategory/FilterCategory"

export const ProductItem = ()=>{
    const {filterCategory,productList,isLoading} = useContext(ProductListingcontext)
    console.log("productitem",productList)
    return(
        <aside>
            
            {filterCategory && filterCategory.map(productItem =>{
                const {id,title,description,rating,rated,price,discount,categoryName} = productItem
                return <div className="card-container" key={id}>
                    <p>{title}</p>
                    <p>{description}</p>
                    <button>Add to Cart</button>
                </div>
            })}
        </aside>
    )
}