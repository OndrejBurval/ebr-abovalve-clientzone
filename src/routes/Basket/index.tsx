import Layout from "@/layout";

import { useTranslation } from "react-i18next";
import { useBasket } from "@/composables/useBasket";

const Basket = () => {
	const { t } = useTranslation();

	const basket = useBasket();

	const handleClick = () => {
		console.log("Add to basket");
		basket.add({ id: 2, name: "Product 3", price: 200 });
	};

	const handleRemove = () => {
		console.log("Remove from basket");
		basket.remove(2);
	};

	const handleClear = () => {
		console.log("Clear basket");
		basket.clear();
	};

	return (
		<Layout title={`${t("kosik")}`}>
			{basket && <pre>{JSON.stringify(basket, null, 2)}</pre>}

			<button onClick={handleClick}>Add</button>
			<button onClick={handleRemove}>remove</button>
			<button onClick={handleClear}>clear</button>
		</Layout>
	);
};

export default Basket;
