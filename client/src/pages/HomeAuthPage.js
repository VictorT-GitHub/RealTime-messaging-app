import React, { useState } from "react";

import RegisterForm from "../components/auth-components/RegisterForm";
import LoginForm from "../components/auth-components/LoginForm";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomeAuthPage = () => {
  // -- useState --
  const [registerState, setRegisterState] = useState(true);
  const [loginState, setLoginState] = useState(false);

  const handleForms = (e) => {
    if (e.target.id === "register") {
      setRegisterState(true);
      setLoginState(false);
    } else if (e.target.id === "login") {
      setLoginState(true);
      setRegisterState(false);
    }
  };

  // -- JSX --
  return (
    <div>
      <Header />

      <h1>HOME - AUTH</h1>

      <button id="register" onClick={handleForms}>
        Register
      </button>
      <button id="login" onClick={handleForms}>
        Login
      </button>

      {registerState && (
        <RegisterForm
          setLoginState={setLoginState}
          setRegisterState={setRegisterState}
        />
      )}
      {loginState && <LoginForm />}

      <hr />
      <Footer />
    </div>
  );
};

export default HomeAuthPage;
