import Header from "../../comp/Header/header";
import Footer from "../../comp/Footer/Footer";
import "./form.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect } from "react";
// import "../comp/MainContent.css";
import Loading from "../../comp/Loading/Loading";
import Eroor from "../../comp/Error/Eroor";
import Modal from "../../comp/Modal/modal";
const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errormessage, seterror] = useState("");
  const [errorshow, seterrorshow] = useState(false);
  const [showform, setform] = useState(false);
  const [emailpassword, setemailpassword] = useState("");
  const [passwordshow, setpasswordshow] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const Signinuser = (eo) => {
    eo.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorshow(true);

        // seterror(errorMessage)
        switch (errorCode) {
          case "auth/invalid-password":
            seterror(
              "The password you entered is incorrect. Please try again "
            );
            break;

          case "auth/user-not-found":
            seterror(
              "We couldn't find a user with that email address. Please try again "
            );
            break;

          case "auth/wrong-password":
            seterror(
              "The password you entered is incorrect. Please try again "
            );
            break;

          case "auth/too-many-requests":
            seterror("To many request , Please try again later ");
            break;

          default:
            seterror(" Please check your email & password   ");
            break;
        }
      });
  };
  const Resetpassword = (eo) => {
    eo.preventDefault();
    sendPasswordResetEmail(auth, emailpassword)
      .then(() => {
        // Password reset email sent!
        // ..
        setpasswordshow(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  const Showmodal = (eo) => {
    setform(true);
  };
  const closemodal = (eo) => {
    setform(false);
  };
  

  // loading
  // error
  // user verified and not verified
  //  no user
  useEffect(() => {
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });
  // end verified and not verified user
  if (loading) {
    return (
      <>
        <Header />
        <main>
          <Loading />
        </main>
        <Footer />
      </>
    );
  }
  // end loading
  if (error) {
    return (
      <>
      
      </>
    );
  }
  // end error
  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signin Page</title>
          <meta name="description" content="Signin page" />
        </Helmet>

        <Header />

        <main>
          <div className="card">
            <h4 className="title">Sign</h4>
            <form>
              <div className="field">
                <svg
                  className="input-icon"
                  viewBox="0 0 500 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z" />
                </svg>
                <input
                  autoComplete="off"
                  id="logemail"
                  placeholder="Email"
                  className="input-field"
                  name="logemail"
                  type="email"
                  onChange={(eo) => {
                    setemail(eo.target.value);
                  }}
                />
              </div>
              <div className="field">
                <svg
                  className="input-icon"
                  viewBox="0 0 500 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z" />
                </svg>
                <input
                  autoComplete="off"
                  id="logpass"
                  placeholder="Password"
                  className="input-field"
                  name="logpass"
                  type="password"
                  onChange={(eo) => {
                    setpassword(eo.target.value);
                  }}
                />
              </div>
              <button
                className="btn"
                type="submit"
                onClick={(eo) => {
                  Signinuser(eo);
                }}
              >
                Login
              </button>
              <p href="#" className="btn-link">
                Dont have an'account{" "}
                <Link className="red" to="/signup">
                  Signup
                </Link>
              </p>
              <p 
                href="#"
                className="btn-forget"
                onClick={() => {
                  Showmodal(true);
                }}
              >
                Forget Password
              </p>
            </form>
          </div>

          {errorshow && <p className="pi">{errormessage}</p>}

          {showform && (
            <Modal closemodal={closemodal}>
              <div className="InputContainer">
                <input
                  placeholder="Your email.."
                  id="input"
                  className="input"
                  name="text"
                  type="text"
                  onChange={(eo) => {
                    setemailpassword(eo.target.value);
                  }}
                />
              </div>

              <button
                className="beautiful-button"
                onClick={(eo) => {
                  Resetpassword(eo);
                }}
              >
                Reset password
              </button>
              {passwordshow && (
                <p className="forget-p">
                  Your password reset link is on its way to your inbox Check
                  your email !
                </p>
              )}
            </Modal>
          )}
        </main>

        <Footer />
      </>
    );
  }
  //  end no user
};

export default Signin;
