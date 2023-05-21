import {useContext} from "react";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const logOutHandler = () =>{
    console.log("clicked")
    // console.log(localStorage.getItem("Encodedtoken"));
    localStorage.removeItem("Encodedtoken");
    navigate("/")
  }
  return (
    <div>
      <p>ProfilePage Page</p><div>
        <p>Name : {firstName}</p>
        <p>Email :{email}</p>
        <button onClick={()=>logOutHandler()}>Log Out</button>
      </div>
    </div>
  );
};
