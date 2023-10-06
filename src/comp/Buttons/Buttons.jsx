import React from "react";
import "./Button.css";
import { useTranslation } from 'react-i18next';

export function Buttonblue({ Showmodal, showupdateinput }) {
  const { t, i18n } = useTranslation();
  const handleClick = () => {
    showupdateinput();
    Showmodal();
  };

  return (
    <section className="add-tasks">
      <button class="c-button" onClick={handleClick}>
        <span class="c-main">
          <span class="c-ico">
            <span class="c-blur"></span> <span class="ico-text">+</span>
          </span>
          {t('addtask')}
        </span>
      </button>
    </section>
  );
}
// end blue button
export function Buttonred({ children, Delateuser, deleteBTN }) {
  return (
    <button
      class="btn-red"
      onClick={() => {
        Delateuser();
        deleteBTN();
      }}
    >
      {children}
    </button>
  );
}
// end red button