import { useContext } from "react";
import { useNavigate ,useLocation} from "react-router-dom";

import { LoginAuthContext } from "../../Context/LoginAuthContext";
import "./LoginStyle.css"
import Footer from "../Home/Footer";

export const Login = () => {
  const { state } = useLocation();
  const { getLoginData ,setLoginInputData,loginInputData} = useContext(LoginAuthContext);
  const navigate = useNavigate();

const  updateForm = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    console.log("", loginInputData);
    console.log("name:value",name,value)
    setLoginInputData({
        ...loginInputData,
        [name]:value})
}

const submitForm = (e) =>{
    e.preventDefault();
    getLoginData();
        console.log("state",state)
}

const loginAsGuestHandle = () => {
  setLoginInputData({
    email:'JohnDeo@gmail.com',
    password:'12345678'
  })

}
  return (
    <div>
    <div className="login-container">
      <form onSubmit={submitForm}>
      <p className="heading">Login</p> 
        <div className="email">
          <label >Email</label>
          <input type="text" id="useremail" value={loginInputData.email} placeholder="Enter your Email" name="email" onChange={updateForm} required />
        </div>
        <div className="password">
          <label>Password</label>
          <input type="password" id="password" value={loginInputData.password} placeholder="Enter your Password" name="password" onChange  ={updateForm} required />
        </div>
        <span className="forgetPswd">Forget Password?</span>
        <div >
          <button type="submit"  className="loginBtn">
            Log In
          </button>

          <span >Dont have an Account?</span>
          <span className="signUpLink" onClick={()=> navigate('/signup')}> Sign Up</span>
        </div>
        <div className="loginAsGuest" onClick={loginAsGuestHandle}>Login As Guest</div>
      </form>
    </div>
    <Footer/>
    </div>
  );
};
