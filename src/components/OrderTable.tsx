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

	return (
		<table>
			<thead>
				<tr className="text-left">
					<th className="px-5"> {t("cisloObjednavky")} </th>
					<th className="px-5 min-w-28"> {t("datum")} </th>
					<th className="px-5"> {t("cena")} </th>
					<th className="px-5"> {t("stav")} </th>
					<th className="px-5"></th>
				</tr>
			</thead>
			<tbody>
				{items.map((item) => (
					<tr key={item.order.id}>
						<td className="px-5"> {item.order.navision_code} </td>
						<td className="px-5 min-w-28">
							{getDateString(item.order.order_date)}
						</td>
						<td className="px-5">
							{item.order.total_with_vat}&nbsp;{item.order.currency_code}
						</td>
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
	);
};

export default OrderTable;
