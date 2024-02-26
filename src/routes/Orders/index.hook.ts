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

    return await res.json()
};

export const useOrdersPage = () => {
    const { data, isFetched, isLoading } = useQuery(`orders`, getOrders);
    return { data, isFetched, isLoading };
}
