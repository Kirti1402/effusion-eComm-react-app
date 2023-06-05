import { useContext } from "react";
import PriceDetail from "../Cart/PriceDetail";
import { ProductListingcontext } from "../../Context/ProductListContext";
import { Address } from "../Profile/Address";
import "./checkout.css"

export default function Checkout() {
  const { cartList } = useContext(ProductListingcontext);
  return (
    <div>
      {cartList.length > 0 && (
        <div className="checkout-page">
          <div className="checkout-address">
            <Address />
          </div>
          <div>
            <PriceDetail />
          </div>
        </div>
      )}
    </div>
  );
}
