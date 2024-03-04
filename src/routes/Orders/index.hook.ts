import type { Order } from "@/types/Order";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type ResponseItem = {
	order: Order;
	orderItems: {
		"@id": string;
	};
};

const getOrders = async (page = 1, limit = 10, year = null): Promise<ResponseItem[]> => {
    console.log("fetch", page, limit, year)
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

    return await res.json();
};

export const useOrdersPage = () => {
    const [page, setPage] = useState(1);
    const [year, setYear] = useState<number | null>(null);
    const [keepPreviousData, setKeepPreviousData] = useState(true);
    
    const { data, isFetched, isLoading } = useQuery([`orders`, page, year], () => getOrders(page, 10, year), {
        keepPreviousData,
        refetchOnWindowFocus: false,
    });

    const nextPage = () => setPage(page + 1);
    const prevPage = () => setPage(page - 1);

    const setYearFilter = (year: number) => {
        setKeepPreviousData(false);
        setYear(year);
        setPage(1);
    };

    useEffect(() => {
        console.log('page', page);
    }, [page]);

    return { data, isFetched, isLoading, nextPage, prevPage, setYearFilter };
}
