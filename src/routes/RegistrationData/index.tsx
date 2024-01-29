import { useTranslation } from "react-i18next";

import Layout from "@/layout";

import Card from "@/components/ui/Card";
import UserCard from "@/components/UserCard";

const RegistrationData = () => {
	const { t } = useTranslation();

	return (
		<Layout title={t("registracniUdaje")}>
			<section className="registrationData--wrapper">
				<Card>
					<strong>eBRANA s.r.o.</strong>
					<ul>
						<li>Jan Novak</li>
						<li>novak@seznam.cz</li>
					</ul>
				</Card>

				<Card title={t("zakladniPrehled")}>
					<ul>
						<li>
							<span>{t("fakturyTentoRokCelkem")}</span>
							<span>-</span>
						</li>
						<li>
							<span>{t("fakturyPoSplatnosti")}</span>
							<span>-</span>
						</li>
						<li>
							<span>{t("rozpracovaneObjednavky")}</span>
							<span>-</span>
						</li>
					</ul>
				</Card>

				<Card title={t("kontaktniUdaje")}>
					<ul>
						<li>sekretářka</li>
						<li>Jan Novák</li>
						<li>
							<a href="tel:+420666666666">666 666 666</a>
						</li>
						<li>
							<a href="mailto:novak@seznam.cz"> novak@seznam.cz</a>
						</li>
					</ul>
				</Card>

				<Card title={t("fakturacniAdresa")}>
					<ul>
						<li>eBRÁNA s.r.o.</li>
						<li>Milheimova 1010</li>
						<li>Pardubice 530 02</li>
						<li>Česká republika</li>
						<li>259 90 99, CZ2525252</li>
						<li>
							<a href="mailto:novak@seznam.cz">novak@seznam.cz</a>
						</li>
					</ul>
				</Card>

				<Card title={t("dorucovaciAdresa")}>
					<ul>
						<li>eBRÁNA s.r.o.</li>
						<li>Milheimova 1010</li>
						<li>Pardubice 530 02</li>
						<li>Česká republika</li>
					</ul>
				</Card>

				<UserCard
					title="Váš obchodní zástupce"
					name="Jaroslav Novák"
					phone="777 666 777"
					email="jaroslav-novak@email.cz"
				/>
			</section>
		</Layout>
	);
};

export default RegistrationData;
