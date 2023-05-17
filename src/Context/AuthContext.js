import { createContext, useState } from "react";
export const AuthContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEncodedToken, setIsEncodedToken] = useState("");
  const [loginData, setLoginData] = useState("");
  const [loginInputData, setLoginInputData] = useState({
    email: null,
    password: null,
  });
  const [signUpData, setSignUpData] = useState({firstName:null,lastName:null,email:null,password:null});

  const getLoginData = async () => {
    const cred = loginData ?? signUpData;
    console.log(loginInputData);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInputData),
      });
      const response = await res.json();
      localStorage.setItem("Encodedtoken",response.encodedToken)
      setIsEncodedToken(response.encodedToken);
      setLoginData(response.foundUser);
      setIsLoggedIn(true);
    } catch (errors) {
      console.log(errors[0]);
    }

    

    console.log("logged in");
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          getLoginData,
          setLoginInputData,
          loginInputData,
          loginData,
          isEncodedToken,
          setSignUpData,
          signUpData
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
