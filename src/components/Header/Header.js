import React from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import cx from "classnames";

const Header = (props) => {
  const onLogout = (event) => {
    props.logout(false);
  };

  let isLoggedIn = props.isLoggedIn;
  return (
    <div className={`row ${cx(styles.header, styles.background)}`}>
      <div className="col-11 text-center">
        <h1>{isLoggedIn && `Welcome to react App`}</h1>
      </div>
      <div className="col-1 d-flex align-items-center">
        <Button onClick={onLogout}>
          {isLoggedIn && `Logout`}
          {!isLoggedIn && `Login`}
        </Button>
      </div>
    </div>
  );
};

export default Header;
