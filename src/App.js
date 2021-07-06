import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import Home from "./components/Home/Home";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isloggedIn")));
  }, []);

  const onLoginHandler = (value) => {
    localStorage.setItem("isloggedIn", value);
    setIsLoggedIn(value);
  };

  return (
    <div className="container-fluid">
      <Header logout={onLoginHandler} isLoggedIn={isLoggedIn} />
      {!isLoggedIn && <LoginForm authenticate={onLoginHandler} />}
      {isLoggedIn && <Home />}
    </div>
  );
};

export default App;
