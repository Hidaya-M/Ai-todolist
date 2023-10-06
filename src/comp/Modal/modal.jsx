import React from "react";
import "./modal.css";
// closemodal======> for closing the modal
function Modal({ closemodal, children }) {
  return (
    <div className="parent-forget-form">
      <form className="forget-form">
        <i
          class="fa-solid fa-x"
          onClick={() => {
            closemodal();
          }}
        ></i>
        {children}
      </form>
    </div>
  );
}

export default Modal;
