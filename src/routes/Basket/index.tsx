import Layout from "@/layout";

import BasketTable from "@/components/BasketTable";
import Card from "@/components/ui/Card";
import BillingAddress from "@/components/BillingAddress";
import DeliveryAddress from "@/components/DeliveryAddress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useTranslation } from "react-i18next";
import { useBasket } from "@/composables/useBasket";
import { useUserData } from "@/composables/useUserData";
import { useState } from "react";

const Basket = () => {
	const [note, setNote] = useState("");
	const [delivery, setDelivery] = useState(null);

	const { t } = useTranslation();
	const basket = useBasket();
	const { userData, userIsLoading } = useUserData();

	const handleClick = () => {
		console.log("Add to basket");
		basket.add({ id: 2, name: "Product 3", price: 200 });
	};

	const handleClear = () => {
		console.log("Clear basket");
		basket.clear();
	};

	const handleSubmit = () => {
		console.log("Submit order");
		console.table(basket.items);
		console.log("Note: ", note);
		console.log("Delivery: ", delivery);
		setDelivery("1");
		setNote("");
		basket.clear();
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
		</Layout>
	);
};

export default Basket;
