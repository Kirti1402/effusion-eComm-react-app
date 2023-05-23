import {useContext, useState} from "react";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsEncodedToken} =useContext(LoginAuthContext);
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const [selecttab,setSelectTab] = useState({profile:true,address:false})

  const logOutHandler = () =>{
    
    console.log("clicked")
    localStorage.removeItem("Encodedtoken");
    localStorage.removeItem("LoginItem");
    setIsLoggedIn(false);
    setIsEncodedToken("")
    navigate("/")
  }

  return (
    <div>
      <div>
        <button>Profile Information</button>
        {selecttab.profile &&  
      <div>
        <p>ProfilePage Page</p>
        <p>Name : {firstName}{lastName}</p>
        <p>Email :{email}</p>
        <button onClick={()=>logOutHandler()}>Log Out</button>
      </div>}
        <button>Address Information</button>
        </div>
     
    </div>
  );
};
