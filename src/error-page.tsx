import { useRouteError } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page" className="container">
			<Alert severity="error">
				{error instanceof Error ? error.message : "Error"}
			</Alert>
		</div>
	);
}
