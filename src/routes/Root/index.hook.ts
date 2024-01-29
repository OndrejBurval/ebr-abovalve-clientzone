import type Product from "../../types/Product";

const getProducts = (): Promise<Product[]> => {
	// fetch from https://fakestoreapi.com/products
	return fetch("https://fakestoreapi.com/products").then((res) => res.json());
};

export { getProducts };
