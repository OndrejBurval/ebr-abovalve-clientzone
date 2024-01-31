import type { Order } from "@/types/Order";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type OrderItem = {
	order: Order;
	orderItems: {
		"@id": string;
	};
};

type Props = {
	items: OrderItem[];
};

const OrderTable = ({ items }: Props) => {
	const { t } = useTranslation();

	if (!items || items.length === 0) {
		return <p>No orders found</p>;
	}

	const getDateString = (date: string) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString("cs-CZ");
	};

	const handleStarClick = (
		event: React.MouseEvent<SVGSVGElement>,
		orderId: number
	) => {
		event.preventDefault();
		console.log("Star clicked - ", orderId);
	};

	return (
		<table>
			<thead>
				<tr className="text-left">
					<th className="px-5"> {t("cisloObjednavky")} </th>
					<th className="px-5 min-w-28"> {t("datum")} </th>
					<th className="px-5"> {t("cena")} </th>
					<th className="px-5"> {t("stav")} </th>
					<th className="px-5"> {t("faktura")} </th>
					<th className="px-5"></th>
					<th className="px-5"></th>
				</tr>
			</thead>
			<tbody>
				{items.map((item) => (
					<tr key={item.order.id}>
						<td className="px-5"> {item.order.id} </td>
						<td className="px-5 min-w-28">
							{getDateString(item.order.order_date)}
						</td>
						<td className="px-5">
							{item.order.total_with_vat}&nbsp;{item.order.currency_code}
						</td>
						<td className="px-5"> --- </td>
						<td className="px-5"> --- </td>
						<td className="px-5">
							<Link to={`/objednavka/${item.order.id}`}>
								<button className="btn btn--primary">{t("detail")}</button>
							</Link>
						</td>
						<td className="px-5">
							<svg
								onClick={(event) => handleStarClick(event, item.order.id)}
								className="icon-star"
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28z"
								/>
							</svg>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default OrderTable;
