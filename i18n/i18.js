import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locale/en.json";
import nor from "../locale/nor.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "nor",
  fallbackLng: "nor",
  resources: {
    en: en,
    nor: nor,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
