import { useQuery } from "react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { Order, OrderItem } from "@/types/Order";

type OrderItemsResponse = {
    order: Order;
    orderItems: OrderItem[];
}

const getOrderData = async (id: number): Promise<OrderItemsResponse | null> => {
    const res = await fetch(`/api/platform/custom/order/${id}${import.meta.env.DEV ? '.json' : ''}`)

    if (!res.ok) {
        throw new Error('Orders network response error')
    }
    
    return await res.json();
};

const useOrderDetailPage = (id: number) => {
	const navigate = useNavigate();

	if (isNaN(id)) {
		navigate("/objednavky");
	}

	const { data, isFetched, isLoading } = useQuery(
		`order-${id}`,
		() => getOrderData(id), {
            retry: false,
            refetchOnWindowFocus: false,
        }
	);

	useEffect(() => {
		if (isFetched && !data) {
			alert("Objednávka nenalezena");
			navigate("/objednavky");
		}
	}, [isFetched, data, navigate]);

	return {data, isFetched, isLoading };
};

export { useOrderDetailPage };
