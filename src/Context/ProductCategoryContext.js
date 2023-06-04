import { createContext, useEffect, useState } from "react";

export const ProductCategoryContext = createContext();

export const ProductCategoryProvider = ({children}) => {

    const [category, setCategory] = useState()
    const [isLoading,setIsLoading] = useState(true)

    const getCategory = async () => {
        const category = await fetch('/api/categories',{
            method: "GET",
        });

        const response = await category.json();
        console.log(response.categories)
        setCategory(response.categories)
        setIsLoading(false)
        // console.log("Category",await category.json())
    }

    useEffect(() => {
        getCategory()
    },[])

    return (
        <ProductCategoryContext.Provider
        value={{category,isLoading}}>
            {children}
        </ProductCategoryContext.Provider>
    )
}