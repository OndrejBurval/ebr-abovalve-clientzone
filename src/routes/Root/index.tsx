import { useTranslation } from "react-i18next";
import { useUserData } from "@/composables/useUserData";

import Layout from "@/layout";

import OrderTable from "@/components/OrderTable";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";
import UserCard from "@/components/UserCard";
import Card from "@/components/ui/Card";

import { useRootPage } from "./index.hook";
import { Link } from "react-router-dom";

export default function Root() {
	const { t } = useTranslation();
	const { userData, userIsLoading, userIsFetched } = useUserData();
	const { data, isLoading } = useRootPage();

	return (
		<Layout title={t("klientskaZona")}>
			<section className="clientZone--dashboard">
				<div className="clientZone--dashboard--orders">
					<Card>
						<h3>{t("objednavky")}</h3>
						{isLoading ? <OrderTableSkeleton /> : <OrderTable items={data} />}
						<Link to="/objednavky">{t("dalsiObjednavky")}</Link>
					</Card>
				</div>

				<div className="clientZone--dashboard--userCard">
					{userIsLoading && (
						<Card>
							<UserCard isLoading={true} />
						</Card>
					)}
					{!userIsLoading && userIsFetched && userData?.user && (
						<Card>
							<UserCard user={userData?.user} />
						</Card>
					)}
				</div>
			</section>
		</Layout>
	);
}
