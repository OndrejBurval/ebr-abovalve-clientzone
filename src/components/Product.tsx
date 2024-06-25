import { useTranslation } from "react-i18next";

import type ProductType from "@/types/Product";
import Trash from "@/components/svg/Trash";
import { useState } from "react";
import useCurrency from "@/hooks/useCurrency";
import { usePriceBeforeDiscount } from "@/hooks/usePriceBeforeDiscount";
import useDiscount from "@/hooks/useDiscount";

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

	return (
		<tr className="product-table__row">
			<td className="product-table__id">
				<span>{product.id}</span>
			</td>

			<td className="product-table__name">
				<span>{product.name}</span>
			</td>

			<td className="product-table__singlePrice text--right">
				{product.price > 0 && (
					<span>
						{usePriceBeforeDiscount(
							product.price,
							useDiscount(product, accountDiscount)
						)}
					</span>
				)}
			</td>

			<td className="product-table__discount text--right">
				<span>{useDiscount(product, accountDiscount)}% </span>
			</td>

			<td className="product-table__price text--right">
				<span className="product-table__unitPrice">
					{product.price > 0 && <span>{useCurrency(price)}</span>}
				</span>
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
					<span>{totalPrice > 0 ? useCurrency(totalPrice) : t("naDotaz")}</span>
				</div>
			</td>

			{interactive && (
				<td
					className="product-table__remove"
					onClick={() => onRemove(product.id, "ALL")}>
					<Trash />
				</td>
			)}
		</tr>
	);
};

export default Product;
