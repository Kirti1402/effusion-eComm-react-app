import {useContext} from "react";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  
  const { loginData ,isLoggedIn } = useContext(LoginAuthContext);

  // const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  // const {firstName,lastName,email} = profileData;
  const navigate = useNavigate();
  return (
    <div>
      <p>ProfilePage Page</p><div>
        {/* <p>Name : {firstName}</p> */}
        <p>Email :{email}</p>
      </div>
    </div>
  );
};
