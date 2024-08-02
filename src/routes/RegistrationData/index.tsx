import { useTranslation } from "react-i18next";
import { useUserData } from "@/hooks/useUserData";
import { useWebConfig } from "@/hooks/useWebConfig";

import Layout from "@/layout";

import Card from "@/components/ui/Card";
import UserCard from "@/components/UserCard";
import DeliveryAddress from "@/components/DeliveryAddress";
import BillingAddress from "@/components/BillingAddress";
import PhoneSvg from "@/components/svg/Phone";
import MailSvg from "@/components/svg/Mail";
import AccountSvg from "@/components/svg/Account";
import CitySvg from "@/components/svg/City";
import Pen from "@/components/svg/Pen";
import Breadcrumb from "@/components/Breadcrumb";

const RegistrationData = () => {
	const { userData, userIsLoading } = useUserData();
	const { t } = useTranslation();
	const { formLink } = useWebConfig();

	return (
		<Layout title={t("registracniUdaje")}>
			<Breadcrumb
				links={[{ href: "/registracni-udaje", label: t("registracniUdaje") }]}
			/>

			<section
				className={`registrationData--wrapper ${
					!userData?.user ? "noUserData" : ""
				}`}>
				<div className="smallCards">
					<Card
						isLoading={userIsLoading}
						className="card--basicInfo userData--contact userData--info">
						<Pen link="/kontakt-udaje" />

						{!userIsLoading && userData.contact && (
							<ul>
								<li>
									<AccountSvg />

									<p>
										{`${userData.contact.name} ${userData.contact.surname}`}
										<span>{userData.contact.title}</span>
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

								<a href={formLink} className="btn">
									{t("zmenitHeslo")}
								</a>
							</ul>
						)}
					</Card>

					<Card
						title={t("spolecnost")}
						isLoading={userIsLoading}
						className="userData--contact userData--info card--contact">
						{!userIsLoading && userData.contact && (
							<>
								<ul>
									<li>
										<CitySvg />

										<p>{`${userData.account.name}`}</p>
									</li>

									{userData.account.phone_office && (
										<li>
											<PhoneSvg />
											<p>
												{userData.account.phone_office ? (
													<a
														href={`tel:${userData.account.phone_office.replace(
															/\s/g,
															""
														)}`}>
														{userData.account.phone_office}
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
				</div>

				<Card isLoading={userIsLoading} className="userData--connected">
					{!userIsLoading && userData.account && (
						<>
							<div className="billing">
								<strong>{t("fakturacniAdresa")}</strong>
								<BillingAddress
									data={userData.account}
									disableEdit={!userData.contact.portal_priv_admin}
								/>
							</div>

							<div className="delivery">
								<strong> {t("dorucovaciAdresa")}</strong>
								<DeliveryAddress
									data={userData.account}
									disableEdit={!userData.contact.portal_priv_admin}
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
