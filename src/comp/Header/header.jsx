import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

import { useNavigate } from "react-router-dom";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
const Header = ({ Showmodal }) => {
  const handleClick = () => {
    Showmodal();
  };
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const Signout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const arabiclanguage = (params) => {
    i18n.changeLanguage("ar");
  };
  const frenshlanguage = (params) => {
    i18n.changeLanguage("fr");
  };
  const englishlanguage = (params) => {
    i18n.changeLanguage("en");
  };

  useEffect(() => {
    alanBtn({
      key: "8ddf65e62f829687440579d947480a1f2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "dark") {
          toggleTheme("Dark");
        } else if (commandData.command === "light") {
          toggleTheme("Light");
        } else if (commandData.command === "arabic") {
          arabiclanguage();
        } else if (commandData.command === "frensh") {
          frenshlanguage();
        } else if (commandData.command === "english") {
          englishlanguage();
        }
      },
    });
  }, []);

  return (
    <div className="header-container">
      <div className="header-top">
        <h1>
          <Link to="/">Tasky</Link>
        </h1>

        <i
          style={{ width: "0px" }}
          class="fa-solid fa-sun"
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
        ></i>
        <i
          style={{ width: "0px" }}
          class="fa-solid fa-moon"
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
        ></i>

        <ul className="flex">
          {user && (
            <li className="main-list">
              <button
                className="main-link signout"
                onClick={() => {
                  Signout();
                }}
              >
                {t("sign-out")}
              </button>
            </li>
          )}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                Sign-in
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                Sign-up
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/tasks">
                {t("tasks")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
                {t("Profile")}
              </NavLink>
            </li>
          )}
          {user && (
            <li className="main-list lang ">
              <p> {t("Language	")}</p>

              <ul className="lang-box">
                <li
                  dir="rtl"
                  onClick={() => {
                    arabiclanguage();
                  }}
                >
                  <p> العربية</p>
                  {i18n.language === "ar" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>

                <li
                  onClick={() => {
                    englishlanguage();
                  }}
                >
                  <p>English</p>

                  {i18n.language === "en" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>
                <li
                  onClick={() => {
                    frenshlanguage();
                  }}
                >
                  <p>French</p>
                  {i18n.language === "fr" && (
                    <i className="fa-solid fa-check"></i>
                  )}{" "}
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
