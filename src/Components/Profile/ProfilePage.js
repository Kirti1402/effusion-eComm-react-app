import {useContext} from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { loginData,signUpData ,isLoggedIn } = useContext(AuthContext);
  let profileData;
  if(loginData.email) {
    profileData = loginData;
  } else{
    profileData = signUpData;
  }
  
  const {firstName,lastName,email} = profileData;
  console.log("loginData",loginData)
  const navigate = useNavigate();
  return (
    <div>
      <p>ProfilePage Page</p><div>
        <p>Name : {firstName}{lastName}</p>
        <p>Email:{email}</p>
      </div>
    </div>
  );
};
