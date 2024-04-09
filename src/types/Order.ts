type Order = {
    id: number;
    sugar_id: string;
    navision_code: string;
    state: string;
    account_sugar_id: string;
    description: string;
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
    date_modified: string;
    documents: any[];
};

type OrderItem = {
	id: string;
	navision_code: string;
	navision_order_code: string;
	name: string;
	unit: string;
	quantity: number;
	total_cost: number;
	unit_cost: number;
};

export type { Order, OrderItem };
