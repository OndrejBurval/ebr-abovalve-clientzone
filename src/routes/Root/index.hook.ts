import type { Order } from "@/types/Order";
import { useQuery } from "react-query";

type ResponseItem = {
	order: Order;
	orderItems: {
		"@id": string;
	};
};

const getOrders = async (): Promise<ResponseItem[]> => {
    const res = await fetch(`/api/platform/custom/orders${import.meta.env.DEV ? '.json' : ''}`)

    if (!res.ok) {
        throw new Error('Orders network response error')
    }

    const data = [...await res.json()]
    return data.slice(0, 3);
};

export const useRootPage = () => {
    return useQuery(`orders-root`, getOrders);
}
