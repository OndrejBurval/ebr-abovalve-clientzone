import { useQuery } from "react-query";

import { useTranslation } from "react-i18next";

import Layout from "@/layout";

import OrderTable from "@/components/OrderTable";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";
import UserCard from "@/components/UserCard";

import { getOrders } from "./index.hook";

export default function Root() {
	const { data, isLoading, isError, error } = useQuery("orders", getOrders);

	const { t } = useTranslation();

	if (isError) {
		return <div> Error: {error instanceof Error ? error.message : ""} </div>;
	}

	return (
		<Layout>
			<h1> {t("mujUcet")} </h1>

			<section>
				<div>
					<h2>{t("objednavky")}</h2>
					{isLoading ? <OrderTableSkeleton /> : <OrderTable items={data} />}
				</div>

				<div>
					<UserCard
						title="Váš obchodní zástupce"
						name="Jaroslav Novák"
						phone="777 666 777"
						email="jaroslav-novak@email.cz"
					/>
				</div>
			</section>
		</Layout>
	);
}
