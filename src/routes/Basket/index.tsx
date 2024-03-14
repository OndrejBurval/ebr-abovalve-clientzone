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
import { useBasket } from "@/hooks/useBasket";
import { useUserData } from "@/hooks/useUserData";
import { useState } from "react";

const Basket = () => {
	const { t } = useTranslation();
	const basket = useBasket();
	const { userData, userIsLoading } = useUserData();

	const packingOptions = [
		{
			label: t("nakladniDopravce"),
			value: "cargo",
		},
		{
			label: t("namorniDoprava"),
			value: "ship",
		},
		{
			label: t("leteckaDoprava"),
			value: "air",
		},
	];

	const deliveryOptions = [
		{
			label: t("fca"),
			value: "FCA",
		},
		{
			label: t("cfr"),
			value: "CFR",
		},
	];

	// User input
	const [note, setNote] = useState("");
	const [packing, setPacking] = useState(packingOptions[0].value);
	const [delivery, setDelivery] = useState(deliveryOptions[0].value);

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
			const res = await fetch("/api/platform/custom/create-order", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					opportunity_type: "order",
					total_cost: basket.getTotalPrice(basket.items),
					currency: "CZK",
					shipping: delivery,
					packing,
					user_note: note,
					order_items: basket.items.map((item) => ({
						product: item.id,
						amount: item.quantity,
					})),
				}),
			});

			if (!res.ok) {
				throw new Error("Orders network response error");
			}

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
		if (!packing) {
			setOpenSnackbar(true);
			setSnackbarMessage(t("vyberteBaleni"));
			return false;
		}

		return true;
	};

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
												disableEdit={!userData.contact.portal_priv_admin}
											/>
										</div>

										<div className="delivery">
											<strong> {t("dorucovaciAdresa")}</strong>
											<DeliveryAddress
												data={userData.account}
												disableEdit={!userData.contact.portal_priv_admin}
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
											disableClearable
											disablePortal
											defaultValue={deliveryOptions[0].label}
											id="delivery"
											onChange={(_: any, newValue: string | null) => {
												setDelivery(
													deliveryOptions.find(
														(option) => option.label === newValue
													).value
												);
											}}
											options={deliveryOptions.map((option) => option.label)}
											renderInput={(params) => (
												<TextField {...params}> foo </TextField>
											)}
										/>
									</div>

									<div className="delivery--input">
										<label>{t("baleni")}</label>
										<Autocomplete
											disableClearable
											disablePortal
											defaultValue={packingOptions[0].label}
											id="packing"
											onChange={(_: any, newValue: string | null) => {
												setPacking(
													packingOptions.find(
														(option) => option.label === newValue
													).value
												);
											}}
											options={packingOptions.map((option) => option.label)}
											renderInput={(params) => (
												<TextField {...params}> </TextField>
											)}
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
							discount={userData.account.default_discount}
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
