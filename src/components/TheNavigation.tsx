import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWebConfig } from "@/hooks/useWebConfig";
import { type TFunction } from "i18next";
import { useRef, useState } from "react";

import logo from "@/assets/logo.png";
import { useUserData } from "@/hooks/useUserData";
import { useBasket } from "@/hooks/useBasket";

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
	const { userData, userIsFetched } = useUserData();
	const { items } = useBasket();
	const basketBtn = useRef<HTMLAnchorElement>(null);

	window.addEventListener("basket:update", () => {
		const data = JSON.parse(localStorage.getItem("basket") || "[]");
		if (!basketBtn.current) return;
		basketBtn.current.classList.toggle("btn--basket--active", data.length > 0);
	});

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

			<div className="cHeader__component cHeader__clientZone">
				<NavLink to={`/muj-ucet`} className="cHeader__component__link">
					<span className="cHeader__clientZone__icon">
						<svg
							width="14"
							height="16"
							viewBox="0 0 14 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12.895 14.413V12.895C12.895 12.0898 12.5751 11.3176 12.0058 10.7482C11.4364 10.1789 10.6642 9.85901 9.859 9.85901H3.786C2.9808 9.85901 2.20858 10.1789 1.63922 10.7482C1.06986 11.3176 0.75 12.0898 0.75 12.895V14.413"
								fill="#EE1D23"
								stroke="#EE1D23"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"></path>
							<path
								d="M9.85899 3.786C9.85899 4.38642 9.68096 4.97336 9.3474 5.47261C9.01384 5.97185 8.53975 6.36099 7.98505 6.5908C7.43035 6.82062 6.81996 6.8808 6.23106 6.76374C5.64216 6.64667 5.1012 6.35762 4.67657 5.93313C4.25193 5.50864 3.9627 4.96777 3.84545 4.37891C3.72819 3.79005 3.78817 3.17964 4.0178 2.62487C4.24744 2.07009 4.63641 1.59586 5.13555 1.26214C5.63469 0.928424 6.22157 0.750198 6.82199 0.75C7.22077 0.749869 7.61566 0.8283 7.98412 0.980815C8.35258 1.13333 8.68739 1.35694 8.96941 1.63887C9.25144 1.9208 9.47516 2.25553 9.62779 2.62394C9.78043 2.99235 9.85899 3.38722 9.85899 3.786Z"
								fill="#EE1D23"
								stroke="#EE1D23"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"></path>
						</svg>

						<div className="client-info">
							{userIsFetched && (
								<>
									<span>
										{`${userData.contact.name} ${userData.contact.surname}`}
									</span>
									<span>{userData.account.name}</span>
								</>
							)}
						</div>
					</span>
				</NavLink>
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
				<NavLink
					className={`nav__item__in btn--basket ${
						items.length > 0 ? "btn--basket--active" : ""
					}`}
					to="/kosik"
					ref={basketBtn}>
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
						<NavLink className="btn btn--cta" to="/kosik">
							{t("kosik")}
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
