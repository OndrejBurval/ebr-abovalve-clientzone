import Layout from "@/layout";
import OrderItemsTable from "@/components/OrderItemsTable";
import Skeleton from "@/components/ui/Skeleton";

const Detail = () => {
	return (
		<Layout>
			<ul className="order--detail--info">
				<li>
					<Skeleton />
				</li>

				<li>
					<Skeleton />
				</li>

				<li>
					<Skeleton />
				</li>

				<li>
					<Skeleton />
				</li>

				<li>
					<Skeleton />
				</li>
			</ul>

			<div className="address">
				<Skeleton />
				<Skeleton />
			</div>

			<section>
				<Skeleton />

				<OrderItemsTable isLoading />
			</section>
		</Layout>
	);
};

export default Detail;
