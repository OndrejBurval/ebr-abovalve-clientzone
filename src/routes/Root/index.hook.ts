import ordersJson from "@/api/test/orders.json";

import type { Order } from "@/types/Order";

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

export { getOrders };
