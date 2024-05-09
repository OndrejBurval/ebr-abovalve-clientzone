import { useTranslation } from "react-i18next";
import { useBasket } from "@/hooks/useBasket";
import { useEffect, useState } from "react";
import type { OrderItem } from "@/types/Order";

import Snackbar from "@mui/material/Snackbar";
import Skeleton from "@/components/ui/Skeleton";
import Product from "@/types/Product";
import Checkbox from "@mui/material/Checkbox";
import useCurrency from "@/hooks/useCurrency";
import { useSearchParams } from "react-router-dom";
import {
	usePriceAfterDiscount,
	usePriceAmountAfterDiscount,
} from "@/hooks/usePriceAfterDiscount";

type Props = {
	items?: OrderItem[];
	totalPriceExcVat?: string;
	totalPriceIncVat?: string;
	currencyCode?: string;
	isLoading?: boolean;
};

const OrderItemsTable = ({
	items,
	isLoading,
	totalPriceExcVat,
	//totalPriceIncVat,
	currencyCode,
}: Props) => {
	const { t } = useTranslation();
	const basket = useBasket();
	const [searchParams] = useSearchParams();

	const [snackbar, setSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [checkedStateAll, setCheckedStateAll] = useState(
		!!searchParams.get("orderAgain")
	);
	const [checkedState, setCheckedState] = useState(
		new Array(items?.length || 0).fill(!!searchParams.get("orderAgain"))
	);

	useEffect(() => {
		if (items) {
			setCheckedState(
				new Array(items.length).fill(!!searchParams.get("orderAgain"))
			);
		}
	}, [items, searchParams]);

	if ((!items || items.length === 0) && !isLoading) {
		return <p>{t("zadnePolozkyObjednavky")}</p>;
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const productsToOrder: Product[] = [];
		checkedState.forEach((checked, index) => {
			if (checked) {
				const {
					navision_code,
					name,
					unit_cost: price,
					quantity,
					discount_percent,
				} = items[index];

				productsToOrder.push({
					id: navision_code,
					name,
					price: usePriceAmountAfterDiscount(price, discount_percent || 0),
					quantity,
					discount: discount_percent || 0,
				});
			}
		});

		basket.addMultiple(productsToOrder);

		setSnackbarMessage(
			productsToOrder.length > 1
				? t("produktyBylyPridanyDoKosiku")
				: t("produktBylPridanDoKosiku")
		);
		setSnackbar(true);
		setCheckedStateAll(false);
		setCheckedState(new Array(items.length).fill(false));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="table--responsive">
				<table className="product-table">
					<thead className="text-left">
						<tr>
							<th>
								<Checkbox
									name="orderAgainAll"
									id="orderAgainAll"
									checked={checkedStateAll}
									onChange={(e) => {
										setCheckedState(
											new Array(items.length).fill(e.target.checked)
										);
										setCheckedStateAll(e.target.checked);
									}}
								/>
							</th>
							<th> {t("kodProduktu")} </th>
							<th> {t("nazev")} </th>
							<th className=" text--right">{t("cenaBezDph")}</th>
							<th className=" text--right" style={{ width: "4rem" }}>
								{t("sleva")}
							</th>
							<th className=" text--right">{t("cenaBezDphPoSleve")}</th>
							<th style={{ width: "5rem" }}>{t("pocetKs")}</th>
							<th className=" text--right">{t("cenaBezDphPoSleveCelkem")}</th>
						</tr>
					</thead>

					<tbody>
						{!isLoading &&
							items.map((item, index) => (
								<tr key={item.id}>
									<td>
										<Checkbox
											checked={checkedState[index]}
											name={`orderAgain-${item.id}`}
											id={`orderAgain-${item.id}`}
											value={JSON.stringify({
												id: item.id,
												name: item.name,
												price: item.unit_cost,
												quantity: item.quantity,
											})}
											onChange={(e) => {
												setCheckedState((prevState) => {
													const newState = [...prevState];
													newState[index] = e.target.checked;
													return newState;
												});
												if (checkedState.includes(false)) {
													setCheckedStateAll(false);
												}
											}}
										/>
									</td>
									<td> {item.navision_code} </td>
									<td> {item.name} </td>
									<td className="text--right">
										{useCurrency(item.unit_cost, currencyCode)}
									</td>
									<td className="text--right">
										{item.discount_percent || "0"}%{" "}
									</td>
									<td className="text--right">
										{usePriceAfterDiscount(
											item.unit_cost,
											item.discount_percent || 0
										)}
									</td>
									<td> {item.quantity} </td>
									<td className="text--right">
										{item.total_cost
											? useCurrency(item.total_cost, currencyCode)
											: "-"}
										&nbsp;
									</td>
								</tr>
							))}

						{!isLoading ? (
							<>
								<tr>
									<td colSpan={7}>
										<strong>{t("celkemBezDphOrientacni")}</strong>
									</td>
									<td className="text--right">{totalPriceExcVat || ""}</td>
								</tr>
								{/** 
								<tr>
									<td colSpan={7}>
										<strong>{t("celkemOrientacni")}</strong>
									</td>
									<td className="text--right">{totalPriceIncVat || ""}</td>
								</tr>
                                */}
							</>
						) : null}

						{isLoading &&
							Array(3)
								.fill(null)
								.map((_, index) => (
									<tr key={index}>
										{Array(6)
											.fill(null)
											.map((_, innerIndex) => (
												<td key={innerIndex}>
													<Skeleton />
												</td>
											))}
									</tr>
								))}
					</tbody>
				</table>
			</div>
			<div className="orderDetail--table--action">
				{checkedState.includes(true) && (
					<button type="submit" className="btn btn--primary">
						{t("pridatDoKosiku")}
					</button>
				)}
			</div>

			<Snackbar
				open={snackbar}
				autoHideDuration={6000}
				onClose={() => setSnackbar(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				message={snackbarMessage}
			/>
		</form>
	);
};

export default OrderItemsTable;
