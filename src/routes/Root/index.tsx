import { useQuery } from "react-query";

import { useTranslation } from "react-i18next";

import Layout from "@/layout";

import OrderTable from "@/components/OrderTable";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";
import UserCard from "@/components/UserCard";

import { getOrders } from "./index.hook";
import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";

export default function Root() {
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
						<UserCard
							title={t("vasObchodniZastupce")}
							name="Jaroslav Novák"
							phone="777 666 777"
							email="jaroslav-novak@email.cz"
						/>
					</Card>
				</div>
			</section>
		</Layout>
	);
}
