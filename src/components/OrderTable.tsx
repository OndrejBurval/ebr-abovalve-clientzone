import type { Order } from "@/types/Order";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import Skeleton from "./ui/Skeleton";
import useOrders from "@/hooks/useOrders";
import OrderTableSeleton from "./OrderTableSkeleton";
import OrderTableFilter from "./OrderTableFilter";
import { useState, useEffect } from "react";

type Props = {
	showFilter?: boolean;
	infiniteLoading?: boolean;
	limit?: number;
	page?: string;
};

const OrderTable = ({ showFilter, limit, infiniteLoading, page }: Props) => {
	const [orders, setOrders] = useState<Order[]>([]);
	const { t } = useTranslation();
	const { data, loadMore, isFetching, isLoading, setYearFilter } = useOrders(
		limit,
		page ? page : "default"
	);

	useEffect(() => {
		if (data) {
			setOrders((oldValue) => [...oldValue, ...data.orders]);
		}
	}, [data]);

	const handleYearSelect = (year: number) => {
		setOrders([]);
		setYearFilter(year);
	};

	return (
		<>
			{showFilter && <OrderTableFilter onYearSelect={handleYearSelect} />}

			{isLoading ? (
				<OrderTableSeleton />
			) : (
				<Table items={orders} t={t} isFetching={isFetching && !limit} />
			)}

			{infiniteLoading && orders.length < data?.totalCount && (
				<div className="table--actions">
					<button className="btn" onClick={loadMore} disabled={isFetching}>
						{t("nacistDalsi")}
					</button>
				</div>
			)}
		</>
	);
};

const Table = ({
	items,
	isFetching,
	t,
}: {
	items: Order[];
	isFetching: boolean;
	t: TFunction<"translation", undefined>;
}) => {
	const getDateString = (date: string) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString("cs-CZ");
	};

	return (
		<div className="table--responsive">
			<table>
				<thead>
					<tr className="text-left">
						<th className="px-5"> {t("cisloObjednavky")} </th>
						<th className="px-5 min-w-28"> {t("datum")} </th>
						<th className="px-5"> {t("cena")} </th>
						<th className="px-5"> {t("stav")} </th>
						<th className="px-5"> {t("faktura")} </th>
						<th className="px-5"></th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id}>
							<td className="px-5"> {item.navision_code} </td>
							<td className="px-5 min-w-28">
								{getDateString(item.order_date || "")}
							</td>
							<td className="px-5">
								{item.total_without_vat}&nbsp;{item.currency_code}
							</td>
							<td className="px-5"> {item.state} </td>
							<td className="px-5"> --- </td>
							<td className="px-5">
								<Link to={`/objednavka/${item.id}`}>
									<button className="btn btn--primary">{t("detail")}</button>
								</Link>
							</td>
						</tr>
					))}

					{isFetching && (
						<>
							<tr className="table--fetching">
								<td colSpan={6}>
									<Skeleton />
								</td>
							</tr>
							<tr>
								<td colSpan={6}>
									<Skeleton />
								</td>
							</tr>
						</>
					)}

					{!isFetching && items.length < 1 && (
						<tr>
							<td colSpan={6}>
								<p>{t("zadneObjednavky")}</p>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default OrderTable;
