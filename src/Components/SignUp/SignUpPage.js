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
    return <>
    <p>Sign UP Page</p>
    <form onSubmit={submitForm}>
        <div >
          <label >First Name</label>
          <input type="text" id="firstName" name="firstName" onBlur={updateForm} required />
        </div>
        <div >
          <label >Last Name</label>
          <input type="text" id="lastName" name="lastName" onBlur={updateForm} required />
        </div>
        <div >
          <label >Email</label>
          <input type="email" id="email" name="email" onBlur={updateForm} required />
        </div>
        <div className="password">
          <label>Password</label>
          <input type="password" id="password" name="password" onBlur  ={updateForm} required />
        </div>
        <div >
          <button>
           Sign UP
          </button>
        </div>
      </form>
    </>
}