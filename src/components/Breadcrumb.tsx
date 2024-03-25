import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type Props = {
	links?: { label: string; href: string }[];
};

const Breadcrumb = ({ links = [] }: Props) => {
	const { t } = useTranslation();
	return (
		<nav className="cCrumb">
			<ol className="nav breadcrumb">
				<li className="cCrumb__item breadcrumb__item" data-breadcrumb="→">
					<div className="cCrumb__item__link">
						<a href="/">ABO valve, s.r.o.</a>
					</div>
				</li>

				{links.length > 0 ? (
					<li className="cCrumb__item breadcrumb__item" data-breadcrumb="→">
						<Link
							to="/muj-ucet"
							title={t("mujUcet")}
							className="cCrumb__item breadcrumb__item">
							<span>{t("mujUcet")}</span>
						</Link>
					</li>
				) : (
					<li className="cCrumb__item breadcrumb__item" data-breadcrumb="→">
						<span className="cCrumb__item breadcrumb__item">
							{t("mujUcet")}
						</span>
					</li>
				)}

				{links.map(({ label, href }, index) => (
					<li
						key={index}
						className="cCrumb__item breadcrumb__item"
						data-breadcrumb="→">
						{index === links.length - 1 ? (
							<span>{label}</span>
						) : (
							<Link to={href} title={label}>
								<span>{label}</span>
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
