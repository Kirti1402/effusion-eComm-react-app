import { createContext, useState } from "react";
export const AuthContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEncodedToken, setIsEncodedToken] = useState("");
  const [loginData, setLoginData] = useState("");

  const getLoginData = async () => {
    const cred = {
      email: "kirt@gmail.com",
      password: "adarshbal",
    };
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(cred),
      });
    //   const { encodedToken, foundUser } = await response.json();
    //   setLoginData(foundUser);
    //   setIsEncodedToken(encodedToken);
    //   setIsLoggedIn(true);
      console.log("response",await response.json());
    } catch (errors) {
      console.log(errors[0]);
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, getLoginData }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
