import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { type LoggedUser } from "@/composables/useUserData";

import { countries } from "countries-list";

import Snackbar from "@mui/material/Snackbar";
import Card from "@/components/ui/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

type Inputs = {
	street: string;
	city: string;
	zip: string;
	country: string;
};

type Props = {
	data: LoggedUser;
};

const useQuery = () => {
	const { search } = useLocation();
	return useMemo(() => new URLSearchParams(search), [search]);
};

const UserDataForm = ({ data }: Props) => {
	const { t } = useTranslation();
	const query = useQuery();
	const isDeliveryForm = query.get("delivery") === "true";

	// Snacbar
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage] = useState("");

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			street: isDeliveryForm
				? data.account.shipping_street
				: data.account.billing_street,
			city: isDeliveryForm
				? data.account.shipping_city
				: data.account.billing_city,
			zip: isDeliveryForm
				? data.account.shipping_zip
				: data.account.billing_zip,
			country: isDeliveryForm
				? data.account.shipping_country
				: data.account.billing_country,
		},
	});

	const countriesList = useMemo(() => {
		return Object.keys(countries).map((code) => ({
			value: code,
			label: countries[code].name,
		}));
	}, []);

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	const errorRequired = <span className="error"> {t("povinnePole")} </span>;

	const formTitle = !isDeliveryForm
		? t("fakturacniAdresa")
		: t("dorucovaciAdresa");

	return (
		<Card className="clientZone--form" title={formTitle} isLoading={!data}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="clientZone--form--inner">
				<div className={errors.street ? "error" : ""}>
					<label>{t("ulice")}</label>
					<input {...register("street", { required: true })} />
					{errors.street && errorRequired}
				</div>

				<div>
					<label>{t("mesto")}</label>
					<input {...register("city", { required: true })} />
					{errors.city && errorRequired}
				</div>

				<div>
					<label>{t("psc")}</label>
					<input {...register("zip", { required: true })} />
					{errors.zip && errorRequired}
				</div>

				<div>
					<label>{t("stat")}</label>

					<Controller
						name="country"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								disableClearable
								options={countriesList}
								renderInput={(params) => <TextField {...params} />}
								onChange={(_, newValue) => onChange(newValue?.value)}
								value={countriesList.find((c) => c.value === value)}
							/>
						)}
					/>
					{errors.country && errorRequired}
				</div>

				<button className="btn" type="submit">
					{t("ulozitUdaje")}
				</button>

				<Snackbar
					open={openSnackbar}
					autoHideDuration={5000}
					className="snackbar-error"
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					onClose={() => setOpenSnackbar(false)}
					message={snackbarMessage}
				/>
			</form>
		</Card>
	);
};

export default UserDataForm;
