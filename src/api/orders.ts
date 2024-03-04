import type { Order } from "@/types/Order";

type OrdersResponse = {
	orders: Order[];
    totalCount: number;
};


export const getOrders = async (page = 1, limit = 10, year = null): Promise<OrdersResponse> => {
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

    const orders: Order[] = data.orders.map((item: { order: Order, orderDetail: { "@id": string }}) => item.order)

    return {
        orders,
        totalCount: data.totalCount
    };
};

export const getYears = async (): Promise<number[]> => {
    /**
    const res = await fetch(`/api/platform/custom/years.json`);

    if (!res.ok) {
        throw new Error('Orders network response error');
    }

    const data = await res.json();
 */

    const data = {
        years: [2021, 2020, 2019, 2018, 2017],
    }
    return data.years;
};