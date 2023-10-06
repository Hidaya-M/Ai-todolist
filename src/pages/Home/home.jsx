import Header from "../../comp/Header/header";
import Footer from "../../comp/Footer/Footer";

import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
// import "../comp/MainContent.css";
import "./home.css";
import Lottie from "react-lottie";
import animationData from "../../Lotties/animation_lmrz9mcd.json";
import Loading from "../../comp/Loading/Loading";
import Eroor from "../../comp/Error/Eroor";
import { useTranslation } from "react-i18next";
const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { t, i18n } = useTranslation();
  const [user, loading, error] = useAuthState(auth);
  // loading
  // error
  // user verified and not verified
  //  no user
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
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Home</title>
            <meta name="description" content="" />
          </Helmet>
          <Header />
          <main>
            <div className="main-p">
            <p >
              Hi {user.displayName}, welcome! Please verify your email to get
              started
            </p>
            </div>
          </main>
          <Footer />
        </>
      );
    }
    if (user.emailVerified) {
      if (i18n.language === "en") {
        return (
          <>
            <Helmet>
              <title>Home</title>
              <meta name="description" content="" />
            </Helmet>
            <Header />
            <div className="home-container" style={{ display: "flex" }}>
              <div className="text-content">
                <h2 id="h2">
                  welcome {user.displayName},
                  <br />
                  meet your new AI-powered to-do list.
                </h2>
                <p>
                  you can navigate through the app and ask me using only your
                  voice. She's your perfect hands-free companion for staying
                  organized and productive
                </p>
              </div>

              <div className="mp">
                <Lottie options={defaultOptions} height={300} width={300} />
              </div>
            </div>
            <Footer />
          </>
        );
      }
      if (i18n.language === "ar") {
        return (
          <>
            <Helmet>
              <title>الرئيسية</title>
              <meta name="description" content="" />
            </Helmet>
            <Header />
            <div
              className="home-container"
              style={{ display: "flex", dir: "rtl" }}
            >
              <div className="mp" dir="rtl">
                <Lottie options={defaultOptions} height={300} width={300} />
              </div>
              <div className="text-content">
                <h2 id="h2" dir="rtl">
                  مرحبا {user.displayName} ،
                  <br />
                  تعرف على قائمة المهام الجديدة المدعومة بالذكاء الاصطناعي.
                </h2>
                <p dir="rtl">
                  يمكنك التنقل عبر التطبيق وسؤالي باستخدام صوتك فقط. إنها الرفيق
                  المثالي بدون استخدام اليدين للبقاء منظما وإنتاجيا.
                </p>
              </div>
            </div>
            <Footer />
          </>
        );
      }
      if (i18n.language === "fr") {
        return (
          <>
            <Helmet>
              <title>Accueil</title>
              <meta name="description" content="" />
            </Helmet>
            <Header />
            <div
              className="home-container"
              style={{ display: "flex", dir: "rtl" }}
            >
              <div className="text-content">
                <h2 id="h2">
                  Bienvenue {user.displayName},
                  <br />
                  Découvrez votre nouvelle liste de tâches alimentée par l'IA.
                </h2>
                <p>
                  Vous pouvez naviguer dans l'application et me poser des
                  questions en utilisant uniquement votre voix. C'est votre
                  compagnon mains libres idéal pour rester organisé et
                  productif.
                </p>
              </div>
              <div className="mp" dir="rtl">
                <Lottie options={defaultOptions} height={300} width={300} />
              </div>
            </div>
            <Footer />
          </>
        );
      }
    }
  }
  //  end not verified user and verified user

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <meta
            name="description"
            content="Our to-do list app makes it easy to keep track of your tasks and get things done. With our simple and intuitive interface, you can create, edit, and manage your to-do lists with ease"
          />
        </Helmet>

        <Header />

        <main>
          <p>Please sign in to continue...</p>
        </main>

        <Footer />
      </>
    );
  }
  // end no user
};

export default Home;
