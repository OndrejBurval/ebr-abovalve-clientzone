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

const htmlLang = document.querySelector("html")?.getAttribute("lang");

if (htmlLang && htmlLang !== i18next.language) {
	i18next.changeLanguage(htmlLang);
}
