import { useQuery } from "react-query";
import { getOrders } from "./index.hook";

import OrderTable from "@/components/Order/OrderTable";
import OrderTableSkeleton from "@/components/Order/OrderTableSkeleton";

import Layout from "@/layout/Default";

const Root = () => {
	const { data, isLoading, isError, error } = useQuery("orders", getOrders);

	if (isError) {
		return <div> Error: {error instanceof Error ? error.message : ""} </div>;
	}

	return (
		<Layout>
			<h1> Objednávky </h1>
			{isLoading ? <OrderTableSkeleton /> : <OrderTable items={data} />}
		</Layout>
	);
};

export default Root;
