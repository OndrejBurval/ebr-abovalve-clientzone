import Layout from "@/layout";
import Skeleton from "@/components/ui/Skeleton";

const Detail = () => {
	return (
		<Layout isLoading>
			<p>
				<Skeleton />
			</p>
			<p>
				<Skeleton />
			</p>
			<p>
				<Skeleton />
			</p>
		</Layout>
	);
};

export default Detail;
