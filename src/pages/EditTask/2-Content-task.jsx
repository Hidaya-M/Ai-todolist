import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/config";
import Moment from "react-moment";
import ReactLoading from "react-loading";
import { Buttonblue } from "../../comp/Buttons/Buttons";
import { useState } from "react";
import { useRef } from "react";
function ContentTask({ user, Userid }) {
  const [value, loading, error] = useDocument(doc(db, user.uid, Userid));
  const [showupdatetask, setshowupdatetask] = useState(false);
  const [subTitle, setsubTitle] = useState("");
  const inputElement = useRef(null);
  // showupdateinput for showing the update input-----------------
  const showupdateinput = () => {
    setshowupdatetask(true);
  };
  // completTask for completed task-------------------------------
  const completTask = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, Userid), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, Userid), {
        completed: false,
      });
    }
  };
  // showDetailsTask is for removing your task details
  const removeDetailsTask = async (item) => {
    await updateDoc(doc(db, user.uid, Userid), {
      details: arrayRemove(item),
    });
  };
  const Showmodal = (params) => {
    console.log("");
  };
  // add details on your task-----------------
  const addDeatils = async () => {
    await updateDoc(doc(db, user.uid, Userid), {
      details: arrayUnion(subTitle),
    });

    setsubTitle("");
    inputElement.current.focus();
  };

  if (loading) {
    return (
      <main>
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </main>
    );
  }

  if (value) {
    return (
      <>
        <section className="content-task">
          <div className="time-complet">
            <p className="p-time">
              {" "}
              Created:{" "}
              <Moment
                ago
                fromNow
                date={value.data().id}
                className="moment"
              />{" "}
              ago
            </p>
            <div className="chekbox">
              <input
                style={{ cursor: "pointer" }}
                onChange={async (eo) => {
                  completTask(eo);
                }}
                checked={value.data().completed}
                id="checkbox"
                type="checkbox"
              />
              <label className="label-time" htmlFor="checkbox" style={{ cursor: "pointer" }}>
                Completed{" "}
              </label>
            </div>
          </div>
          {/*1 end  time section------------------------------------------------------*/}

          <div className="content">
            <div className="content-task-container">
              {value.data().details.map((item) => {
                return (
                  <div key={item}> 
                    <p>{item}</p>
                    <i
                      class="fa-solid fa-trash"
                      onClick={async () => {
                        removeDetailsTask(item);
                      }}
                    ></i>
                  </div>
                );
              })}
              {/* end div task */}

              {showupdatetask && (
                <div
                  style={{ justifyContent: "flex-start", gap: "5px" }}
                  className="update-task"
                >
                  <input
                    type="text"
                    value={subTitle}
                    className="input-style"
                    ref={inputElement}
                    onChange={(eo) => {
                      // @ts-ignore
                      setsubTitle(eo.target.value);
                    }}
                  />
                  <button
                    className="green-btn"
                    onClick={async () => {
                      addDeatils();
                    }}
                  >
                    add
                  </button>
                  <button
                    className="green-btn"
                    onClick={(params) => {
                      setshowupdatetask(false);
                    }}
                  >
                    cancel
                  </button>
                </div>
              )}
              {/* end update div */}
            </div>
          </div>
          {/* 2end content section------------------------------------------------------ */}
          <Buttonblue showupdateinput={showupdateinput} Showmodal={Showmodal} />
          {/* 3end button section----------------------------------------------- */}
        </section>
      </>
    );
  }
}

export default ContentTask;
