import type { Order } from "@/types/Order";

import { useState } from "react";
import { useQuery } from "react-query";

type OrdersResponse = {
	orders: Order[];
    totalCount: number;
};

type Sort = {
    field: string;
    direction: "asc" | "desc";
}

const getOrders = async (page = 1, limit = 10, year = null, archive = false, sort = null): Promise<OrdersResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      
      if (year && year > 0 && !archive) {
        params.append('year', year.toString());
      }

      if (sort) {
        params.append('sortField', sort.field);
        params.append('sortDirection', sort.direction);
      }

      if (archive) {
        params.append('archive', '1');
      }

    const fetchUrl = import.meta.env.DEV
        ? `/api/platform/custom/orders.json?${params}`
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
    const [archive, setArchive] = useState<boolean>(false);
    const [sort, setSort] = useState<Sort | null>(null);

    const { data, isFetched, isLoading, isFetching } = useQuery({
        queryKey: ["orders", key, year, page, archive, sort],
        queryFn: () => getOrders(page, PAGE_LIMIT, year, archive, sort),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        retry: false,
    }) 

    const loadMore = () => setPage(page + 1)

    const setYearFilter = (year: number | "archive") => {
        if (year === "archive") {
            setYear(null);
            setPage(1);
            setArchive(true);
            return;
        }

        setArchive(false);
        setYear(year);
        setPage(1);
    };

    const setSortFilter = (field: string) => {
        const direction = sort?.field === field && sort?.direction === "asc" ? "desc" : "asc";

        setSort({ field, direction });
        setPage(1);
    }

    return { data, isFetched, isFetching, isLoading, loadMore, setYearFilter, setSortFilter };
}

export default useOrders;