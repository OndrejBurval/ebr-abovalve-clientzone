import { useTranslation } from "react-i18next";
import { useUserData } from "@/hooks/useUserData";

import Layout from "@/layout";

import OrderTable from "@/components/OrderTable";
import UserCard from "@/components/UserCard";
import Card from "@/components/ui/Card";

import { Link } from "react-router-dom";
import ProductBoxList from "@/components/ProductBoxList";
import Breadcrumb from "@/components/Breadcrumb";
import { useWebConfig } from "@/hooks/useWebConfig";
import useCurrency from "@/hooks/useCurrency";
import { getPaymentTerm } from "@/data/payment";

export default function Root() {
	const { t } = useTranslation();
	const { userData, userIsLoading } = useUserData();

	return (
		<Layout title={t("klientskaZona")} header={<BuyNowNav />}>
			<Breadcrumb />

			<section className="clientZone--dashboard">
				<Card
					title={t("zakladniPrehled")}
					className="card--basicOverview "
					isLoading={userIsLoading}>
					{!userIsLoading && userData.account && (
						<ul>
							<li className="info">
								<span>{t("zakladniSleva")}</span>
								<span>
									{userData.account.default_discount
										? userData.account.default_discount
										: "0"}
									%
								</span>
							</li>
							<li className="info">
								<span>{t("hodnotaFakturPoSplatnosti")}</span>
								<span>
									{userData.account.invoice_balance_due_total
										? useCurrency(userData.account.invoice_balance_due_total)
										: "0"}
								</span>
							</li>
							<li className="info">
								<span>{t("rozpracovaneObjednavky")}</span>
								<span>
									{isNaN(userData.account.open_opportunities_count)
										? "-"
										: useCurrency(userData.account.open_opportunities_count)}
								</span>
							</li>
							{userData.account.payment_code && (
								<li className="info">
									<span>{t("platebniPodminky")}</span>
									<span>
										{t(getPaymentTerm(userData.account.payment_code))}
									</span>
								</li>
							)}
						</ul>
					)}
				</Card>

				<div className="clientZone--dashboard--orders">
					<Card>
						<OrderTable limit={4} page="root" />
						<Link to="/objednavky">{t("dalsiObjednavky")}</Link>
					</Card>
				</div>
				<div className="clientZone--dashboard--userCard">
					<Card>
						<UserCard isLoading={userIsLoading} user={userData?.user} />
					</Card>
				</div>
			</section>

			<section>
				<ProductBoxList />
			</section>
		</Layout>
	);
}

const BuyNowNav = () => {
	const { produktyLink } = useWebConfig();
	const { t } = useTranslation();

	return (
		<a href={produktyLink} className="btn btn--primary btn--shopNow">
			{t("nakupovatNyni")}
		</a>
	);
};
