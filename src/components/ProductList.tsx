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
	interactive,
	onQuantityChange,
	discount,
	onRemove,
}: Props) => {
	const [parent] = useAutoAnimate();
	const { t } = useTranslation();

	const getTotalPrice = (incVat = false) => {
		const value = products.reduce((acc, item) => {
			const unitPrice = incVat ? item.price * 1.21 : item.price;
			return acc + unitPrice * item.quantity;
		}, 0);

		return useCurrency(value);
	};

	const list = products.map((product) => {
		return (
			<ProductComponent
				key={product.id}
				product={product}
				accountDiscount={discount || 0}
				interactive={interactive}
				onQuantityChange={interactive ? onQuantityChange : undefined}
				onRemove={interactive ? onRemove : undefined}
			/>
		);
	});

	return (
		<Card title={t("produkty")} className="productList">
			<table className="product-table" ref={parent}>
				<thead>
					<tr>
						<th>{t("kodProduktu")}</th>

						<th>{t("polozka")}</th>

						<th className=" text--right">{t("cenaBezDph")}</th>

						<th className=" text--right" style={{ width: "4rem" }}>
							{t("sleva")}
						</th>

						<th className=" text--right">{t("cenaBezDphPoSleve")}</th>

						<th style={{ width: "5rem" }}>{t("pocetKs")}</th>

						<th className=" text--right">{t("cenaBezDphPoSleveCelkem")}</th>

						{interactive && <th></th>}
					</tr>
				</thead>
				<tbody>
					{list}
					<tr>
						<td colSpan={interactive ? 6 : 5}>
							<strong>{t("celkemBezDphOrientacni")}</strong>
						</td>
						<td className="text--right">
							<strong>{getTotalPrice()}</strong>
						</td>
						<td></td>
					</tr>
					<tr>
						<td colSpan={interactive ? 6 : 5}>
							<strong>{t("celkemOrientacni")}</strong>
						</td>
						<td className="text--right">
							<strong>{getTotalPrice(true)}</strong>
						</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</Card>
	);
};

export default ProductList;
