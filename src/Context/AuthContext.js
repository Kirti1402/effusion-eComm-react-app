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

  const getLoginData = async () => {
    console.log(loginInputData);
    const cred = {
      email: "adarshbalika@gmail.com",
      password: "12345678",
    };
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInputData),
      });

      const response = await res.json();
      // console.log("ResponseData",response.foundUser.firstName);

      // const { encodedToken, foundUser } = await res.json()
      // console.log("response",await res.json());
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
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
