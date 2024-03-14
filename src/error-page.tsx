import { useRouteError, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";

export default function ErrorPage() {
	const { t, i18n } = useTranslation();
	const error = useRouteError();
	const [searchParams] = useSearchParams();

	return (
		<div id="error-page" className="main">
			<Alert severity="error">
				{searchParams.get("error") && t(searchParams.get("error"))}
				{error instanceof Error && error.message}
			</Alert>

			<a
				href="/"
				className="btn"
				style={{ marginBlock: "2rem", marginRight: "1rem" }}>
				{t("zpetNaUvod")}
			</a>

			<a className="btn" href={`/clientzone_logout/${i18n.language}`}>
				{t("odhlasitSe")}
			</a>
		</div>
	);
}
