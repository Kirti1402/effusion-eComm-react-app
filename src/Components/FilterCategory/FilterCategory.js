import { useContext,useState } from "react"
import {ProductListingcontext} from "../../Context/ProductListContext"
import { ProductCategoryContext } from "../../Context/ProductCategoryContext"


export const FilterCategory = () => {
    const {filterCategory,setFilterCategory,selectedRadioFilter,
        setselectedRadioFilter,productList} = useContext(ProductListingcontext)
        const { category } = useContext(ProductCategoryContext);
        const handleFilterChange = (event)=>{
            const value = event.target.value;
            setselectedRadioFilter(value);
            setFilterCategory(productList.filter(({categoryName})=> categoryName === value))
            // console.log("eventValue",value,"SelectedRadioValye",selectedRadioFilter,"PrdouctList",productList,"filterCategory",filterCategory)
        }


    return <div>
        <p>Filter</p>
        <div className="category-filter">
            {category && category.map(({id,categoryName}) => 
            <label key={id} >
                <input type="radio" name='categoryfilter' value={categoryName}   onChange={handleFilterChange} checked={selectedRadioFilter === categoryName} />{categoryName}
            </label>)}
        </div>
        
    </div>

}
