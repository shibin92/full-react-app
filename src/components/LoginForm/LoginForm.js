import React, { useState, useEffect, useReducer } from "react";
import Button from "../Button/Button";
import TextBox from "../TextBox/TextBox";
import styles from "./LoginForm.module.css";

const userNameReducer = (state, action) => {
  // action has the object that is passed in the dispatch method
  // state has the current state object that is passed in use reducer as second arg
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.trim().length > 3 };
    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (state, action) => {
  // action has the object that is passed in the dispatch method
  // state has the object that is passed in use reducer as second arg
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.trim().length > 3 };
    default:
      return { value: "", isValid: false };
  }
};

const LoginForm = (props) => {
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [isUserValid, setIsUserValid] = useState(false);
  // const [isPwdValid, setIsPwdValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [userNameState, dispatchUsername] = useReducer(userNameReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  //More optimization to the code to just check the validation is changed
  //This optmization is after successful validation, if we add one more character, its still valid and still it checks for use effect
  //The below logic will help in that
  const { isValid: userIsValid } = userNameState;
  const { isValid: passwordIsValid } = passwordState;

  // Proper way of working with form and validating the form variables
  useEffect(() => {
    console.log("calling use effect");
    const identifier = setTimeout(() => {
      console.log("calling validation");
      setIsFormValid(userIsValid && passwordIsValid);
    }, 100);

    return () => {
      console.log("clearing the time out");
      clearTimeout(identifier);
    };
  }, [userIsValid, passwordIsValid]);

  const authenticate = () => {
    dispatchUsername({ type: "default" });
    dispatchPassword({ type: "default" });
    props.authenticate(true);
  };
  const onChangeUsername = (userName) => {
    dispatchUsername({ type: "USER_INPUT", val: userName });
  };
  const onChangePassword = (password) => {
    dispatchPassword({ type: "USER_INPUT", val: password }); // the dispatch function will pass the function
  };

  return (
    <div className="row justify-content-center py-5">
      <div className={`col ${styles.content_form}`}>
        <TextBox
          labelTxt="<strong>User Name</strong>"
          placeholder="Please enter the User Name"
          onChange={onChangeUsername}
          value={userNameState.value}
          className={
            !userNameState.value
              ? ``
              : userNameState.isValid
              ? `is-valid`
              : `is-invalid`
          }
        />
        <TextBox
          labelTxt="<strong>Password</strong>"
          placeholder="Please enter the Password"
          onChange={onChangePassword}
          value={passwordState.value}
          className={
            !passwordState.value
              ? ``
              : passwordState.isValid
              ? `is-valid`
              : `is-invalid`
          }
        />
        <center>
          <Button
            className="btn btn-primary col-4"
            onClick={authenticate}
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </center>
      </div>
    </div>
  );
};

export default LoginForm;
