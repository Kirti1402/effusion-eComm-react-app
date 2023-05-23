import {useContext, useEffect,useState} from 'react'
import { ProductListingcontext } from "../../Context/ProductListContext";


const ProductDetail =() => {
  const {
    storeProductId

  } = useContext(ProductListingcontext);
  const [storeProductDetail,setProductDetail] = useState({});

  const getProductDetail = async () => {
    console.log("productId",storeProductId)
    const response = await fetch(`/api/products/${storeProductId}`,{
      method: "GET",
    });
    const productIndivialData = await response.json();
    setProductDetail(productIndivialData.product);
  }
  useEffect(() => {
    getProductDetail()
  },[])


  console.log("store",storeProductDetail)
  return (
    <div>ProductDetail
      {storeProductDetail && <div>
        <p>{storeProductDetail.title}</p>
        <p>{storeProductDetail.size}</p>
        <p>{storeProductDetail.rating}</p>
        </div>}
    
    </div>
    
  )
}

export default ProductDetail