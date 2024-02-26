import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import cs from "./locales/cs.json";
import en from "./locales/en.json";

i18next.use(initReactI18next).init({
	debug: true,
	fallbackLng: "cs",
	resources: {
		cs: {
			translation: cs,
		},
		en: {
			translation: en,
		},
	},
});

const storageLang = localStorage.getItem("lng");

if (storageLang && storageLang !== i18next.language) {
	i18next.changeLanguage(storageLang);
}
