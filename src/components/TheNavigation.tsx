import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWebConfig } from "@/hooks/useWebConfig";
import { type TFunction } from "i18next";
import { useState } from "react";

import logo from "@/assets/logo.png";

const Navigation = () => {
	const { t, i18n } = useTranslation();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	window.addEventListener("resize", () => {
		setWindowWidth(window.innerWidth);
	});

	const toggleLanguage = () =>
		i18n.changeLanguage(i18n.language === "en" ? "cs" : "en");

	return (
		<header className="cHeader">
			{windowWidth > 768 ? (
				<DescHeader
					lang={i18n.language}
					t={t}
					onLanguageChange={toggleLanguage}
				/>
			) : (
				<MobileHeader
					lang={i18n.language}
					t={t}
					onLanguageChange={toggleLanguage}
				/>
			)}
		</header>
	);
};

type NavItemsProps = {
	t: TFunction<"translation">;
	lang: string;
};
const NavItems = ({ t, lang }: NavItemsProps) => {
	const { produktyLink } = useWebConfig();

	return (
		<ul className="nav">
			<li className="nav__item">
				<a className="nav__item__in" href={produktyLink || "/"}>
					{t("produktovyKatalog")}
				</a>
			</li>
			<li className="nav__item">
				<NavLink className="nav__item__in" to="/muj-ucet">
					{t("prehled")}
				</NavLink>
			</li>
			<li className="nav__item">
				<NavLink className="nav__item__in" to="/registracni-udaje">
					{t("registracniUdaje")}
				</NavLink>
			</li>
			<li className="nav__item">
				<NavLink className="nav__item__in" to="/objednavky">
					{t("objednavky")}
				</NavLink>
			</li>
			<li className="nav__item">
				<NavLink className="nav__item__in" to="/reklamace">
					{t("reklamace")}
				</NavLink>
			</li>

			<li className="nav__item">
				<a className="nav__item__in" href={`/clientzone_logout/${lang}`}>
					{t("odhlasitSe")}
				</a>
			</li>
		</ul>
	);
};

type DescHeaderProps = {
	t: TFunction<"translation">;
	lang: string;
	onLanguageChange?: () => void;
};

const DescHeader = ({ t, lang, onLanguageChange }: DescHeaderProps) => {
	return (
		<div className="cHeader__inner">
			<div className="cHeader__component cHeader__logo">
				<a href="/" className="cHeader__link" title="Zpět na hlavní stranu">
					<img alt="logo" title="logo" src={logo} />
				</a>
			</div>

			<div className="cHeader__component cHeader__mainNav">
				<NavItems t={t} lang={lang} />
			</div>

			<div className="cHeader__component cHeader__lang none">
				<div
					className="cLang cLang--iconOnly cLang--drop _p _iA js__langswitch "
					data-a-init-langswitch='{"c.init": {}}'>
					<a
						onClick={onLanguageChange}
						href="#"
						className="drop-holder cLang--cs js__toogle_langswitch--open cLang--active">
						<span className="cLang__title">{lang === "cs" ? "CZ" : "EN"}</span>
					</a>
				</div>
			</div>

			<div className="cHeader__component cHeader__cta">
				<NavLink className="nav__item__in" to="/kosik">
					{t("kosik")}
				</NavLink>
			</div>
		</div>
	);
};

const MobileHeader = ({ t, lang }: DescHeaderProps) => {
	const [active, setActive] = useState(false);

	return (
		<div className="mobileHeader">
			<div className="mobileHeader__toolbar">
				<div className="mobileHeader__toolbar__component mobileHeader__logo">
					<div className="cHeader__logo">
						<a href="/" className="cHeader__link" title="Zpět na hlavní stranu">
							<img alt="logo" title="logo" src={logo} />
						</a>
					</div>
				</div>

				<div className="mobileHeader__toolbar__component mobileHeader__iconBar">
					<div className="mobileHeader__iconBar__item">
						<div
							className="cHamburger mobileHeader__menuHandler js__mobileMenuHandler"
							onClick={() => setActive(!active)}>
							<div className="cHamburger__line cHamburger__line--top"></div>
							<div className="cHamburger__line cHamburger__line--center"></div>
							<div className="cHamburger__line cHamburger__line--bottom"></div>
						</div>
					</div>
				</div>
			</div>

			<div className="mm-panels mm-vertical">
				<div
					className={`mobileHeader__inner mm-vertical mm-panel ${
						active ? "active" : ""
					}`}>
					<div className="mobileHeader__component mobileHeader__component--mainNav">
						<NavItems t={t} lang={lang} />
					</div>

					<div className="mobileHeader__component mobileHeader__component--cta">
						<NavLink className=" btn btn--cta" to="/kosik">
							{t("kosik")}
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
