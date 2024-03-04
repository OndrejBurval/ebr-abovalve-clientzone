import { getOrders, getYears } from "@/api/orders";
import { useState } from "react";
import { useQuery } from "react-query";

export const useOrdersPage = () => {
    const [page, setPage] = useState(1);
    const [year, setYear] = useState<number | null>(null);
    const [keepPreviousData, setKeepPreviousData] = useState(true);

    const years = useQuery(`years`, getYears, {
        refetchOnWindowFocus: false,
        retry: false
    });
    
    const { data, isFetched, isLoading, isFetching } = useQuery([`orders`, page, year], () => getOrders(page, 10, year), {
        keepPreviousData,
        refetchOnWindowFocus: false,
    });

    const loadMore = () => setPage(page + 1);

    const setYearFilter = (year: number) => {
        setKeepPreviousData(false);
        setYear(year);
        setPage(1);
    };

    return { data, isFetched, isFetching, isLoading, loadMore, setYearFilter, years: years.data, isLoadingYears: years.isLoading};
}
