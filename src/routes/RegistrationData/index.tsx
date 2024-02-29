import { useTranslation } from "react-i18next";
import { useUserData } from "@/composables/useUserData";
import { useWebConfig } from "@/composables/useWebConfig";

import Layout from "@/layout";

import Card from "@/components/ui/Card";
import UserCard from "@/components/UserCard";
import DeliveryAddress from "@/components/DeliveryAddress";
import BillingAddress from "@/components/BillingAddress";
import PhoneSvg from "@/components/svg/Phone";
import MailSvg from "@/components/svg/Mail";
import AccountSvg from "@/components/svg/Account";
import Pen from "@/components/svg/Pen";

const RegistrationData = () => {
	const { userData, userIsLoading } = useUserData();
	const { t } = useTranslation();
	const { formLink } = useWebConfig();

	return (
		<Layout title={t("registracniUdaje")}>
			<section
				className={`registrationData--wrapper ${
					!userData?.user ? "noUserData" : ""
				}`}>
				<Card
					isLoading={userIsLoading}
					className="card--basicInfo userData--contact userData--info">
					{!userIsLoading && userData.contact && (
						<ul>
							<li>
								<AccountSvg />

								<p>{`${userData.contact.name} ${userData.contact.surname}`}</p>
							</li>

							<li>
								<MailSvg />
								<p>
									{userData.contact.email ? (
										<a href={`mailto:${userData.contact.email || ""}`}>
											{userData.contact.email}
										</a>
									) : (
										"--"
									)}
								</p>
							</li>

							{userData.contact.phone && (
								<li>
									<PhoneSvg />
									<p>
										{userData.contact.phone ? (
											<a
												href={`tel:${userData.contact.phone.replace(
													/\s/g,
													""
												)}`}>
												{userData.contact.phone}
											</a>
										) : (
											"--"
										)}
									</p>
								</li>
							)}

							<a href={formLink} className="btn">
								{t("zmenitHeslo")}
							</a>
						</ul>
					)}
				</Card>

				<Card
					title={t("zakladniPrehled")}
					className="card--basicOverview "
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

				<Card
					title={t("kontaktniUdaje")}
					isLoading={userIsLoading}
					className="userData--contact userData--info card--contact">
					{!userIsLoading && userData.contact && (
						<>
							<ul>
								<Pen link="/kontakt-udaje" />
								<li>
									<AccountSvg />

									<p>
										{`${userData.contact.name} ${userData.contact.surname}`}
									</p>
								</li>

								<li>
									<MailSvg />
									<p>
										{userData.contact.email ? (
											<a href={`mailto:${userData.contact.email || ""}`}>
												{userData.contact.email}
											</a>
										) : (
											"--"
										)}
									</p>
								</li>
								{userData.contact.phone && (
									<li>
										<PhoneSvg />
										<p>
											{userData.contact.phone ? (
												<a
													href={`tel:${userData.contact.phone.replace(
														/\s/g,
														""
													)}`}>
													{userData.contact.phone}
												</a>
											) : (
												"--"
											)}
										</p>
									</li>
								)}
							</ul>
						</>
					)}
				</Card>

				<Card isLoading={userIsLoading} className="userData--connected">
					{!userIsLoading && userData.account && (
						<>
							<div className="billing">
								<strong>{t("fakturacniAdresa")}</strong>
								<BillingAddress
									data={userData.account}
									disableEdit={!userData.account.portal_priv_admin}
								/>
							</div>

							<div className="delivery">
								<strong> {t("dorucovaciAdresa")}</strong>
								<DeliveryAddress
									data={userData.account}
									disableEdit={!userData.account.portal_priv_admin}
								/>
							</div>
						</>
					)}
				</Card>

				{!userIsLoading && userData.user && (
					<Card>
						<UserCard user={userData.user} />
					</Card>
				)}
			</section>
		</Layout>
	);
};

export default RegistrationData;
