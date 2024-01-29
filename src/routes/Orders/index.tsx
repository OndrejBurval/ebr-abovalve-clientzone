import { useQuery } from "react-query";
import { getOrders } from "./index.hook";
import { useTranslation } from "react-i18next";

import OrderTable from "@/components/OrderTable";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";

import Layout from "@/layout";

const Orders = () => {
	const { t } = useTranslation();

	const { data, isLoading, isError, error } = useQuery("orders", getOrders);

	if (isError) {
		return <div> Error: {error instanceof Error ? error.message : ""} </div>;
	}

	return (
		<Layout title={t("objednavky")}>
			{isLoading ? <OrderTableSkeleton /> : <OrderTable items={data} />}
		</Layout>
	);
};

export default Orders;
