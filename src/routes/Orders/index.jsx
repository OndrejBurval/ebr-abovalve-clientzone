import { useQuery } from "react-query";
import { getOrders } from "./index.hook";

import OrderTable from "@/components/OrderTable";
import OrderTableSkeleton from "@/components/OrderTableSkeleton";

export default function Root() {
	const { data, isLoading, isError, error } = useQuery("orders", getOrders);

	if (isError) {
		return <div> Error: {error.message} </div>;
	}

	return (
		<>
			<h1> Objednávky </h1>
			{isLoading ? <OrderTableSkeleton /> : <OrderTable items={data} />}
		</>
	);
}
