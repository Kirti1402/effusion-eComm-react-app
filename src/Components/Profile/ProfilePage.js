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
    localStorage.removeItem("DefaultAddress")
    setIsLoggedIn(false);
    setIsEncodedToken("");
    navigate("/");
  };

  return (
    <div className="profile-page-container">
      <div className="btn-container">
      <button className={selecttab.profile ? 'btnBack' : 'none' } onClick={() => setSelectTab({ profile: true, address: false })}>Profile Information</button>
      <button className={selecttab.address ? 'btnBack' : 'none' } onClick={() => setSelectTab({ profile: false, address: true })}>Address Information</button>
      </div>
      <div className="detail-container">
      {selecttab.profile && (
        <section>
          <p>
            Name : {firstName}
            {lastName}
          </p>
          <p>Email :{email}</p>
          <button  className="logOut"onClick={() => logOutHandler()}>Log Out</button>
        </section>
      )}
      {selecttab.address && <Address />}
      </div>
    </div>
  );
};
