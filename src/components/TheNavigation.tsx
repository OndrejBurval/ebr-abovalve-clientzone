import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navigation = () => {
	const { t, i18n } = useTranslation();

	const toggleLanguage = () =>
		i18n.changeLanguage(i18n.language === "en" ? "cs" : "en");

	return (
		<header className="cHeader">
			<div className="cHeader__inner">
				<div className="cHeader__component cHeader__logo">
					<a href="/" className="cHeader__link" title="Zpět na hlavní stranu">
						<img alt="logo" title="logo" />
					</a>
				</div>

				<div className="cHeader__component cHeader__mainNav">
					<ul className="nav">
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
							<Link className="nav__item__in" to="/muj-ucet">
								{t("odhlasitSe")}
							</Link>
						</li>
					</ul>
				</div>

				<div className="cHeader__component cHeader__cta">
					<button className="btn btn--cta" onClick={toggleLanguage}>
						lang
					</button>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
