import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
    const {setSignUpData,
        signUpData,getLoginData} = useContext(AuthContext)
    const navigate = useNavigate();
    const  updateForm = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        console.log("", signUpData);
        setSignUpData({
            ...signUpData,
            [name]:value})
    }
    const submitForm = (e) =>{
        e.preventDefault();
        alert("success");
        getLoginData();
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
        <div >
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