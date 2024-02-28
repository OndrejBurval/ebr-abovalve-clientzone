import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWebConfig } from "@/composables/useWebConfig";

import logo from "@/assets/logo.png";

const Navigation = () => {
	const { produktyLink } = useWebConfig();
	const { t, i18n } = useTranslation();

	const toggleLanguage = () =>
		i18n.changeLanguage(i18n.language === "en" ? "cs" : "en");

	return (
		<header className="cHeader">
			<div className="cHeader__inner">
				<div className="cHeader__component cHeader__logo">
					<a href="/" className="cHeader__link" title="Zpět na hlavní stranu">
						<img alt="logo" title="logo" src={logo} />
					</a>
				</div>

				<div className="cHeader__component cHeader__mainNav">
					<ul className="nav">
						<li className="nav__item">
							<a className="nav__item__in" href={produktyLink || "/"}>
								{t("produktovyKatalog")}
							</a>
						</li>
						<li className="nav__item">
							<Link className="nav__item__in" to="/muj-ucet">
								{t("mujUcet")}
							</Link>
						</li>
						<li className="nav__item">
							<Link className="nav__item__in" to="/registracni-udaje">
								{t("registracniUdaje")}
							</Link>
						</li>
						<li className="nav__item">
							<Link className="nav__item__in" to="/objednavky">
								{t("objednavky")}
							</Link>
						</li>
						<li className="nav__item">
							<Link className="nav__item__in" to="/reklamace">
								{t("reklamace")}
							</Link>
						</li>

						<li className="nav__item">
							<a
								className="nav__item__in"
								href={`/clientzone_logout/${i18n.language}`}>
								{t("odhlasitSe")}
							</a>
						</li>
					</ul>
				</div>

				<div className="cHeader__component cHeader__lang">
					<div
						className="cLang cLang--iconOnly cLang--drop _p _iA js__langswitch "
						data-a-init-langswitch='{"c.init": {}}'>
						<a
							onClick={toggleLanguage}
							href="#"
							className="drop-holder cLang--cs js__toogle_langswitch--open cLang--active">
							<span className="cLang__title">
								{i18n.language === "cs" ? "CZ" : "EN"}
							</span>
						</a>
					</div>
				</div>

				<div className="cHeader__component cHeader__cta">
					<Link className="nav__item__in" to="/kosik">
						{t("kosik")}
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
