import React from "react";
import "./AuthPage.css";
import { useState } from "react";
import Login from "./Login.js";
import SignUp from "./SignUp.js";

const AuthPage = () => {
  const [l, setL] = useState(false);

  return (
    <div className="authPageMain">
      <div className="accountDiv">
        <div className="accountDivText">ACCOUNT</div>
        <div className="authDivTitle">
          <div
            className={l ? "authSignInBoxGrey" : "authSignInBoxBlack"}
            onClick={() => setL(false)}
          >
            LOG IN
          </div>
          <div
            className={!l ? "authSignUpBoxGrey" : "authSignUpBoxBlack"}
            onClick={() => setL(true)}
          >
            SIGN UP
          </div>
        </div>
        {/* <div className="authPageFieldContainer">
          <input type="text" placeholder="email" className="emailField"></input>
          <input
            type="password"
            placeholder="password"
            className="passwordField"
          ></input>
        </div> */}

        {!l && <Login />}
        {l && <SignUp />}
      </div>
    </div>
  );
};

export default AuthPage;
