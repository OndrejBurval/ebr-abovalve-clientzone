import Layout from "@/layout";

import ProductList from "@/components/ProductList";
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

	const handleSubmit = async () => {
		if (!validateInput()) return;

		setOpenModal(true);
		setIsSubmitting(true);

		try {
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
		<Layout title={`${t("kosik")}`} className="basket">
			<div className="basket--wrapper">
				{basket.items.length > 0 && !userIsLoading ? (
					<>
						<div>
							<Card isLoading={userIsLoading} className="userData--connected">
								{!userIsLoading && userData.account && (
									<>
										<div className="billing">
											<strong>{t("fakturacniAdresa")}</strong>
											<BillingAddress
												data={userData.account}
												disableEdit={!userData.account.portal_priv_admin}
											/>
										</div>

										<div className="delivery">
											<strong> {t("dorucovaciAdresa")}</strong>
											<DeliveryAddress
												data={userData.account}
												disableEdit={!userData.account.portal_priv_admin}
											/>
										</div>
									</>
								)}
							</Card>
							<div className="userInput">
								<Card className="selectCard">
									<div className="payment--input">
										<label>{t("platba")}</label>
										<input
											type="text"
											name="payment"
											id="payment"
											value={userData.account.payment_method}
											readOnly
										/>
									</div>

									<div className="delivery--input">
										<label>{t("doprava")}</label>
										<Autocomplete
											id="delivery-payment"
											onChange={(_: any, newValue: string | null) => {
												setDelivery(newValue);
											}}
											options={deliveryPayment.map((option) => option.name)}
											renderInput={(params) => <TextField {...params} />}
										/>
									</div>

									<div className="note--input">
										<label>{t("poznamkaObjednavky")}</label>
										<textarea
											value={note}
											rows={3}
											onChange={(e) => setNote(e.target.value)}></textarea>
									</div>

									<div className="btn--wrapper">
										<button className="btn" onClick={handleSubmit}>
											{t("odeslatObjednavku")}
										</button>
									</div>
								</Card>
							</div>
						</div>

						<ProductList
							products={basket.items}
							interactive
							onQuantityChange={basket.updateQuantity}
							onRemove={basket.remove}
						/>
					</>
				) : (
					t("kosikJePrazdny")
				)}
			</div>

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
