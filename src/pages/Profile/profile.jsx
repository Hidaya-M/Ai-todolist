import Header from "../../comp/Header/header";
import Footer from "../../comp/Footer/Footer";
import "./profile.css";
import { Helmet } from "react-helmet-async";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import Moment from "react-moment";
import { deleteUser } from "firebase/auth";
import Loading from "../../comp/Loading/Loading";
import Eroor from "../../comp/Error/Eroor";
import { Buttonred } from "../../comp/Buttons/Buttons";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();

  const Delateuser = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        console.log(error);
        // ...
      });
  };

  // loading
  // error
  // user verified and not verified
  //  no user
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

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
        <Eroor />
      </>
    );
  }
  // end error
  if (user) {
    if (user.emailVerified) {
      if (i18n.language === "ar") {
        return (
          <>
            <Helmet>
              <title>الملف الشخصي</title>
              <meta
                name="description"
                content="يحتوي هذا القسم على معلوماتك الشخصية"
              />
            </Helmet>

            <Header />

            <main dir="rtl">
              <div className="neuphorism">
                <p>اسم المستخدم: {user.displayName}</p>
                <p>ايمايل : {user.email}</p>
                <p>
                  آخر تسجيل دخول:{" "}
                  <Moment
                    className="p"
                    fromNow
                    ago
                    date={user.metadata.lastSignInTime}
                  />
                </p>
                <p>
                  تاريخ إنشاء الحساب:{" "}
                  <Moment
                    className="p"
                    ago
                    fromNow
                    date={user.metadata.creationTime}
                  />
                </p>
                <Buttonred Delateuser={Delateuser}>
                  {t("deleteaccount")}
                </Buttonred>
              </div>
            </main>

            <Footer />
          </>
        );
      }

      if (i18n.language === "en") {
        return (
          <>
            <Helmet>
              <title>Profile </title>
              <meta
                name="description"
                content="This section include your personal information"
              />
            </Helmet>

            <Header />

            <main>
              <div className="neuphorism">
                <p>Username: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>
                  Last Sign-in:{" "}
                  <Moment
                    className="p"
                    fromNow
                    ago
                    date={user.metadata.lastSignInTime}
                  />
                </p>
                <p>
                  Account Created:{" "}
                  <Moment
                    className="p"
                    ago
                    fromNow
                    date={user.metadata.creationTime}
                  />
                </p>
                <Buttonred Delateuser={Delateuser}>
                  {t("deleteaccount")}
                </Buttonred>
              </div>
            </main>

            <Footer />
          </>
        );
      }

      if (i18n.language === "fr") {
        return (
          <>
            <Helmet>
              <title>Profil</title>
              <meta
                name="description"
                content="Cette section contient vos informations personnelles"
              />
            </Helmet>

            <Header />

            <main>
              <div className="neuphorism">
                <p>Nom d'utilisateur : {user.displayName}</p>
                <p>e-mail : {user.email}</p>
                <p>
                  Dernière connexion :{" "}
                  <Moment
                    className="p"
                    fromNow
                    ago
                    date={user.metadata.lastSignInTime}
                  />
                </p>
                <p>
                  Date de création du compte :{" "}
                  <Moment
                    className="p"
                    fromNow
                    ago
                    date={user.metadata.creationTime}
                  />
                </p>
                <Buttonred Delateuser={Delateuser}>
                  {t("deleteaccount")}
                </Buttonred>
              </div>
            </main>

            <Footer />
          </>
        );
      }
    }
  }
  //  end verifed user
};

export default Profile;
