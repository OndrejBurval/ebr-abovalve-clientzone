import Layout from "@/layout";
import OrderItemsTable from "@/components/OrderItemsTable";
import Skeleton from "@/components/ui/Skeleton";
import Card from "@/components/ui/Card";

const Detail = () => {
	const cardMap = Array(3)
		.fill(0)
		.map((_, i) => {
			return (
				<Card key={i}>
					<ul>
						<li>
							<Skeleton />
						</li>
						<li>
							<Skeleton />
						</li>
					</ul>
				</Card>
			);
		});

	return (
		<Layout isLoading>
			<Skeleton className="w-48" />
			<div className="orderDetail--wrapper">{cardMap}</div>
			<section className="mt-4">
				<Skeleton className="w-52" />
				<OrderItemsTable isLoading />
			</section>
		</Layout>
	);
};

export default Detail;
