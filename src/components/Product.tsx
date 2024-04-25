import { useTranslation } from "react-i18next";

import type ProductType from "@/types/Product";
import Close from "@/components/svg/Close";
import { useState } from "react";
import useCurrency from "@/hooks/useCurrency";

type CommonProps = {
	product: ProductType;
	accountDiscount?: number;
};

type InteractiveProps = CommonProps & {
	interactive: true;
	onQuantityChange: (id: string, quantity: number) => void;
	onRemove: (id: string, quantity: "ONE" | "ALL") => void;
};

type NonInteractiveProps = CommonProps & {
	interactive?: false;
	onQuantityChange?: any;
	onRemove?: any;
};

type Props = InteractiveProps | NonInteractiveProps;

const Product = ({
	product,
	accountDiscount,
	interactive,
	onQuantityChange,
	onRemove,
}: Props) => {
	const { t } = useTranslation();
	const [price] = useState(product.price || 0);
	const [totalPrice, setTotalPrice] = useState(
		product.price * product.quantity || 0
	);

	const originalPriceBeforeDiscount = (price: number, discount: number) => {
		return useCurrency(price / (1 - discount / 100));
	};

	const getDiscount = (product: ProductType) => {
		if (product.discount && product.discount > 0) return product.discount;
		if (accountDiscount && accountDiscount > 0) return accountDiscount;
		return 0;
	};

	return (
		<tr className="product-table__row">
			{interactive && (
				<td
					className="product-table__remove"
					onClick={() => onRemove(product.id, "ALL")}>
					<Close />
				</td>
			)}

			<td className="product-table__name">
				<strong>{product.name}</strong>
			</td>

			<td className="product-table__singlePrice text--right">
				{product.price > 0 && (
					<strong>
						{originalPriceBeforeDiscount(product.price, getDiscount(product))}
					</strong>
				)}
			</td>

			<td className="product-table__discount text--right">
				<strong>{getDiscount(product)}% </strong>
			</td>

			<td className="product-table__price text--right">
				<strong className="product-table__unitPrice">
					{product.price > 0 && <strong>{useCurrency(price)}</strong>}
				</strong>
			</td>

			<td className="product-table__quantity">
				{interactive ? (
					<input
						className="quantityInput"
						type="number"
						name="qunatity"
						id="qunatity"
						min={1}
						step={1}
						defaultValue={product.quantity}
						onChange={(e) => {
							const value = parseInt(e.target.value);
							if (isNaN(value) || value < 1) {
								e.currentTarget.value = "1";
								return;
							}
							onQuantityChange(
								product.id,
								isNaN(value) || value < 1 ? 1 : value
							);
							setTotalPrice(product.price * value);
						}}
					/>
				) : (
					`${product.quantity}ks`
				)}
			</td>

			<td className="product-table__price text--right">
				<div className="product-table__totalPrice">
					<strong>
						{totalPrice > 0 ? useCurrency(totalPrice) : t("naDotaz")}
					</strong>
				</div>
			</td>
		</tr>
	);
};

export default Product;
