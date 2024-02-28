import ProductComponent from "@/components/Product";
import Card from "@/components/ui/Card";

import { useTranslation } from "react-i18next";
import type ProductType from "@/types/Product";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CommonProps = {
	products: ProductType[];
};

type InteractiveProps = CommonProps & {
	interactive: true;
	onQuantityChange: (id: string, quantity: number) => void;
	onRemove: (id: string, quantity: "ONE" | "ALL") => void;
};

type NonInteractiveProps = CommonProps & {
	interactive?: false;
	onQuantityChange?: never;
	onRemove?: never;
};

type Props = InteractiveProps | NonInteractiveProps;

const ProductList = ({
	products,
	interactive,
	onQuantityChange,
	onRemove,
}: Props) => {
	const [parent] = useAutoAnimate();
	const { t } = useTranslation();

	const getTotalPrice = () => {
		if (products.some((item) => item.price === 0)) {
			return t("naDotaz");
		}

		return (
			products.reduce((acc, item) => acc + item.price * item.quantity, 0) +
			" Kč"
		);
	};

	const list = products.map((product) => {
		return (
			<div className="productList" key={product.id}>
				<ProductComponent
					product={product}
					interactive={interactive}
					onQuantityChange={interactive ? onQuantityChange : undefined}
					onRemove={interactive ? onRemove : undefined}
				/>
				<hr />
			</div>
		);
	});

	return (
		<Card title={t("produkty")} className="productList">
			<div className="productList--wrapper" ref={parent}>
				{list}
			</div>

			<div className="productList--total">
				<strong>{t("celkem")}</strong>
				<span>{getTotalPrice()}</span>
			</div>
		</Card>
	);
};

export default ProductList;
