import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
export const LoginAuthContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEncodedToken, setIsEncodedToken] = useState("");
  const [loginData, setLoginData] = useState();
  const [loginInputData, setLoginInputData] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("Encodedtoken");
    if(token){ 
      setIsLoggedIn(true);
      setIsEncodedToken(token);
    }
  },[])

  const getLoginData = async () => {
    let cred = {
        "email": "aman@gmail.com",
         "password": "12345678"
        }
    
    console.log(cred);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(cred),
      });
      const response = await res.json();
      console.log(response);

      if(!response.error){
        // setIsLoggedIn(true);
      // localStorage.setItem("loginItem", response.foundUser);
      // localStorage.setItem("firstName", response.foundUser.firstName);
      // localStorage.setItem("lastName", response.foundUser.lastName);
      // localStorage.setItem("email", response.foundUser.email);
      localStorage.setItem("Encodedtoken", response.encodedToken);
      console.log("logged in")
      navigate(state.path)      
      setIsEncodedToken(response.encodedToken);
      setLoginData(response.foundUser);
      }else {
        console.log("error")
      }

  };

  return (
    <>
      <LoginAuthContext.Provider
        value={{
          isLoggedIn,
          getLoginData,
          setLoginInputData,
          loginInputData,
          loginData,
          isEncodedToken,
          setIsLoggedIn,
          setIsEncodedToken,
          setLoginData

        }}
      >
        {children}
      </LoginAuthContext.Provider>
    </>
  );
};
