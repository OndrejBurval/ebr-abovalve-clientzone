import type { OrderItem } from "@/types/Order";

type Props = {
	items: OrderItem[];
};

const OrderItemsTable = ({ items }: Props) => {
	if (!items || items.length === 0) {
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
				{items.map((item) => (
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
			</tbody>
		</table>
	);
};

export default OrderItemsTable;
