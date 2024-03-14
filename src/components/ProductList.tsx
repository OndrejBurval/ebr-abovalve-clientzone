import ProductComponent from "@/components/Product";
import Card from "@/components/ui/Card";

import { useTranslation } from "react-i18next";
import type ProductType from "@/types/Product";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useCurrency from "@/hooks/useCurrency";

type CommonProps = {
	products: ProductType[];
	discount?: number;
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
	discount,
	interactive,
	onQuantityChange,
	onRemove,
}: Props) => {
	const [parent] = useAutoAnimate();
	const { t } = useTranslation();

	const getTotalPrice = () => {
		const value = products.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);

		return useCurrency(value);
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

			<div className="productList--price">
				{discount && (
					<div className="productList--total">
						<strong>{t("sleva")}</strong>
						<span>{discount}%</span>
					</div>
				)}

				<div className="productList--total">
					<strong>{t("celkem")}</strong>
					<span>{getTotalPrice()}</span>
				</div>
			</div>
		</Card>
	);
};

export default ProductList;
