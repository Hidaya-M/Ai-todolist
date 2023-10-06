import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "sign-out": "signout" ,
      "Profile" : "Profile" ,
      "Language	" : "	Lang",
      "tasks": "Tasks ",
      "NewestFirst" : "Newest First	",
      "AllTasks" : " All Tasks",
      "OldestFirst" : "Oldest First ",
      "Completed" : " Completed",
      "Notcompleted": "Not Completed ",
      "addtask" : "Add Task",
      "addtitle" :"Add title",
      "details" :"Details",
      "addbtn" :"add",
      "deleteaccount" :"DELETE ACCOUNT",
    }
  },
  fr: {
    translation: {
      "sign-out": "deco",
      "Profile" : "Profil" ,
      "Language	" : "	Lang",
      "tasks": "Tâches",
      "NewestFirst" : "récents",
      "AllTasks" : " Toutes les tâches",
      "OldestFirst" : "anciens  ",
      "Completed" : " Terminées",
      "Notcompleted": "Non terminées ",
      "addtask" : "Ajouter une tâche ",
      "addtitle" :"Ajouter un titre",
      "details" :"Détails",
      "addbtn" :"Ajouter",
      "deleteaccount" :"Supprimer compte",
    }
  },
  ar: {
    translation: {
      "sign-out": " خروج",
      "Profile" : "ملفي" ,
      "Language	" : "	اللغة	",
      "tasks": "مهامي" ,
      "NewestFirst" : "الأحدث",
      "AllTasks" : " جميع المهام",
      "OldestFirst" : "الأقدم ",
      "Completed" : "  مكتملة",
      "Notcompleted": "غير مكتملة ",
      "addtask" : "إضافة مهمة",
      "addtitle" :"أضف عنوانًا",
      "details" :"تفاصيل",
      "addbtn" :"إضافة",
      "deleteaccount" :"حذف حسابي",
    }
  }
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {
      order: ["localStorage", "htmlTag" ],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
