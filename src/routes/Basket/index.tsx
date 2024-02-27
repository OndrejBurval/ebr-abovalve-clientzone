import Layout from "@/layout";

import BasketTable from "@/components/BasketTable";
import Card from "@/components/ui/Card";
import BillingAddress from "@/components/BillingAddress";
import DeliveryAddress from "@/components/DeliveryAddress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import OrderConfirmModal from "@/components/OrderConfirmModal";
import Snackbar from "@mui/material/Snackbar";

import { useTranslation } from "react-i18next";
import { useBasket } from "@/composables/useBasket";
import { useUserData } from "@/composables/useUserData";
import { useState } from "react";

const Basket = () => {
	const { t } = useTranslation();
	const basket = useBasket();
	const { userData, userIsLoading } = useUserData();

	// User input
	const [note, setNote] = useState("");
	const [delivery, setDelivery] = useState(null);

	// Modal
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [hasError, setHasError] = useState(false);

	// Snacbar
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const handleClick = () => {
		console.log("Add to basket");
		basket.add({ id: 2, name: "Product 3", price: 200 });
	};

	const handleClear = () => {
		console.log("Clear basket");
		basket.clear();
	};

	const handleSubmit = async () => {
		if (!validateInput()) return;

		setOpenModal(true);
		setIsSubmitting(true);

		try {
			console.table(basket.items);
			console.log("Note: ", note);
			console.log("Delivery: ", delivery);

			const res = await fetch("/api/order", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					items: basket.items,
					note,
					delivery,
				}),
			});

			if (!res.ok || res.status !== 200) {
				throw new Error("Orders network response error");
			}

			setDelivery("1");
			setNote("");
			basket.clear();
			setIsCompleted(true);
		} catch (e) {
			console.error(e);
			setHasError(true);
		} finally {
			setIsSubmitting(false);
		}
	};

	const validateInput = () => {
		if (!delivery) {
			setOpenSnackbar(true);
			setSnackbarMessage(t("vyberteDopravu"));
			return false;
		}

		return true;
	};

	const deliveryPayment = [
		{
			id: 1,
			name: "Doprava 1",
		},
		{
			id: 2,
			name: "Doprava 2",
		},
		{
			id: 3,
			name: "Doprava 3",
		},
	];

	return (
		<Layout title={`${t("kosik")}`}>
			<button onClick={handleClick}>Add</button>
			<button onClick={handleClear}>clear</button>

			<BasketTable
				items={basket.items}
				onQuantityChange={basket.addQuantity}
				onRemove={(id: number) => basket.remove(id, "ALL")}
			/>

			{basket.items.length > 0 && (
				<div className="basket--data">
					<Card title={t("fakturacniAdresa")} isLoading={userIsLoading}>
						{!userIsLoading && userData.account && (
							<BillingAddress data={userData.account} />
						)}
					</Card>

					<Card title={t("dorucovaciAdresa")} isLoading={userIsLoading}>
						{!userIsLoading && userData.account && (
							<DeliveryAddress data={userData.account} />
						)}
					</Card>

					<Card title={t("poznamkaObjednacky")}>
						<textarea
							value={note}
							rows={3}
							onChange={(e) => setNote(e.target.value)}></textarea>
					</Card>

					<Card title={t("dopravaPlatba")}>
						<Autocomplete
							id="delivery-payment"
							onChange={(_: any, newValue: string | null) => {
								setDelivery(newValue);
							}}
							options={deliveryPayment.map((option) => option.name)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</Card>

					<button className="btn" onClick={handleSubmit}>
						{t("odeslatObjednavku")}
					</button>
				</div>
			)}

			<OrderConfirmModal
				open={openModal}
				hasError={hasError}
				isCompleted={isCompleted}
				isSubmitting={isSubmitting}
			/>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={5000}
				className="snackbar-error"
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				onClose={() => setOpenSnackbar(false)}
				message={snackbarMessage}
			/>
		</Layout>
	);
};

export default Basket;
