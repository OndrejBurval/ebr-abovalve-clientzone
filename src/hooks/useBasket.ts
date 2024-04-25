import { useState } from "react";
import type Basket from "@/types/Basket";
import Product from "@/types/Product";

export type UseBasket = {
	items: Basket | [];
	add: (product: Product, quantity?: number) => void;
	addMultiple: (products: Product[]) => void;
	remove: (id: string, quantity?: "ONE" | "ALL") => void;
	clear: () => void;
	updateQuantity: (id: string, quantity?: number) => void;
	getTotalPrice: (basket: Product[]) => number;
};

export const useBasket = (): UseBasket => {
	const [basket, setBasket] = useState<Basket | []>(loadBasket());

	function loadBasket() {
		const newSession = !document.cookie.includes("basket_session");

		if (newSession) {
			document.cookie = "basket_session=true; path=/";
			localStorage.removeItem("basket");
		}

		const basket = localStorage.getItem("basket");
		return basket ? JSON.parse(basket) : [];
	}

	function saveBasket(data: Basket | null = null) {
		const basketToSave = data ? data : basket;
		localStorage.setItem("basket", JSON.stringify(basketToSave));
		window.dispatchEvent(new CustomEvent("basket:update"));
	}

	function add(product: Product, quantity = 1) {
		setBasket((prevBasket) => {
			const index = prevBasket.findIndex((item) => item.id === product.id);

			if (index === -1) {
				const newBasket = [...prevBasket, { ...product, quantity }];
				saveBasket(newBasket);
				return newBasket;
			} else {
				const newBasket = [...prevBasket];
				newBasket[index].quantity += quantity;
				saveBasket(newBasket);
				return newBasket;
			}
		});
	}

	function updateQuantity(id: string, quantity: number = 1) {
		if (!quantity || quantity < 1) {
			return;
		}

		const index = basket.findIndex((item) => item.id === id);

		if (index === -1) {
			console.error("Item not found in basket");
			return;
		}

		basket[index].quantity = quantity;
		setBasket([...basket]);
		saveBasket();
	}

	function addMultiple(products: Product[]) {
		const basketData = [...basket];

		products.forEach((product) => {
			const index = basketData.findIndex((item) => item.id === product.id);
			const quantity = product?.quantity || 1;

			if (index === -1) {
				basketData.push({ ...product, quantity });
			} else {
				basketData[index].quantity += quantity;
			}
		});

		setBasket([...basketData]);
		saveBasket([...basketData]);
	}

	function remove(id: string, quantity: "ONE" | "ALL" = "ONE") {
		const index = basket.findIndex((item) => item.id === id);

		if (index === -1) {
			console.error("Item not found in basket");
			return;
		}

		const lastItem = basket[index].quantity === 1;

		if (quantity === "ALL" || lastItem) {
			basket.splice(index, 1);
		}

		if (quantity === "ONE" && !lastItem) {
			basket[index].quantity -= 1;
		}

		setBasket([...basket]);
		saveBasket();
	}

	function clear() {
		setBasket([]);
		localStorage.removeItem("basket");
	}

	function getTotalPrice(basket: Product[]) {
		return basket.reduce(
			(acc: number, item: Product) => acc + item.price * item.quantity,
			0
		);
	}

	return {
		items: basket,
		add,
		addMultiple,
		remove,
		clear,
		updateQuantity,
		getTotalPrice,
	};
} ;

