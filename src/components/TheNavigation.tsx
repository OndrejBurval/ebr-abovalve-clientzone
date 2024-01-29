import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navigation = () => {
	const { t, i18n } = useTranslation();

	return (
		<header>
			<nav className="flex gap-5">
				<Link to="/muj-ucet">{t("mujUcet")}</Link>
				<Link to="/muj-ucet">{t("registracniUdaje")}</Link>
				<Link to="/objednavky">{t("objednavky")}</Link>
				<Link to="/muj-ucet">{t("reklamace")}</Link>
				<Link to="/muj-ucet">{t("odhlasitSe")}</Link>

				<button onClick={() => i18n.changeLanguage("en")}>lang</button>
			</nav>
		</header>
	);
};

export default Navigation;
