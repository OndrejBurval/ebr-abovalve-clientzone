import type { Order } from "@/types/Order";

import { useState } from "react";
import { useQuery } from "react-query";

type OrdersResponse = {
	orders: Order[];
    totalCount: number;
};

const getOrders = async (page = 1, limit = 10, year = null): Promise<OrdersResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (year && year > 0) {
        params.append('year', year.toString());
      }

    const fetchUrl = import.meta.env.DEV
        ? `/api/platform/custom/orders.json`
        : `/api/platform/custom/orders?${params}`;

    const res = await fetch(fetchUrl);

    if (!res.ok) {
        throw new Error('Orders network response error');
    }

    const data = await res.json();
    
    if (!data || [...data.orders].length === 0) {
        return {
            orders: [],
            totalCount: 0
        };
    }

    const orders: Order[] = data.orders.map((item: { order: Order, orderDetail: { "@id": string }}) => item.order)

    return {
        orders,
        totalCount: data.totalCount
    };
};


const useOrders = (PAGE_LIMIT = 10, key: string = "default") => {
    const [page, setPage] = useState(1);
    const [year, setYear] = useState<number | null | string>(null);
    

    const { data, isFetched, isLoading, isFetching } = useQuery({
        queryKey: ["orders", key, year, page],
        queryFn: () => getOrders(page, PAGE_LIMIT, year),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        retry: false,
    }) 

    const loadMore = () => setPage(page + 1)

    const setYearFilter = (year: number | string) => {
        setYear(year === -1 ? "archive" : year);
        setPage(1);
    };

    return { data, isFetched, isFetching, isLoading, loadMore, setYearFilter };
}

export default useOrders;