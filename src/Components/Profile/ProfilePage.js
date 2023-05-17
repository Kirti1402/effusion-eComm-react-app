import {useContext} from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { loginData, isLoggedIn } = useContext(AuthContext);
  const {firstName,lastName,email} = loginData;
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
