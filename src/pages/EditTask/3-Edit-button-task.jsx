import React from "react";

import { Buttonred } from "../../comp/Buttons/Buttons";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
function EditButtonTask({ user, Userid, deleteBTN }) {
  const [value, loading, error] = useCollection(collection(db, user.uid));
  const Delateuser = () => {
    console.log("");
  };
  if (value) {
    return (
      <section className="edit-button-task">
        <Buttonred deleteBTN={deleteBTN} Delateuser={Delateuser}>
          {" "}
          Delete
        </Buttonred>
      </section>
    );
  }
}

export default EditButtonTask;
