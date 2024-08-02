import { useRouteError, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";

export default function ErrorPage() {
	const { t, i18n } = useTranslation();
	const error = useRouteError();
	const [searchParams] = useSearchParams();
	const errorParam = searchParams.get("error");

	useEffect(() => {
		// Display alert instead of react app
		const reactAppRoot = document.querySelector("#root");

		if (!reactAppRoot) {
			return;
		}

		const paragraph = document.createElement("p");
		paragraph.classList.add("tpl_privatepage");

		if (errorParam === "access-denied") {
			paragraph.textContent = t("accessDeniedError");
		} else {
			paragraph.textContent = `${t("error")}: ${errorParam || "Error"}`;
		}

		reactAppRoot.insertAdjacentHTML("afterend", paragraph.outerHTML);
		reactAppRoot.remove();
		return;
	}, []);

	if (import.meta.env.PROD) {
		return null;
	}

	return (
		<div id="error-page" className="main">
			<Alert severity="error">
				{errorParam && t(errorParam)}
				{error instanceof Error ? error.message : "Error"}
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
