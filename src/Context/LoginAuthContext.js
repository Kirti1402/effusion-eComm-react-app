import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
export const LoginAuthContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEncodedToken, setIsEncodedToken] = useState("");
  const [loginData, setLoginData] = useState();
  const [loginInputData, setLoginInputData] = useState({
    email: null,
    password: null,
  });
  
  useEffect(() => {
    const token = localStorage.getItem("Encodedtoken");
    if (token) {
      setIsLoggedIn(true);
      setIsEncodedToken(token);
    }
  }, []);
  
  const getLoginData = async () => {
    let cred = loginInputData;
    console.log('check');

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(cred),
    });
    const response = await res.json();
    if (res.ok) {
      console.log("inside logging",state)
      localStorage.setItem("LoginItem", JSON.stringify(response));
      setIsLoggedIn(true);
      localStorage.setItem("loginItem", response.foundUser);
      localStorage.setItem("firstName", response.foundUser.firstName);
      localStorage.setItem("lastName", response.foundUser.lastName);
      localStorage.setItem("email", response.foundUser.email);
      localStorage.setItem("Encodedtoken", response.encodedToken);
      if(state === null){
        navigate("/")
      }else{
        navigate(state.path)
      }
      setIsEncodedToken(response.encodedToken);
      setLoginData(response.foundUser);
    } else if (!res.ok) {
      console.log(response.errors);
      setError(response.errors[0]);
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
          setLoginData,
          error,
        }}
      >
        {children}
      </LoginAuthContext.Provider>
    </>
  );
};
