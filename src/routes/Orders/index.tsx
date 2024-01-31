import { useQuery } from "react-query";
import { getOrders } from "./index.hook";
import { useTranslation } from "react-i18next";

import OrderTable from "@/components/OrderTable";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";

import Layout from "@/layout";

const Orders = () => {
	const { t } = useTranslation();

	const { data, isLoading } = useQuery("orders", getOrders);

	return (
		<Layout title={t("objednavky")}>
			{isLoading ? <OrderTableSkeleton /> : <OrderTable items={data} />}
		</Layout>
	);
};

export default Orders;
