import { useTranslation } from "react-i18next";

import type ProductType from "@/types/Product";
import Close from "@/components/svg/Close";
import { useState } from "react";
import useCurrency from "@/hooks/useCurrency";

type CommonProps = {
	product: ProductType;
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
	interactive,
	onQuantityChange,
	onRemove,
}: Props) => {
	const { t } = useTranslation();
	const [price, setPrice] = useState(product.price || 0);

	return (
		<div className="productBox">
			{interactive && (
				<div
					className="productBox--remove"
					onClick={() => onRemove(product.id, "ALL")}>
					<Close />
				</div>
			)}

			<div className="productBox--inner">
				<div className="productBox--name">{product.name}</div>

				<div className="productBox--price">
					{product.price > 0 ? useCurrency(price) : t("naDotaz")}
				</div>

				<span className="productBox--id">{product.id}</span>

				<span className="productBox--quantity">
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
								setPrice(product.price * value);
							}}
						/>
					) : (
						`${product.quantity}ks`
					)}
				</span>
			</div>
		</div>
	);
};

export default Product;
