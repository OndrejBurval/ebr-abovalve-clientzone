import type Product from "@/types/Product";
import { useTranslation } from "react-i18next";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
	items: Product[];
	onQuantityChange: (id: number, quantity: number) => void;
	onRemove: (id: number) => void;
};
const BasketTable = ({ items, onQuantityChange, onRemove }: Props) => {
	const { t } = useTranslation();
	const [parent] = useAutoAnimate();

	const getTotalPrice = () => {
		if (items.some((item) => item.price === 0)) {
			return t("naDotaz");
		}

		return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	};

	if (items.length === 0) {
		return <h2 className="basket--empty">{t("kosikJePrazdny")}</h2>;
	}

	return (
		<table>
			<thead>
				<tr className="text-left">
					<th>{t("kodProduktu")}</th>
					<th>{t("nazev")}</th>
					<th>{t("mnozstvi")}</th>
					<th>{t("cenaZaKus")}</th>
					<th></th>
				</tr>
			</thead>

			<tbody ref={parent}>
				{items.map((item) => (
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.name}</td>
						<td>
							<input
								onChange={(e) => {
									const value = parseInt(e.target.value);
									if (isNaN(value) || value < 1) {
										e.currentTarget.value = "1";
									}
									onQuantityChange(
										item.id,
										isNaN(value) || value < 1 ? 1 : value
									);
								}}
								type="number"
								min={1}
								step={1}
								defaultValue={item.quantity}
								name={`quantity-${item.id}`}
								id={`quantity-${item.id}`}
							/>
						</td>
						<td>{item.price === 0 ? t("naDotaz") : item.price}</td>
						<td>
							<button
								className="btn btn--remove"
								onClick={() => onRemove(item.id)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
									/>
								</svg>
							</button>
						</td>
					</tr>
				))}

				<tr>
					<td colSpan={3}>{t("celkem")}</td>
					<td colSpan={2}>{getTotalPrice()}</td>
				</tr>
			</tbody>
		</table>
	);
};

export default BasketTable;
