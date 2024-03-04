import type { Order } from "@/types/Order";
import { useQuery } from "react-query";

type ResponseItem = {
	orders: Order[];
    totalCount: number;
};

const getOrders = async (): Promise<ResponseItem> => {

    const fetchUrl = import.meta.env.DEV
        ? `/api/platform/custom/orders.json`
        : `/api/platform/custom/orders?page=1&limit=5`;

    const res = await fetch(fetchUrl);

    if (!res.ok) {
        throw new Error('Orders network response error');
    }

    const data = await res.json();
    const orders: Order[] = data.orders.map((item: { order: Order, orderDetail: { "@id": string }}) => item.order)

    return {
        orders,
        totalCount: data.totalCount,
    };
};

export const useRootPage = () => useQuery([`orders`, 1], getOrders)
