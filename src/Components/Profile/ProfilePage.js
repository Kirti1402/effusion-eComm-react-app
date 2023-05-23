import { useContext, useState } from "react";
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Address } from "./Address";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsEncodedToken } = useContext(LoginAuthContext);
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const [selecttab, setSelectTab] = useState({ profile: true, address: false });

  const logOutHandler = () => {
    console.log("clicked");
    localStorage.removeItem("Encodedtoken");
    localStorage.removeItem("LoginItem");
    setIsLoggedIn(false);
    setIsEncodedToken("");
    navigate("/");
  };

  return (
    <div className="profile-page-container">
      <div className="btn-container">
      <button>Profile Information</button>
      <button>Address Information</button>
      </div>
      <div>
      {selecttab.profile && (
        <section>
          <p>ProfilePage Page</p>
          <p>
            Name : {firstName}
            {lastName}
          </p>
          <p>Email :{email}</p>
          <button onClick={() => logOutHandler()}>Log Out</button>
        </section>
      )}
      {selecttab.address && <Address />}
      </div>
    </div>
  );
};
