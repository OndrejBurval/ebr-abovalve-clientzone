import { useTranslation } from "react-i18next";
import { useBasket } from "@/composables/useBasket";
import type { OrderItem } from "@/types/Order";
import Skeleton from "@/components/ui/Skeleton";
import Product from "@/types/Product";

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
	const basket = useBasket();

	if ((!items || items.length === 0) && !isLoading) {
		return <p>No order items found</p>;
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const productsToOrder = Array.from(formData.entries()).map(
			([_, product]) => JSON.parse(product as string) as Product
		);

		basket.addMultiple(productsToOrder);
	};

	return (
		<form onSubmit={handleSubmit}>
			<table>
				<thead className="text-left">
					<tr>
						<th> {t("kodProduktu")} </th>
						<th> {t("nazev")} </th>
						<th> {t("mnozstvi")} </th>
						<th> {t("cenaZaKus")} </th>
						<th> {t("cenaCelkem")} </th>
						<th> {t("znovuObjednat")} </th>
					</tr>
				</thead>

				<tbody>
					{!isLoading &&
						items.map((item) => (
							<tr key={item.id}>
								<td> {item.id} </td>
								<td> {item.name} </td>
								<td> {item.quantity} </td>
								<td>
									{item.unit_cost}&nbsp;{currencyCode}
								</td>
								<td>
									{item.total_cost ? item.total_cost : null}&nbsp;{currencyCode}
								</td>
								<td>
									<input
										type="checkbox"
										name={`orderAgain-${item.id}`}
										id={`orderAgain-${item.id}`}
										value={JSON.stringify({
											id: item.id,
											name: item.name,
											price: item.unit_cost,
											quantity: item.quantity,
										})}
									/>
								</td>
							</tr>
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

			<div className="orderDetail--table--action">
				<button type="submit" className="btn btn--primary">
					{t("pridatDoKosiku")}
				</button>
			</div>
		</form>
	);
};

export default OrderItemsTable;
