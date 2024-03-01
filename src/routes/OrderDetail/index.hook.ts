import { useQuery } from "react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { Order, OrderItem } from "@/types/Order";

const getOrder = async (id: number): Promise<Order | null> => {
    const res = await fetch(`/api/platform/custom/orders${import.meta.env.DEV ? '.json' : ''}`)

    if (!res.ok) {
        throw new Error('Orders network response error')
    }

    const json = await res.json()
    const order = json.find((item: { order: { id: number; }; }) => item.order.id === id)

    return order ? order.order : null
};

const getOrderItems = async (id: number): Promise<OrderItem[] | null> => {
    const res = await fetch(`/api/platform/custom/order/${id}/items${import.meta.env.DEV ? '.json' : ''}`)

    if (!res.ok || res.status !== 200) {
        throw new Error('Orders network response error')
    }

    return await res.json();
};

const useOrderDetailPage = (id: number) => {
	const navigate = useNavigate();

	if (isNaN(id)) {
		navigate("/objednavky");
	}

	const { data, isLoading } = useQuery(`orderItems-${id}`, () =>
		getOrderItems(id), {
            retry: false,
            refetchOnWindowFocus: false,
        }
	);

	const { data: orderInfo, isFetched: infoIsFetched, isLoading: orderIsLoading } = useQuery(
		`order-${id}`,
		() => getOrder(id), {
            retry: false,
            refetchOnWindowFocus: false,
        }
	);

	useEffect(() => {
		if (infoIsFetched && !orderInfo) {
			alert("Objednávka nenalezena");
			navigate("/objednavky");
		}
	}, [orderInfo, infoIsFetched, navigate]);

	return { data, isLoading: orderIsLoading || isLoading, orderIsLoading, orderInfo };
};

export { useOrderDetailPage };
