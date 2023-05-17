import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { getLoginData ,setLoginInputData,loginInputData} = useContext(AuthContext);
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
    alert("success");
    getLoginData();
    navigate('/')
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
