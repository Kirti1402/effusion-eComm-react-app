import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route, Link } from "react-router-dom";
import { Cart } from "./Components/Cart/CartPage";
import { Home } from "./Components/Home/HomePage";
import { ProfilePage } from "./Components/Profile/ProfilePage";
import { WishList } from "./Components/WishList/WishListPage";
import { Login } from "./Components/Login/LoginPage";
import { Header } from "./Components/Home/Header";
import { SignUp } from "./Components/SignUp/SignUpPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { Product } from "./Components/Product/Product";
import ProductDetail from "./Components/ProductDetail/ProductDetail";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<Mockman />} />

        <Route
          path="/cart"
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoutes>
              <WishList />
            </PrivateRoutes>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <ProfilePage />
            </PrivateRoutes>
          }
        />
        <Route path="/product" element={<Product/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/productDetail" element={<ProductDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
