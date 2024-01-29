import type Product from "../types/Product";
import ProductItem from "./ProductItem";

type Props = {
	products: Product[];
	loading: boolean;
};

const ProductsList = ({ products, loading }: Props) => {
	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div>ProductsList</div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{products &&
					products.map((product) => (
						<ProductItem key={product.id} title={product.title} />
					))}
			</div>
		</>
	);
};

export default ProductsList;
