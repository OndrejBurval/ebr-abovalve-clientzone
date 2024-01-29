import ordersJson from "@/api/test/orders.json";
import type { Order } from "@/types/Order";

type OrderItem = {
	order: Order;
	orderItems: {
		"@id": string;
	};
};

type Response = OrderItem[];

const getOrders = (): Promise<Response> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(ordersJson);
		}, 500);
	});
};

export { getOrders };
