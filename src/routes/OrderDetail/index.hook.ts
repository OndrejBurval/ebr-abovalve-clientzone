import ordersJson from "@/api/test/orders.json";
import orderItems2 from "@/api/test/orderItems2.json";
import orderItems3 from "@/api/test/orderItems3.json";
import orderItems4 from "@/api/test/orderItems4.json";

import { useQuery } from "react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const orderItemsJsons = [null, orderItems2, orderItems3, orderItems4];

import type { Order, OrderItem } from "@/types/Order";

const getOrder = (id: number): Promise<Order | null> => {
	return new Promise((resolve) => {
		const item = ordersJson.find((item) => item.order.id === id);

		setTimeout(() => {
			if (item) {
				resolve(item.order);
			} else {
				resolve(null);
			}
		}, 500);
	});
};

const getOrderItems = (id: number): Promise<OrderItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(orderItemsJsons[id] as OrderItem[]);
		}, 500);
	});
};

const useDetailPage = (id: number) => {
	const navigate = useNavigate();

	if (isNaN(id)) {
		navigate("/objednavky");
	}

	const { data, isLoading, isFetched } = useQuery(
		`orderItems-${id}`,
		() => getOrderItems(id),
		{
			refetchOnWindowFocus: false,
		}
	);

	const { data: orderInfo, isFetched: infoIsFetched } = useQuery(
		`order-${id}`,
		() => getOrder(id),
		{
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		if ((isFetched && !data) || (infoIsFetched && !orderInfo)) {
			alert("Objednávka neexistuje");
			navigate("/objednavky");
		}
	}, [isFetched, data, navigate, orderInfo, infoIsFetched]);

	return { data, isLoading, orderInfo };
};

export { useDetailPage };
