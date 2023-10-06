import Header from "../../comp/Header/header";
import Footer from "../../comp/Footer/Footer";
import "./form.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import "../comp/MainContent.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Loading from "../../comp/Loading/Loading";
import Eroor from "../../comp/Error/Eroor"

const Signup = () => {
  const [email, setemail] = useState("");
  const [username, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [errormessage, seterror] = useState("");
  const [errorshow, seterrorshow] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const Createuser = (eo) => {
    eo.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        // end update function
        console.log(user);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("email send");
          // ...
        });
        // end send email function
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorshow(true);
        switch (errorCode) {
          case "auth/weak-password":
            seterror(
              "Your password is invalid. It must be at least 6 characters long"
            );
            break;

          case "auth/invalid-password":
            seterror(
              "Your password is invalid. It must be at least 6 characters long "
            );
            break;

          case "auth/email-already-in-use":
            seterror(
              "The email address you entered is already in use. Please try a different email address "
            );
            break;

          case "auth/email-already-exists":
            seterror(
              "The email address you entered is already in use. Please try a different email address "
            );
            break;

          case "auth/too-many-requests":
            seterror("To many request , Please try again later ");
            break;

          default:
            seterror(" Please check your email & password   ");
            break;
        }

        // end
      });
    // end create use function
  };

  // loading
  // error
  // user not verified  and verified
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
  // end verified and not v user
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
          <title>Signup </title>
          <meta name="description" content="Signup page" />
        </Helmet>

        <Header />

        <main>
          <div className="card">
            <h4 className="title">Sign up</h4>
            <form>
              <div className="field">
                <i class="fa-solid fa-user"></i>
                <input
                  required
                  autoComplete="off"
                  id=""
                  placeholder="Username"
                  className="input-field"
                  name=""
                  type="text"
                  onChange={(eo) => {
                    setuser(eo.target.value);
                  }}
                />
              </div>
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
                  required
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
                  required
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
                  Createuser(eo);
                  // end create use function
                }}
              >
                Signup
              </button>
              <p href="#" className="btn-link">
                have an'account{" "}
                <Link className="red" to="/signin">
                  Signin
                </Link>
              </p>
            </form>
          </div>
          {errorshow && <p className="pi">{errormessage}</p>}
        </main>

        <Footer />
      </>
    );
  }
  // end no exist user
};

export default Signup;
