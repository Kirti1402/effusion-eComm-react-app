import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState, useContext } from "react";

import { LoginAuthContext } from "./LoginAuthContext";
export const SignUpAuthContext = createContext();

export const SignUpAuthContextProvider = ({ children }) => {
  const { setIsLoggedIn, setIsEncodedToken, loginData, setLoginData } =
    useContext(LoginAuthContext);
  const [signUpInput, setSignUpInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("Encodedtoken");
    if (token) {
      setIsLoggedIn(true);
      setIsEncodedToken(token);
    }
  }, []);

  const signupHandler = async () => {
    let cred = signUpInput;
    const res = await fetch(`/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(cred),
    });

    const response = await res.json();
    localStorage.setItem("SignUpItem", JSON.stringify(response));

    if (!response.error) {
      setIsLoggedIn(true);
      localStorage.setItem("Encodedtoken", response.encodedToken);
      localStorage.setItem("firstName", response.createdUser.firstName);
      localStorage.setItem("lastName", response.createdUser.lastName);
      localStorage.setItem("email", response.createdUser.email);

      setLoginData(response.createdUser);
      //   navigate(state.path)
      setIsEncodedToken(response.encodedToken);
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <SignUpAuthContext.Provider
        value={{
          signUpInput,
          setSignUpInput,
          signupHandler,
        }}
      >
        {children}
      </SignUpAuthContext.Provider>
    </>
  );
};
