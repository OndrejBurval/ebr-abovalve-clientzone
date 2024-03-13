import type ProductBox from "@/types/ProductBox";
import type CategoryBox from "@/types/CategoryBox";

import { useState } from "react";
import { useQuery } from "react-query";

type FetchResponse = {
	products: ProductBox[];
    categories: CategoryBox[];
    totalProducts: number;
};

const getProducts = async (page = 1): Promise<FetchResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
      });

      const fetchUrl = import.meta.env.DEV
      ? `http://abovalve.myebrana.com/api/platform/custom/products?${params}`
      : `/api/platform/custom/products?${params}`;

    const res = await fetch(fetchUrl);

    if (!res.ok) {
        throw new Error('Products network response error');
    }

    try {
        const data = await res.json();
    
        if (!data) {
            throw new Error('No data found');
        }

        return data;
    } catch (error) {
        return {
            products: [],
            categories: [],
            totalProducts: 0
        };
    }
};


const useProducts = () => {
    const [page, setPage] = useState(1);

    const { data, isFetched, isLoading, isFetching } = useQuery({
        queryKey: ["products", page],
        queryFn: () => getProducts(page),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        retry: false,
    }) 

    const loadMore = () => setPage(page + 1)

    return { data, isFetched, isFetching, isLoading, loadMore };
}

export default useProducts;