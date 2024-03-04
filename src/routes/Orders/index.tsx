import { useOrdersPage } from "./index.hook";
import { useTranslation } from "react-i18next";

import OrderTable from "@/components/OrderTable";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";

import Layout from "@/layout";

const Orders = () => {
	const { t } = useTranslation();
	const { data, isLoading, nextPage, setYearFilter } = useOrdersPage();

	return (
		<Layout title={t("objednavky")}>
			{isLoading ? (
				<OrderTableSkeleton />
			) : (
				<OrderTable
					items={data}
					onLoadMore={nextPage}
					onYearSelect={setYearFilter}
					showFilter
				/>
			)}
		</Layout>
	);
};

export default Orders;
