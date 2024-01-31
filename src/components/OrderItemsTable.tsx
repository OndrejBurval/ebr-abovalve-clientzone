import type { OrderItem } from "@/types/Order";
import Skeleton from "@/components/ui/Skeleton";
import { useTranslation } from "react-i18next";

type Props = {
	items?: OrderItem[];
	totalPriceExcVat?: number;
	currencyCode?: string;
	isLoading?: boolean;
};

const OrderItemsTable = ({
	items,
	isLoading,
	totalPriceExcVat,
	currencyCode,
}: Props) => {
	const { t } = useTranslation();

	if ((!items || items.length === 0) && !isLoading) {
		return <p>No order items found</p>;
	}

	return (
		<table>
			<thead className="text-left">
				<tr>
					<th> Kód produktu </th>
					<th> Název </th>
					<th> Množství </th>
					<th> Cena za ks </th>
					<th> Cena celkem </th>
					<th> Znovu objednat </th>
				</tr>
			</thead>

			<tbody>
				{!isLoading &&
					items.map((item) => (
						<>
							<tr key={item.id}>
								<td> {item.id} </td>
								<td> {item.name} </td>
								<td> {item.quantity} </td>
								<td>
									{item.unit_cost}&nbsp;{currencyCode}
								</td>
								<td>
									{item.total_cost}&nbsp;{currencyCode}
								</td>
								<td>
									<input
										type="checkbox"
										name={`orderAgain-${item.id}`}
										id={`orderAgain-${item.id}`}
									/>
								</td>
							</tr>
						</>
					))}

				{!isLoading ? (
					<tr>
						<td colSpan={4}>{t("celkemBezDph")}</td>
						<td colSpan={2}>
							{totalPriceExcVat || ""}&nbsp;{currencyCode}
						</td>
					</tr>
				) : null}

				{isLoading &&
					Array(3)
						.fill(null)
						.map((_, index) => (
							<tr key={index}>
								{Array(6)
									.fill(null)
									.map((_, innerIndex) => (
										<td key={innerIndex}>
											<Skeleton />
										</td>
									))}
							</tr>
						))}
			</tbody>
		</table>
	);
};

export default OrderItemsTable;
