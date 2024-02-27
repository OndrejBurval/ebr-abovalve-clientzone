import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
	open: boolean;
	hasError: boolean;
	isCompleted: boolean;
	isSubmitting: boolean;
};

const OrderConfirmModal = ({
	open,
	hasError,
	isCompleted,
	isSubmitting,
}: Props) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleClose = () => {
		if (isCompleted) {
			navigate("/muj-ucet");
		} else if (hasError) {
			window.location.reload();
		}
	};

	const title = hasError ? t("objednavkaChyba") : t("objednavkaHotova");
	const contentText = hasError
		? t("objednavkaChybaPopis")
		: t("objednavkaHotovaPopis");
	const buttonText = hasError
		? t("objednavkaChybaTlacitko")
		: t("objednavkaHotovaTlacitko");

	return (
		<Dialog open={open} onClose={handleClose}>
			{!isSubmitting && (
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			)}

			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{!isSubmitting ? contentText : <CircularProgress />}
				</DialogContentText>
			</DialogContent>

			{!isSubmitting && (
				<DialogActions>
					<button onClick={handleClose} autoFocus>
						{buttonText}
					</button>
				</DialogActions>
			)}
		</Dialog>
	);
};

export default OrderConfirmModal;
