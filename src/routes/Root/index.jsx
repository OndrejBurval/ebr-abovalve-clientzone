import { Link } from "react-router-dom";
import { useState } from "react";
import { getProducts } from "./index.hook";
import { useQuery } from "react-query";

import ProductList from "../../components/ProductsList";

import Layout from "@/Layout/Default.tsx";

export default function Root() {
	const { data, isLoading, isError, error } = useQuery("products", getProducts);
	const [count, setCount] = useState(0);

	if (isError) {
		return <div> Error: {error.message} </div>;
	}

	return (
		<Layout>
			<h2 className="flex"> React page </h2>
			<Link to="/orders"> Objednávky </Link>

			<ProductList products={data} loading={isLoading} />
		</Layout>
	);
}
