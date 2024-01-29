import ordersJson from "@/api/test/orders.json";
import orderItems2 from "@/api/test/orderItems2.json";
import orderItems3 from "@/api/test/orderItems3.json";
import orderItems4 from "@/api/test/orderItems4.json";

const orderItemsJsons = [null, orderItems2, orderItems3, orderItems4];

import type { Order, OrderItem } from "@/types/Order";

type ResponseItem = {
	order: Order;
	orderItems: {
		"@id": string;
	};
};

const getOrders = (): Promise<ResponseItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(ordersJson);
		}, 500);
	});
};

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

export { getOrders, getOrder, getOrderItems };
