import type { Order } from "@/types/Order";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";

type OrderItem = {
	order: Order;
	orderItems: {
		"@id": string;
	};
};

type Props = {
	items: OrderItem[];
	showFilter?: boolean;
};

const OrderTable = ({ items, showFilter }: Props) => {
	const { t } = useTranslation();
	const [filteredItems, setFilteredItems] = useState<OrderItem[]>([]);

	useEffect(() => {
		setFilteredItems(items);
	}, [items]);

	if (!items || items.length === 0) {
		return <p>{t("zadneObjednavky")}</p>;
	}

	const getDateString = (date: string) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString("cs-CZ");
	};

	const handleYearSelect = (year: number) => {
		setFilteredItems(
			items.filter((item) => {
				const date = new Date(item.order.order_date);
				return year === 0 ? true : date.getFullYear() === year;
			})
		);
	};

	return (
		<>
			{showFilter && items.length > 0 && (
				<YearFilter data={items} onYearSelect={handleYearSelect} />
			)}

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
					{filteredItems.map((item) => (
						<tr key={item.order.id}>
							<td className="px-5"> {item.order.id} </td>
							<td className="px-5 min-w-28">
								{getDateString(item.order.order_date)}
							</td>
							<td className="px-5">
								{item.order.total_without_vat}&nbsp;{item.order.currency_code}
							</td>
							<td className="px-5"> {item.order.state} </td>
							<td className="px-5"> --- </td>
							<td className="px-5">
								<Link to={`/objednavka/${item.order.id}`}>
									<button className="btn btn--primary">{t("detail")}</button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

type YearFilterProps = {
	data: OrderItem[];
	onYearSelect: (year: number) => void;
};

const YearFilter = ({ data, onYearSelect }: YearFilterProps) => {
	const { t } = useTranslation();

	const [checkedState, setCheckedState] = useState(
		Array(data.length).fill(false)
	);

	const uniqueYears = useMemo(() => {
		const years = data.map(({ order }) => {
			const date = new Date(order.order_date);
			return date.getFullYear();
		});
		return [...new Set(years)];
	}, [data]);

	const handleYearSelect =
		(year: number, index: number) =>
		(_: React.MouseEvent<HTMLButtonElement>) => {
			onYearSelect(year);
			setCheckedState(() => {
				const newState = Array(data.length).fill(false);
				newState[index] = true;
				return newState;
			});
		};

	return (
		<div className="filter">
			<button
				className="btn btn--all"
				onClick={() => {
					onYearSelect(0);
					setCheckedState(Array(data.length).fill(false));
				}}>
				{t("vse")}
			</button>

			{uniqueYears.map((year, index) => (
				<button
					key={year}
					className="btn"
					data-active={checkedState[index] ? "true" : "false"}
					onClick={handleYearSelect(year, index)}>
					{year}
				</button>
			))}
		</div>
	);
};

export default OrderTable;
