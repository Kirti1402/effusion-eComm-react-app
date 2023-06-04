import { useContext, useEffect, useState } from "react";
import { ProductListingcontext } from "../../Context/ProductListContext";
import "./productDetail.css"
import { Loader } from "../Loader/Loader";

const ProductDetail = () => {
  const { storeProductId } = useContext(ProductListingcontext);
  //localstate
  const [storeProductDetail, setProductDetail] = useState({});
  //method to get productdetail from api
  const getProductDetail = async () => {
    console.log("productId", storeProductId);
    const response = await fetch(`/api/products/${storeProductId}`, {
      method: "GET",
    });
    const productIndivialData = await response.json();
    setProductDetail(productIndivialData.product);
  };

  useEffect(() => {
    getProductDetail();
  }, []);
  console.log("store",storeProductDetail.title)
 let discountedPrice = Math.ceil((storeProductDetail.price - storeProductDetail.price * (storeProductDetail.discount / 100)))

  return (
    <div className="productDetail-container">
      {(storeProductDetail.title !== undefined ) ? (
       <div class="card">
       <div class="card-image">
         <img src={storeProductDetail.url} alt="Image" />
       </div>
       <div class="card-details">
         <h2>{storeProductDetail.title}</h2>
         <p>{storeProductDetail.description}</p> 
         <div className="price-discount">
                        <div>
                        <span><span>&#8377;</span>{discountedPrice}</span>
                        <span className="discount" style={{ textDecoration: "line-through" }}>
                          <span>&#8377;</span>
                          {storeProductDetail.price}
                        </span>
                        </div>
                        <div><span>{storeProductDetail.discount}% Off</span></div>
                      </div>
       </div>
     </div>
      ) : <Loader/>}
    </div>
  );
};

export default ProductDetail;
