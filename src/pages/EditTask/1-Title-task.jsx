import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useRef } from "react";
function TitleTask({ user, Userid }) {
  const [value, loading, error] = useDocument(doc(db, user.uid, Userid));
  const inputElement = useRef(null);
  // titleInput is for updating the task title ---------------------------
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, Userid), {
      // @ts-ignore
      title: eo.target.value,
    });
  };
  // focusTitle is for make focus on title input
  const focusTitle = (params) => {
    inputElement.current.focus();
  };

  if (value) {
    return (
      <section className="title-task">
        <h1>
          <input
            defaultValue={value.data().title}
            type="text"
            name=""
            style={{
              textDecoration: value.data().completed ? "line-through" : "none",
            }}
            ref={inputElement}
            onChange={(eo) => {
              titleInput(eo);
            }}
          />
          <i
            class="fa-solid fa-pen-to-square"
            style={{ cursor: "pointer" }}
            onClick={() => {
              focusTitle();
            }}
          ></i>
        </h1>
      </section>
    );
  }
}

export default TitleTask;
