import { createContext, useEffect, useState } from "react";

export const ProductListingcontext = createContext();

export const ProductListProvider = ({ children }) => {
  const [selectedRadioFilter, setselectedRadioFilter] = useState('');
  const [productList, setProductList] = useState();
  const [isLoading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [storeProductId,setProductId] = useState(0);
  const [storeProductDetail,setProductDetail] = useState({});

  const getProductData = async () => {
    const response = await fetch("/api/products", {
      method: "GET",
    });
    const productData = await response.json();
    setLoading(false);
    setProductList(productData.products);
    setFilterCategory(productData.products);
  };

  



  useEffect(() => {
    getProductData();
  }, []);

  return (
    <ProductListingcontext.Provider
      value={{
        searchQuery, 
        setSearchQuery,
        productList,
        isLoading,
        filterCategory,
        setFilterCategory,
        selectedRadioFilter,
        setselectedRadioFilter,
        storeProductId,
        setProductId,
        storeProductDetail,
        setProductDetail,
        // getProductDetail
      }}
    >
      {children}
    </ProductListingcontext.Provider>
  );
};
