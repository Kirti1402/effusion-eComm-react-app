import { createContext, useEffect } from "react";

export const ProductListingcontext = createContext()

export const ProductListProvider = ({children})=>{

    const [productList, setProductList] = useState()

    const getProductData = async () => {
        
        const product = await fetch('/api/products',{
            method: "GET",
        })

        console.log(await product.json())

    }
    useEffect(()=>{
        getProductData
    },[])

    return <ProductListingcontext.Provider
    value={{productList}}>
        {children}
    </ProductListingcontext.Provider>
}