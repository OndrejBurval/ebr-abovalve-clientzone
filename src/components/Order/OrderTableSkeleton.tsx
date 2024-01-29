import Skeleton from "../ui/Skeleton";

const OrderTableSeleton = () => {
	const numberOfColumns = 5;

	return (
		<table>
			<thead>
				<tr className="text-left">
					<th className="px-5"> Číslo objednávky </th>
					<th className="px-5 min-w-28"> Datum </th>
					<th className="px-5"> Cena </th>
					<th className="px-5"> Stav </th>
					<th className="px-5"></th>
				</tr>
			</thead>
			<tbody>
				{Array(3)
					.fill(null)
					.map((_, index) => (
						<tr key={index}>
							{Array(numberOfColumns)
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

export default OrderTableSeleton;
