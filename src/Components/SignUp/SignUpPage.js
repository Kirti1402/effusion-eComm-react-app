import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";

import { SignUpAuthContext } from "../../Context/SignupAuthContext";
import "./SignUp.css"
import Footer from "../Home/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisable, setIsDisable] = useState(false)
  const [error,setError] = useState(false)

  const { signUpInput, setSignUpInput, signupHandler} = useContext(SignUpAuthContext);

    const navigate = useNavigate();

    const  updateForm = (e) =>{
      console.log("indide log in update form")
        let name = e.target.name;
        let value = e.target.value;
        if((name === 'confirmPassword') && value !== signUpInput.password){
          console.log("inside if")
            setError(true);
          setIsDisable(true)
        }  else{
          setSignUpInput({
            ...signUpInput,
            [name]:value})
            setError(false);
          setIsDisable(false)
        }
        
        console.log("", signUpInput);
        console.log("name:value",name,value)
        
        
    }
    const submitForm = (e) =>{
        e.preventDefault();
        alert("success");
        signupHandler();
        navigate('/')
    }

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    return <div>
    <div className="signup-container">
    
    <form  onSubmit={submitForm}>
    <p className="heading">Sign UP</p>
        <div className="firstName">
          <label >First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter FirstName" onKeyUp={updateForm} required />
        </div>
        <div className="lastName" >
          <label >Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter LastName" onKeyUp={updateForm} required />
        </div>
        <div className="email">
          <label >Email</label>
          <input type="email" id="email" name="email" placeholder="Enter Email" onKeyUp={updateForm} required />
        </div>
        <div className="password">
          <label>Password</label>
          <input type={showPassword ? 'text' : 'password'}  id="password" name="password" placeholder="Enter Password" onKeyUp  ={updateForm} required />
          <button className="show-hide-btn" onClick={handleTogglePassword}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </button>
        </div>
        <div className="confirmPassword">
          <label>Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" placeholder="Re-Enter Password" onKeyUp  ={updateForm} required />
        </div>
        {error ? <p style={{textAlign:'center',color:'red'}}>Please check your Password</p> : null}
          <button type="submit" className={!isDisable ? 'signupBtn': 'disabledSignupBtn' } disabled={isDisable}>
           Sign UP
          </button>

          <span >Already have account?</span>
          <span className="loginLink" onClick={()=> navigate('/login')}>Log In</span>
      </form>
    </div>
    <Footer/>
    </div>
}