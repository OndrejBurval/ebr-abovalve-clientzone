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
		const limit = 3;

		setTimeout(() => {
			resolve(ordersJson.slice(0, limit));
		}, 500);
	});
};

export { getOrders };
