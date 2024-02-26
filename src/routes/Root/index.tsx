import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { useUserData } from "@/composables/useUserData";

import Layout from "@/layout";

import OrderTable from "@/components/OrderTable";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";
import UserCard from "@/components/UserCard";
import Card from "@/components/ui/Card";

import { getOrders } from "./index.hook";
import { Link } from "react-router-dom";

export default function Root() {
	const { userData, userIsLoading } = useUserData();

	const { data, isLoading, isError, error } = useQuery(
		"orders-limited",
		getOrders
	);

	const { t } = useTranslation();

	if (isError) {
		return <div> Error: {error instanceof Error ? error.message : ""} </div>;
	}

	return (
		<Layout title={t("klientskaZona")}>
			<section className="clientZone--dashboard">
				<div className="clientZone--dashboard--orders">
					<Card>
						<h2>{t("objednavky")}</h2>
						{isLoading ? <OrderTableSkeleton /> : <OrderTable items={data} />}
						<Link to="/objednavky">{t("dalsiObjednavky")}</Link>
					</Card>
				</div>

				<div className="clientZone--dashboard--userCard">
					<Card>
						{!userIsLoading ? (
							<UserCard contact={userData.contact} />
						) : (
							<UserCard isLoading={true} />
						)}
					</Card>
				</div>
			</section>
		</Layout>
	);
}
