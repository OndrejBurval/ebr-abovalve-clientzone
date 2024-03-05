import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { type LoggedUser } from "@/hooks/useUserData";

import Snackbar from "@mui/material/Snackbar";
import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";

type Inputs = {
	name: string;
	surname: string;
	phone: string;
	email: string;
};

type Props = {
	data: LoggedUser;
};

const ContactDataForm = ({ data }: Props) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	// Snacbar
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({
		defaultValues: {
			name: data.contact.name,
			surname: data.contact.surname,
			phone: data.contact.phone,
			email: data.contact.email,
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			const res = await fetch(`/api/platform/custom/update-contact-person`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
				}),
			});

			if (!res.ok || res.status !== 200) {
				const resData = await res.json();
				const errorString = Array.isArray(resData)
					? resData[0].message
					: resData.errors.message;
				throw new Error(errorString);
			}

			navigate("/registracni-udaje", {
				state: {
					snackbar: {
						open: true,
						message: t("udajeUlozeny"),
					},
				},
			});
		} catch (error) {
			setSnackbarMessage(error.message);
		} finally {
			setOpenSnackbar(true);
		}
	};

	const errorRequired = <span className="error"> {t("povinnePole")} </span>;
	const errorEmail = <span className="error"> {t("emailNeniPlatny")} </span>;
	const errorPhone = <span className="error"> {t("telefonNeniPlatny")} </span>;

	return (
		<Card
			className="clientZone--form"
			title={t("kontaktniUdaje")}
			isLoading={!data}>
			<form
				onSubmit={handleSubmit(async (data) => await onSubmit(data))}
				className="clientZone--form--inner">
				<div className={errors.name ? "error" : ""}>
					<label>{t("jmeno")}</label>
					<input {...register("name", { required: true })} />
					{errors.name && errorRequired}
				</div>

				<div className={errors.surname ? "error" : ""}>
					<label>{t("prijmeni")}</label>
					<input {...register("surname", { required: true })} />
					{errors.surname && errorRequired}
				</div>

				<div className={errors.email ? "error" : ""}>
					<label>{t("email")}</label>
					<input
						{...register("email", {
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: t("emailNeniPlatny"),
							},
						})}
					/>
					{errors.email && errorEmail}
				</div>

				<div className={errors.phone ? "error" : ""}>
					<label>{t("telefon")}</label>
					<input
						{...register("phone", {
							pattern: {
								value: /^[0-9]{9,13}$|^(\+420)?[0-9]{9}$/i,
								message: t("telefonNeniPlatny"),
							},
						})}
					/>
					{errors.phone && errorPhone}
				</div>

				<button className="btn" type="submit" disabled={isSubmitting}>
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

export default ContactDataForm;
