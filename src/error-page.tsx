import { useRouteError, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";

export default function ErrorPage() {
	const { t } = useTranslation();
	const error = useRouteError();
	const [searchParams] = useSearchParams();

	return (
		<div id="error-page" className="main">
			<Alert severity="error">
				{searchParams.get("error") && t(searchParams.get("error"))}
				{error instanceof Error && error.message}
			</Alert>

			<a href="/" className="btn" style={{ marginTop: "2rem" }}>
				{t("zpetNaUvod")}
			</a>
		</div>
	);
}
