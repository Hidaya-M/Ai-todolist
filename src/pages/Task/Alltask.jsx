import React from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { Buttonblue } from "../../comp/Buttons/Buttons";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
const AllTasksSection = ({ user, Showmodal, showupdateinput }) => {
  const allTasks = query(collection(db, user.uid), orderBy("id"));
  const [initialData, setinitialData] = useState(allTasks);
  const [value, loading, error] = useCollection(initialData);
  const [fullopacity, setfullopacity] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectValue, setselectValue] = useState("aaa");
  const completedTasks = query(
    collection(db, user.uid),
    where("completed", "==", true)
  );
  const notCompleted = query(
    collection(db, user.uid),
    where("completed", "==", false)
  );

  const selectChangingTasks = (eo) => {
    if (eo.target.value === "aaa") {
      setfullopacity(false);
      setselectValue("aaa");
      setinitialData(allTasks);
    } else if (eo.target.value === "bbb") {
      setselectValue("bbb");
      setinitialData(completedTasks);
    } else if (eo.target.value === "ccc") {
      setselectValue("ccc");
      setinitialData(notCompleted);
    }
  };

  const newestbtn = () => {
    setinitialData(
      query(collection(db, user.uid), orderBy("id", "desc"))
    );
    setfullopacity(true);
  }

  const oldestbtn = () => {
    setinitialData(
      query(collection(db, user.uid), orderBy("id", "asc"))
    );
    setfullopacity(false);
  }
  
  

  if (error) {
    return (
      <p>
        Please check your internet connection and try again. If the problem
        persists, please contact support.
      </p>
    );
  }

  if (loading) {
    return (
      <section style={{ marginTop: "20px" }}>
        <ReactLoading type={"spin"} color={"red"} height={87} width={87} />
      </section>
    );
  }

  if (value) {
    return (
      <>
        <section className="button-tasks">
          {selectValue === "aaa" && (
            <div>
              <button
                id="newest-button"
                style={{ opacity: fullopacity ? "1" : "0.3" }}
                onClick={(params) => {
                  newestbtn()
                }}
              >
              {t('NewestFirst')}
              </button>

              <button
                id="oldest-button"
                style={{ opacity: fullopacity ? "0.3" : "1" }}
                onClick={(params) => {
                oldestbtn()
                }}
              >
              {t('OldestFirst')}
              </button>
            </div>
          )}
          <select
            value={selectValue}
            onChange={(eo) => {
              selectChangingTasks(eo);
            }}
          >
            <option value="aaa">{t('AllTasks')}</option>
            <option value="bbb">{t('Completed')}</option>
            <option value="ccc">{t('Notcompleted')}</option>
          </select>
        </section>

        <section className="article-tasks">
          {value.docs.map((item) => {
            return (
              <Link key={item} to={`/edit/${item.data().id}`}>
                <article dir="auto" className="one-task">
                  <h2 className="article-title"> {item.data().title}</h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li>- {item} </li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  <div className="task-time" >
                    {" "}
                    <Moment className="moment"  ago fromNow date={item.data().id} /> ago
                  </div>
                </article>
              </Link>
            );
          })}
        </section>
        <Buttonblue Showmodal={Showmodal} showupdateinput={showupdateinput} />
      </>
    );
  }
};

export default AllTasksSection;
