type Order = {
	id: number;
	navision_code: string;
	state?: string;
	opportunity_id?: string;
	description?: string;
	order_date: string;
	requested_delivery_date: string;
	promised_delivery_date: string;
	due_date: string;
	currency_code: string;
	total_without_vat: number;
	total_with_vat: number;
	total_vat: number;
	shipping_name: string;
	shipping_street: string;
	shipping_city: string;
};

type OrderItem = {
	order: Order;
	orderItems: {
		"@id": string;
	};
};

export type { Order, OrderItem };
