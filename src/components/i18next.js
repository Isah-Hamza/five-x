import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../lang/en.json";
import gm from "../lang/gm.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    gm: {
      translation: gm,
    },
  },
  lng: localStorage.getItem("lang") || "en",
});

export default i18next;
