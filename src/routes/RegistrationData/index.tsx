import { useTranslation } from "react-i18next";
import { useUserData } from "@/composables/useUserData";
import { useWebConfig } from "@/composables/useWebConfig";

import Layout from "@/layout";

import Card from "@/components/ui/Card";
import UserCard from "@/components/UserCard";
import Pen from "@/components/svg/Pen";
import DeliveryAddress from "@/components/DeliveryAddress";
import BillingAddress from "@/components/BillingAddress";

const RegistrationData = () => {
	const { userData, userIsLoading } = useUserData();
	const { t } = useTranslation();
	const { formLink } = useWebConfig();

	return (
		<Layout title={t("registracniUdaje")}>
			<section className="registrationData--wrapper">
				<Card isLoading={userIsLoading}>
					{!userIsLoading && userData.user && (
						<ul>
							<>
								<li>
									{`${userData.user.first_name} ${userData.user.last_name}`}
								</li>
								<li>
									<a href={`mailto:${userData.user.email}`}>
										{userData.user.email}
									</a>
								</li>
								<li>
									<a
										href={formLink || "/muj-ucet-form"}
										className="btn btn--primary">
										{t("zmenitHeslo")}
									</a>
								</li>
							</>
						</ul>
					)}
				</Card>

				<Card
					title={t("zakladniPrehled")}
					className="card--basicOverview"
					isLoading={userIsLoading}>
					{!userIsLoading && userData.account && (
						<ul>
							<li className="info">
								<span>{t("fakturyTentoRokCelkem")}</span>
								<span> {userData.account.invoice_balance_due_total || 0} </span>
							</li>
							<li className="info">
								<span>{t("fakturyPoSplatnosti")}</span>
								<span> -</span>
							</li>
							<li className="info">
								<span>{t("rozpracovaneObjednavky")}</span>
								<span>-</span>
							</li>
						</ul>
					)}
				</Card>

				<Card title={t("kontaktniUdaje")} isLoading={userIsLoading}>
					{!userIsLoading && userData.user && (
						<>
							<Pen link={formLink || "/muj-ucet-form"} />

							<ul>
								<li>
									{`${userData.user.first_name} ${userData.user.last_name}`}
								</li>
								<li>
									<a href={`tel:${userData.user.phone.replace(/\s/g, "")}`}>
										{userData.user.phone}
									</a>
								</li>
								<li>
									<a href={`mailto:${userData.user.email.replace(/\s/g, "")}`}>
										{userData.user.email}
									</a>
								</li>
							</ul>
						</>
					)}
				</Card>

				<Card title={t("fakturacniAdresa")} isLoading={userIsLoading}>
					{!userIsLoading && userData.account && (
						<>
							<Pen link={formLink || "/muj-ucet-form"} />
							<BillingAddress data={userData.account} />
						</>
					)}
				</Card>

				<Card title={t("dorucovaciAdresa")} isLoading={userIsLoading}>
					{!userIsLoading && userData.account && (
						<>
							<Pen link={formLink || "/muj-ucet-form"} />
							<DeliveryAddress data={userData.account} />
						</>
					)}
				</Card>

				<Card>
					{!userIsLoading ? (
						<UserCard contact={userData.contact} />
					) : (
						<UserCard isLoading={true} />
					)}
				</Card>
			</section>
		</Layout>
	);
};

export default RegistrationData;
