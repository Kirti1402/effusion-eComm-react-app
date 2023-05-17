import "./App.css";
import Mockman from "mockman-js";
import {Routes,Route,Link} from "react-router-dom" 
import { Cart } from "./Components/Cart/CartPage";
import { Home } from "./Components/Home/HomePage";
import { ProfilePage } from "./Components/Profile/ProfilePage";
import { WishList } from "./Components/WishList/WishListPage";
import { Login } from "./Components/Login/LoginPage";
import { Header } from "./Components/Home/Header";
import { SignUp } from "./Components/SignUp/SignUpPage";
import { PrivateRoutes } from "./PrivateRoutes";


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/mockman" element={<Mockman/>}/>
        <Route element={<PrivateRoutes/>}>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/wishlist" element={<WishList/>}/>
        </Route>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
