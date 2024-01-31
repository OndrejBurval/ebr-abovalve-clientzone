import type { OrderItem } from "@/types/Order";
import Skeleton from "@/components/ui/Skeleton";

type Props = {
	items?: OrderItem[];
	isLoading?: boolean;
};

const OrderItemsTable = ({ items, isLoading }: Props) => {
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
						<tr key={item.id}>
							<td> {item.id} </td>
							<td> {item.name} </td>
							<td> {item.quantity} </td>
							<td> {item.unit_cost} </td>
							<td> {item.total_cost} </td>
							<td>
								<input
									type="checkbox"
									name={`orderAgain-${item.id}`}
									id={`orderAgain-${item.id}`}
								/>
							</td>
						</tr>
					))}

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
