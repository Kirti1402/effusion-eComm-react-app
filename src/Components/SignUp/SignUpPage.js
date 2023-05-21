import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SignUpAuthContext } from "../../Context/SignupAuthContext";
import "./SignUp.css"

export const SignUp = () => {

  const { signUpInput, setSignUpInput, signupHandler} = useContext(SignUpAuthContext);

    const navigate = useNavigate();
    const  updateForm = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        console.log("", signUpInput);
        console.log(name,value)
        setSignUpInput({
            ...signUpInput,
            [name]:value})
    }
    const submitForm = (e) =>{
        e.preventDefault();
        alert("success");
        signupHandler();
        navigate('/')
    }
    return <div className="signup-container">
    
    <form onSubmit={submitForm}>
    <p className="heading">Sign UP Page</p>
        <div className="firstName">
          <label >First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter FirstName" onBlur={updateForm} required />
        </div>
        <div className="lastName" >
          <label >Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter LastName" onBlur={updateForm} required />
        </div>
        <div className="email">
          <label >Email</label>
          <input type="email" id="email" name="email" placeholder="Enter Email" onBlur={updateForm} required />
        </div>
        <div className="password">
          <label>Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password" onBlur  ={updateForm} required />
        </div>
        <div  className="btn-container">
          <button type="submit">
           Sign UP
          </button>
          <button onClick={()=> navigate('/login')}>Log In</button>
        </div>
      </form>
    </div>
}