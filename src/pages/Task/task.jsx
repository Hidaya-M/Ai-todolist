import Header from "../../comp/Header/header";
import Footer from "../../comp/Footer/Footer";
import "./task.css";
import { Helmet } from "react-helmet-async";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import Modal from "../../comp/Modal/modal";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import Alltask from "./Alltask";
import ReactLoading from "react-loading";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';

const Task = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();
  const [showmodal, setmodal] = useState(false);
  const [array, setarray] = useState([]);
  const [arrayitem, setitem] = useState("");
  const [taskTitle, settitle] = useState("");
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowmessage] = useState(false);
  const inputElement = useRef(null);
  const Showmodal = (eo) => {
    setmodal(true);
  };
  const closemodal = (eo) => {
    setmodal(false);
    settitle("");
    setitem("");
    setarray([]);
  };
  const addtask = () => {
    if (!array.includes(arrayitem)) {
      array.push(arrayitem);
    }
    setitem("");
  };
  const showupdateinput = (params) => {
    console.log("object");
  };
  const addBtn = (eo) => {
    eo.preventDefault();
    addtask();
    inputElement.current.focus();
  };
  const submitBtn = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    const taskId = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: taskTitle,
      details: array,
      id: taskId,
      completed: false,
    });
    settitle("");
    setarray([]);
    setshowLoading(false);
    setmodal(false);
    setshowmessage(true);
    setTimeout(() => {
      setshowmessage(false);
    }, 4000);
  };

  // loading
  // error
  // user verified and not verified
  //  no user
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
  if (loading) {
    return (
      <>
        <Header />
        <main>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="200px"
            width="200px"
            viewBox="0 0 200 200"
            className="pencil"
          >
            <defs>
              <clipPath id="pencil-eraser">
                <rect height={30} width={30} ry={5} rx={5} />
              </clipPath>
            </defs>
            <circle
              transform="rotate(-113,100,100)"
              strokeLinecap="round"
              strokeDashoffset="439.82"
              strokeDasharray="439.82 439.82"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              r={70}
              className="pencil__stroke"
            />
            <g transform="translate(100,100)" className="pencil__rotate">
              <g fill="none">
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset={402}
                  strokeDasharray="402.12 402.12"
                  strokeWidth={30}
                  stroke="hsl(223,90%,50%)"
                  r={64}
                  className="pencil__body1"
                />
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset={465}
                  strokeDasharray="464.96 464.96"
                  strokeWidth={10}
                  stroke="hsl(223,90%,60%)"
                  r={74}
                  className="pencil__body2"
                />
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset={339}
                  strokeDasharray="339.29 339.29"
                  strokeWidth={10}
                  stroke="hsl(223,90%,40%)"
                  r={54}
                  className="pencil__body3"
                />
              </g>
              <g
                transform="rotate(-90) translate(49,0)"
                className="pencil__eraser"
              >
                <g className="pencil__eraser-skew">
                  <rect
                    height={30}
                    width={30}
                    ry={5}
                    rx={5}
                    fill="hsl(223,90%,70%)"
                  />
                  <rect
                    clipPath="url(#pencil-eraser)"
                    height={30}
                    width={5}
                    fill="hsl(223,90%,60%)"
                  />
                  <rect height={20} width={30} fill="hsl(223,10%,90%)" />
                  <rect height={20} width={15} fill="hsl(223,10%,70%)" />
                  <rect height={20} width={5} fill="hsl(223,10%,80%)" />
                  <rect
                    height={2}
                    width={30}
                    y={6}
                    fill="hsla(223,10%,10%,0.2)"
                  />
                  <rect
                    height={2}
                    width={30}
                    y={13}
                    fill="hsla(223,10%,10%,0.2)"
                  />
                </g>
              </g>
              <g
                transform="rotate(-90) translate(49,-30)"
                className="pencil__point"
              >
                <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)" />
                <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)" />
                <polygon points="15 0,20 10,10 10" fill="hsl(223,10%,10%)" />
              </g>
            </g>
          </svg>
        </main>
        <Footer />
      </>
    );
  }
  // end loading
  if (error) {
    return <></>;
  }
  // end error

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Tasks </title>
            <meta name="description" content="This section show your tasks" />
            <style type="text/css">{`
       
     
            
        `}</style>
          </Helmet>
          <Header Showmodal = {Showmodal} />
          <main>
            <Alltask
              user={user}
              Showmodal={Showmodal}
              showupdateinput={showupdateinput}
            />
            {/* end */}

            {showmodal && (
              <Modal closemodal={closemodal}>
                <div className="parent-add-task-modal">
                  <input
                    className="input-style"
                    autoComplete="off"
                    id="addtitle"
                    placeholder={t('addtitle')}
                    type="text"
                    value={taskTitle}
                    onChange={(eo) => {
                      settitle(eo.target.value);
                    }}
                  />
                  <div className="container-input-button">
                    <input
                      className="input-style"
                      autoComplete="off"
                      value={arrayitem}
                      placeholder={t('details')}
                      ref={inputElement}
                      type="text"
                      id="addtask"
                      onChange={(eo) => {
                        setitem(eo.target.value);
                      }}
                    />
                    <button
                      className="green-btn"
                      onClick={(eo) => {
                        addBtn(eo);
                      }}
                    >
                    {t('addbtn')}
                    </button>
                  </div>

                  <ul id="array-details">
                    {array.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <button
                    className="green-btn"
                    onClick={async (eo) => {
                      submitBtn(eo);
                    }}
                  >
                    {showLoading ? (
                      <ReactLoading
                        type={"spin"}
                        color={"white"}
                        height={20}
                        width={20}
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </Modal>
            )}

            <div
              className="container-taskadded"
              style={{
                right: showMessage ? "20px" : "-100vw",
              }}
            >
              <p className="taskadded">task added</p>
              <i class="fa-regular fa-circle-check"></i>
            </div>
          </main>
          <Footer />
        </>
      );
    }
  }
  // end user  email verified
};

export default Task;
