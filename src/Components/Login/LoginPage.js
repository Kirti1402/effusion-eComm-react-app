import { useContext } from "react";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Login = () => {
  const { state } = useLocation();
  const { getLoginData ,setLoginInputData,loginInputData} = useContext(LoginAuthContext);
  const navigate = useNavigate();

const  updateForm = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    console.log("", loginInputData);
    setLoginInputData({
        ...loginInputData,
        [name]:value})
}

const submitForm = (e) =>{
    e.preventDefault();
    // alert("success");
    getLoginData();
    console.log("state",state)
    // navigate(state.path);
}
  return (
    <div>
      <p>Login Page</p> 
      <form onSubmit={submitForm}>
        <div >
          <label >UserEmail</label>
          <input type="text" id="useremail" name="email" onBlur={updateForm} required />
        </div>
        <div >
          <label>Password</label>
          <input type="password" id="password" name="password" onBlur  ={updateForm} required />
        </div>
        <div >
          <button type="submit">
            Log In
          </button>
          <button onClick={() => navigate("/signUp")}>
            Create New account
          </button>
        </div>
      </form>
    </div>
  );
};
