import React from "react";
import Header from "../../comp/Header/header";
import Footer from "../../comp/Footer/Footer";
import "./edittask.css";
import { Helmet } from "react-helmet-async";
import EditButtonTask from "./3-Edit-button-task";
import ContentTask from "./2-Content-task";
import TitleTask from "./1-Title-task";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import { useState } from "react";

const Edittask = () => {
  // for getting the id params-----------------
  let { Userid } = useParams();

  const [user, loading, error] = useAuthState(auth);
  const [showdata, setshowData] = useState(false);
  const navigate = useNavigate();
  // for delating all the task---------------------------
  const deleteBTN = async (eo) => {
    setshowData(true);
    await deleteDoc(doc(db, user.uid, Userid));
    navigate("/tasks", { replace: true });
  };

  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (user) {
    return (
      <div>
        <Helmet>
          <title>Edit Task</title>
          <meta
            name="description"
            content="This section include options for
             editing your task"
          />
        </Helmet>
        <Header />
        {showdata ? (
          <main>
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={77}
              width={77}
            />
          </main>
        ) : (
          <div className="edit-container">
            <TitleTask user={user} Userid={Userid} />

            {/* end title task section */}

            <ContentTask user={user} Userid={Userid} />

            {/* end content task */}

            <EditButtonTask user={user} Userid={Userid} deleteBTN={deleteBTN} />

            {/* end buttton section */}
          </div>
        )}

        <Footer />
      </div>
    );
  }
};

export default Edittask;
