import { useQuery } from "react-query";

import { useTranslation } from "react-i18next";

import Layout from "@/layout";

import OrderTable from "@/components/OrderTable";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";

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
				<h2>{t("objednavky")}</h2>
				{isLoading ? <OrderTableSkeleton /> : <OrderTable items={data} />}
			</section>
		</Layout>
	);
}
