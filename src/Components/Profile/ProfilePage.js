import {useContext} from "react";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsEncodedToken} =useContext(LoginAuthContext);
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

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
      <p>ProfilePage Page</p><div>
        <p>Name : {firstName}{lastName}</p>
        <p>Email :{email}</p>
        <button onClick={()=>logOutHandler()}>Log Out</button>
      </div>
    </div>
  );
};
