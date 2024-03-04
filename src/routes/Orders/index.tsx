import { useOrdersPage } from "./index.hook";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { Order } from "@/types/Order";

import OrderTable from "@/components/OrderTable";
import OrderTableFilter from "@/components/OrderTableFilter";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";

import Layout from "@/layout";

const Orders = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const { t } = useTranslation();
	const {
		data,
		isLoading,
		isFetching,
		loadMore,
		setYearFilter,
		years,
		isLoadingYears,
	} = useOrdersPage();

	useEffect(() => {
		if (data) {
			setOrders((oldValue) => [...oldValue, ...data.orders]);
		}
	}, [data]);

	const handleYearSelect = (year: number) => {
		setOrders([]);
		setYearFilter(year);
	};

	return (
		<Layout title={t("objednavky")}>
			{!isLoadingYears && (
				<OrderTableFilter data={years} onYearSelect={handleYearSelect} />
			)}

			{isLoading ? (
				<OrderTableSkeleton />
			) : (
				<OrderTable
					items={orders}
					hasMore={data.totalCount > orders.length}
					isFetching={isFetching && !isLoading}
					onLoadMore={loadMore}
				/>
			)}
		</Layout>
	);
};

export default Orders;
